import ProjectCard from './ProjectCard';

export default function Dashboard() {
  const projects = [
    {
      clientName: 'LLP',
      project: 'BETA',
      status: 'Active' as const,
      workload: 60,
      eta: '5 Days',
      assigned: 'PAINT',
      estimatedId: 'EST-2401',
      packageId: 'PKG-MS-047',
    },
    {
      clientName: 'RUL',
      project: 'DKT',
      status: 'In Progress' as const,
      workload: 90,  
      eta: '12 Days',
      assigned: 'ROTO',
      estimatedId: 'EST-2402',
      packageId: 'PKG-NF-183',
    },
    {
      clientName: 'TRX',
      project: 'HRG',
      status: 'Review' as const,
      workload: 92,
      eta: '2 Days',
      assigned: 'ROTO',
      estimatedId: 'EST-2403',
      packageId: 'PKG-WB-291',
    },
    {
      clientName: 'GOF',
      project: 'FRM',
      status: 'Active' as const,
      workload: 45,
      eta: '8 Days',
      assigned: 'COMP',
      estimatedId: 'EST-2404',
      packageId: 'PKG-UP-156',
    },
    {
      clientName: 'LLP',
      project: 'FIRE',
      status: 'Completed' as const,
      workload: 10,
      eta: '17days',
      assigned: 'PAINT',
      estimatedId: 'EST-2405',
      packageId: 'PKG-SP-092',
    },
    {
      clientName: 'RSE',
      project: 'GHW',
      status: 'In Progress' as const,
      workload: 45,
      eta: '18 Days',
      assigned: 'PAINT',
      estimatedId: 'EST-2406',
      packageId: 'PKG-AP-321',
    },
  ];

  return (
    <div className="pt-[73px] pl-20 min-h-screen bg-gradient-to-br from-[#0B0F17] via-[#111827] to-[#0B0F17]">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">OFX-Production Pipeline</h2>
          <p className="text-gray-400">Active projects and workload status</p>

          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-3 px-4 py-3 bg-[#111827]/60 backdrop-blur-xl rounded-lg border border-[#00E5FF]/20">
              <div className="w-3 h-3 rounded-full bg-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.8)]"></div>
              <span className="text-sm text-gray-300">
                <span className="font-mono font-bold text-[#00E5FF]">{projects.filter(p => p.status === 'Active').length}</span> Active
              </span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 bg-[#111827]/60 backdrop-blur-xl rounded-lg border border-[#FACC15]/20">
              <div className="w-3 h-3 rounded-full bg-[#FACC15] shadow-[0_0_10px_rgba(250,204,21,0.8)]"></div>
              <span className="text-sm text-gray-300">
                <span className="font-mono font-bold text-[#FACC15]">{projects.filter(p => p.status === 'In Progress').length}</span> In Progress
              </span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 bg-[#111827]/60 backdrop-blur-xl rounded-lg border border-[#16A34A]/20">
              <div className="w-3 h-3 rounded-full bg-[#16A34A] shadow-[0_0_10px_rgba(22,163,74,0.8)]"></div>
              <span className="text-sm text-gray-300">
                <span className="font-mono font-bold text-[#16A34A]">{projects.filter(p => p.status === 'Completed').length}</span> Completed
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-20 right-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent"></div>
    </div>
  );
}
