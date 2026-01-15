type ControlsProps = {
  mint: (amount: number) => void;
  buyProduct: (amount: number) => void;
  donate: (amount: number) => void;
  takeLoan: (amount: number) => void;
  cashOut: (amount: number) => void;
};

export function CobuildMechanismControls({
  mint,
  buyProduct,
  donate,
  takeLoan,
  cashOut,
}: ControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 pt-6 sm:gap-10">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <button
          onClick={() => mint(10)}
          className="rounded-lg border border-emerald-700/50 bg-emerald-900/30 px-3 py-2 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-900/50 sm:px-4 sm:text-sm"
        >
          Mint
        </button>
        <button
          onClick={() => buyProduct(500)}
          className="rounded-lg border border-purple-700/50 bg-purple-900/30 px-3 py-2 text-xs font-medium text-purple-400 transition-colors hover:bg-purple-900/50 sm:px-4 sm:text-sm"
        >
          Buy Product
        </button>
        <button
          onClick={() => donate(200)}
          className="rounded-lg border border-pink-700/50 bg-pink-900/30 px-3 py-2 text-xs font-medium text-pink-400 transition-colors hover:bg-pink-900/50 sm:px-4 sm:text-sm"
        >
          Donate
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <button
          onClick={() => takeLoan(1000)}
          className="rounded-lg border border-amber-700/50 bg-amber-900/30 px-3 py-2 text-xs font-medium text-amber-400 transition-colors hover:bg-amber-900/50 sm:px-4 sm:text-sm"
        >
          Take Loan
        </button>
        <button
          onClick={() => cashOut(10)}
          className="rounded-lg border border-orange-700/50 bg-orange-900/30 px-3 py-2 text-xs font-medium text-orange-400 transition-colors hover:bg-orange-900/50 sm:px-4 sm:text-sm"
        >
          Cash Out
        </button>
      </div>
    </div>
  );
}
