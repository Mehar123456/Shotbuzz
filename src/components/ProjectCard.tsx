import { Clock, Package, User, Hash } from 'lucide-react';

interface ProjectCardProps {
  clientName: string;
  status: 'Active' | 'In Progress' | 'Review' | 'Completed';
  workload: number;
  eta: string;
  assigned: string;
  estimatedId: string;
  packageId: string;
}

export default function ProjectCard({
  clientName,
  status,
  workload,
  eta,
  assigned,
  estimatedId,
  packageId,
}: ProjectCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'Active': return 'from-[#00E5FF] to-[#7DF9FF]';
      case 'In Progress': return 'from-[#FACC15] to-[#FCD34D]';
      case 'Review': return 'from-[#D97706] to-[#F59E0B]';
      case 'Completed': return 'from-[#16A34A] to-[#22C55E]';
      default: return 'from-[#6B7280] to-[#9CA3AF]';
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-[#111827]/60 to-[#0B0F17]/80 backdrop-blur-xl rounded-xl border border-[#00E5FF]/20 p-6 hover:border-[#00E5FF]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{clientName}</h3>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getStatusColor()} text-[#0B0F17] text-xs font-bold tracking-wide`}>
                {status}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Workload</span>
              <span className="text-sm font-mono font-bold text-[#00E5FF]">{workload}%</span>
            </div>
            <div className="relative h-2 bg-[#111827] rounded-full overflow-hidden border border-[#00E5FF]/20">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#00E5FF] to-[#7DF9FF] rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)] transition-all duration-700 ease-out"
                style={{ width: `${workload}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-[#0B0F17]/50 rounded-lg p-3 border border-[#00E5FF]/10">
              <Clock size={16} className="text-[#FACC15]" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">ETA</p>
                <p className="text-sm font-mono font-bold text-[#FACC15]">{eta}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#0B0F17]/50 rounded-lg p-3 border border-[#00E5FF]/10">
              <User size={16} className="text-[#7DF9FF]" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Assigned</p>
                <p className="text-sm font-semibold text-white truncate">{assigned}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#0B0F17]/50 rounded-lg p-3 border border-[#00E5FF]/10">
              <Hash size={16} className="text-[#16A34A]" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Est. ID</p>
                <p className="text-sm font-mono font-semibold text-white">{estimatedId}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#0B0F17]/50 rounded-lg p-3 border border-[#00E5FF]/10">
              <Package size={16} className="text-[#D15C3A]" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Package</p>
                <p className="text-sm font-mono font-semibold text-white">{packageId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
