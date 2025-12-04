import { Home, UserPlus, FileSpreadsheet } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F17]/80 backdrop-blur-xl border-b border-[#00E5FF]/20">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <img
              src="/009da114637aa565886afbfba674d326.png"
              alt="OscarFX"
              className="h-10 w-auto"
            />
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-[#00E5FF] to-transparent"></div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00E5FF] to-[#7DF9FF] bg-clip-text text-transparent tracking-wider">
              ShotBuzz
            </h1>
          </div>

          <nav className="flex items-center gap-4 ml-8">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111827]/50 border border-[#00E5FF]/30 text-white hover:bg-[#111827] hover:border-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300">
              <Home size={18} />
              <span className="text-sm font-medium">Home</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#16A34A] border border-[#16A34A]/50 text-white hover:bg-[#15803D] hover:shadow-[0_0_20px_rgba(22,163,74,0.4)] transition-all duration-300">
              <UserPlus size={18} />
              <span className="text-sm font-medium">Assign</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent border border-[#7DF9FF] text-[#7DF9FF] hover:bg-[#7DF9FF]/10 hover:shadow-[0_0_20px_rgba(125,249,255,0.3)] transition-all duration-300">
              <FileSpreadsheet size={18} />
              <span className="text-sm font-medium">Move to Excel</span>
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-gray-400">Production Pipeline</p>
            <p className="text-sm font-semibold text-[#00E5FF]">OscarFX Studio</p>
          </div>
        </div>
      </div>
    </header>
  );
}
