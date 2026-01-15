export function MintFlowNotes() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-neutral-800/50 pt-3 text-xs">
      <div className="flex items-start gap-2">
        <div className="mt-1 size-2 shrink-0 rounded-full bg-emerald-500" />
        <span className="text-neutral-400">
          Treasury gets 100% of payment—splits don't affect it
        </span>
      </div>
      <div className="flex items-start gap-2">
        <div className="mt-1 size-2 shrink-0 rounded-full bg-red-500" />
        <span className="text-neutral-400">Auto-issuance adds supply without adding treasury</span>
      </div>
    </div>
  );
}
