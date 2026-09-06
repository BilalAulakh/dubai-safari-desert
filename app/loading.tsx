import { Compass } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FCFBF8] space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin" />
        <Compass className="w-6 h-6 text-amber-600 absolute" />
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
        Loading Desert Experience...
      </p>
    </div>
  );
}
