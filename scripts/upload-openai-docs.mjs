#!/usr/bin/env node
import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";

dotenv.config({ override: true });

const args = process.argv.slice(2);
const shouldPurge = args.includes("--purge");
const keepFiles = args.includes("--keep-files");
const vectorStoreArg = getArgValue(args, "--vector-store-id");

const apiKey = process.env.OPENAI_API_KEY?.trim();
if (!apiKey) {
  console.error("Missing OPENAI_API_KEY.");
  process.exit(1);
}

const baseUrl = "https://api.openai.com/v1";
const vectorStoreId = vectorStoreArg || process.env.DOCS_VECTOR_STORE_ID?.trim();

const headers = {
  Authorization: `Bearer ${apiKey}`,
};

const openAiOrg = process.env.OPENAI_ORGANIZATION?.trim();
const openAiProject = process.env.OPENAI_PROJECT?.trim();

console.log(`Using OpenAI key: ${maskApiKey(apiKey)}`);
if (openAiOrg) {
  headers["OpenAI-Organization"] = openAiOrg;
}
if (openAiProject) {
  headers["OpenAI-Project"] = openAiProject;
}

const vectorHeaders = {
  ...headers,
  "Content-Type": "application/json",
  "OpenAI-Beta": "assistants=v2",
};

const EXCLUDED_DOC_PATHS = new Set([
  "legal/privacy.mdx",
  "legal/terms.mdx",
  "legal/privacy.md",
  "legal/terms.md",
]);

const docsRoot = path.join(process.cwd(), "pages");
const client = createOpenAIClient({ baseUrl, headers, vectorHeaders });

const allDocFiles = (await collectDocFiles(docsRoot)).sort();
const excludedDocFiles = allDocFiles.filter((filePath) => isExcludedDoc(filePath, docsRoot));
const docFiles = allDocFiles.filter((filePath) => !isExcludedDoc(filePath, docsRoot));
if (excludedDocFiles.length > 0) {
  const excludedList = excludedDocFiles
    .map((filePath) => path.relative(docsRoot, filePath).replace(/\\/g, "/"))
    .join(", ");
  console.log(`Skipping excluded docs: ${excludedList}`);
}
if (docFiles.length === 0) {
  console.error("No docs files found under ./pages.");
  process.exit(1);
}

if (openAiOrg) console.log(`Using OpenAI org: ${openAiOrg}`);
if (openAiProject) console.log(`Using OpenAI project: ${openAiProject}`);

if (vectorStoreId) {
  const knownStores = await client.listVectorStores();
  const found = knownStores.find((store) => store.id === vectorStoreId);
  if (!found) {
    const preview = knownStores
      .slice(0, 10)
      .map((store) => `${store.name ?? "unnamed"} (${store.id})`)
      .join(", ");
    const suffix = knownStores.length > 10 ? "…" : "";
    throw new Error(
      `Vector store ${vectorStoreId} not found for this API key/project. ` +
        `Available: ${preview || "none"}${suffix}`,
    );
  }
}

const activeVectorStoreId = vectorStoreId || (await client.createVectorStore("Cobuild Docs"));

console.log(`Using vector store: ${activeVectorStoreId}`);

if (shouldPurge) {
  console.log("Purging vector store files...");
  const existingFiles = await client.listVectorStoreFiles(activeVectorStoreId);
  for (const file of existingFiles) {
    await client.removeVectorStoreFile(activeVectorStoreId, file, keepFiles);
  }
}

const existingIndex = await buildExistingIndex(activeVectorStoreId, client);

let uploaded = 0;
for (const filePath of docFiles) {
  const relativePath = path.relative(docsRoot, filePath).replace(/\\/g, "/");
  const slug = toSlug(relativePath);
  const existing =
    existingIndex.byPath.get(relativePath) ||
    pickSingle(existingIndex.byFilename.get(path.basename(filePath)));

  if (existing) {
    await client.removeVectorStoreFile(activeVectorStoreId, existing, keepFiles);
  }

  const fileId = await client.uploadFile(filePath);
  await client.attachFileToVectorStore(activeVectorStoreId, fileId, { path: relativePath, slug });

  uploaded += 1;
  console.log(`Uploaded ${relativePath} -> ${fileId}`);
}

console.log(`Done. Uploaded ${uploaded} docs files.`);

function getArgValue(argv, flag) {
  const prefix = `${flag}=`;
  const entry = argv.find((arg) => arg.startsWith(prefix));
  return entry ? entry.slice(prefix.length).trim() : null;
}

function maskApiKey(value) {
  const trimmed = value.trim();
  if (trimmed.length <= 8) return "***";
  const start = trimmed.slice(0, 3);
  const end = trimmed.slice(-4);
  return `${start}...${end}`;
}

function pickSingle(items) {
  if (!items || items.length !== 1) return null;
  return items[0];
}

async function collectDocFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectDocFiles(fullPath)));
    } else if (entry.isFile() && isDocFile(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function isDocFile(name) {
  const ext = path.extname(name).toLowerCase();
  return ext === ".md" || ext === ".mdx";
}

function isExcludedDoc(filePath, docsRoot) {
  const relativePath = path.relative(docsRoot, filePath).replace(/\\/g, "/");
  return EXCLUDED_DOC_PATHS.has(relativePath);
}

function toSlug(relativePath) {
  const withoutExt = relativePath.replace(/\.(md|mdx)$/i, "");
  let slug = `/${withoutExt.replace(/\\/g, "/")}`;
  if (slug.endsWith("/index")) {
    slug = slug.slice(0, -"/index".length) || "/";
  }
  return slug;
}

function createOpenAIClient({ baseUrl, headers, vectorHeaders }) {
  async function requestJson(url, options) {
    const response = await fetch(url, options);
    const text = await response.text();
    if (!response.ok) {
      throw new Error(
        `OpenAI API error ${response.status} ${response.statusText}: ${text || "No body"}`,
      );
    }
    if (!text) return null;
    return JSON.parse(text);
  }

  return {
    async createVectorStore(name) {
      const data = await requestJson(`${baseUrl}/vector_stores`, {
        method: "POST",
        headers: vectorHeaders,
        body: JSON.stringify({ name }),
      });
      if (!data?.id) {
        throw new Error("Failed to create vector store.");
      }
      console.log(`Created vector store: ${data.id}`);
      return data.id;
    },
    async listVectorStoreFiles(vectorStoreId) {
      const results = [];
      let after = null;
      do {
        const params = new URLSearchParams({ limit: "100" });
        if (after) params.set("after", after);
        const data = await requestJson(
          `${baseUrl}/vector_stores/${vectorStoreId}/files?${params.toString()}`,
          { headers: vectorHeaders },
        );
        const batch = Array.isArray(data?.data) ? data.data : [];
        results.push(...batch);
        after = data?.has_more ? data?.last_id : null;
      } while (after);
      return results.map((item) => ({
        vectorStoreFileId: item.id,
        fileId: item.file_id ?? item.id,
        attributes: item.attributes ?? null,
        filename: null,
      }));
    },
    async listVectorStores() {
      const results = [];
      let after = null;
      do {
        const params = new URLSearchParams({ limit: "100" });
        if (after) params.set("after", after);
        const data = await requestJson(`${baseUrl}/vector_stores?${params.toString()}`, {
          headers: vectorHeaders,
        });
        const batch = Array.isArray(data?.data) ? data.data : [];
        results.push(...batch);
        after = data?.has_more ? data?.last_id : null;
      } while (after);
      return results.map((item) => ({
        id: item.id,
        name: item.name ?? null,
      }));
    },
    async retrieveVectorStoreFile(vectorStoreId, vectorStoreFileId) {
      return await requestJson(
        `${baseUrl}/vector_stores/${vectorStoreId}/files/${vectorStoreFileId}`,
        { headers: vectorHeaders },
      );
    },
    async retrieveFile(fileId) {
      return await requestJson(`${baseUrl}/files/${fileId}`, { headers });
    },
    async removeVectorStoreFile(vectorStoreId, entry, keepFiles) {
      await requestJson(`${baseUrl}/vector_stores/${vectorStoreId}/files/${entry.vectorStoreFileId}`, {
        method: "DELETE",
        headers: vectorHeaders,
      });

      if (!keepFiles) {
        await requestJson(`${baseUrl}/files/${entry.fileId}`, {
          method: "DELETE",
          headers,
        });
      }
    },
    async uploadFile(filePath) {
      const content = await fs.readFile(filePath);
      const filename = normalizeUploadFilename(filePath);
      const form = new FormData();
      form.append("purpose", "assistants");
      form.append("file", new Blob([content]), filename);

      const response = await fetch(`${baseUrl}/files`, {
        method: "POST",
        headers,
        body: form,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          `OpenAI file upload failed ${response.status} ${response.statusText}: ${JSON.stringify(data)}`,
        );
      }
      if (!data?.id) {
        throw new Error("OpenAI file upload returned no id.");
      }
      return data.id;
    },
    async attachFileToVectorStore(vectorStoreId, fileId, attributes) {
      const data = await requestJson(`${baseUrl}/vector_stores/${vectorStoreId}/files`, {
        method: "POST",
        headers: vectorHeaders,
        body: JSON.stringify({
          file_id: fileId,
          attributes,
        }),
      });
      if (!data?.id) {
        throw new Error("OpenAI vector store attach returned no id.");
      }
      return data.id;
    },
  };
}

function normalizeUploadFilename(filePath) {
  const basename = path.basename(filePath);
  return basename.endsWith(".mdx") ? `${basename.slice(0, -4)}.md` : basename;
}

async function buildExistingIndex(vectorStoreId, client) {
  const listed = await client.listVectorStoreFiles(vectorStoreId);
  const byPath = new Map();
  const byFilename = new Map();

  for (const entry of listed) {
    const details = await client.retrieveVectorStoreFile(vectorStoreId, entry.vectorStoreFileId);
    const fileId = details?.file_id ?? details?.id ?? entry.fileId;
    let filename = null;
    try {
      const fileInfo = await client.retrieveFile(fileId);
      filename = fileInfo?.filename ?? null;
    } catch {
      filename = null;
    }

    const attributes = details?.attributes ?? entry.attributes ?? {};
    const normalized = {
      vectorStoreFileId: entry.vectorStoreFileId,
      fileId,
      attributes,
      filename,
    };

    if (typeof attributes?.path === "string") {
      byPath.set(attributes.path, normalized);
    }

    if (filename) {
      const list = byFilename.get(filename) || [];
      list.push(normalized);
      byFilename.set(filename, list);
    }
  }

  return { byPath, byFilename };
}
