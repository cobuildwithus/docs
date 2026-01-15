"use client";

import { useEffect, useState } from "react";
import { MintFlowDiagramSvg } from "./mint-flow-diagram/diagram";
import { MintFlowNotes } from "./mint-flow-diagram/notes";

export function MintFlowDiagram() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4">
        <div className="text-sm font-medium text-neutral-200">Mint Flow</div>
        <div className="text-xs text-neutral-500">How payments split into tokens</div>
      </div>

      <MintFlowDiagramSvg />
      <MintFlowNotes />
    </div>
  );
}
