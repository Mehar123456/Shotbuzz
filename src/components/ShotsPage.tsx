import { useState, useEffect } from 'react';
import { Filter, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Shot {
  id: string;
  client_name: string;
  project_name: string;
  shot_name: string;
  status: 'Active' | 'In Progress' | 'Review' | 'Completed';
  workload: number;
  eta_date: string;
  assigned_to: string;
  estimated_id: string;
  package_id: string;
  in_date: string;
}

export default function ShotsPage() {
  const [shots, setShots] = useState<Shot[]>([]);
  const [filteredShots, setFilteredShots] = useState<Shot[]>([]);
  const [filterClient, setFilterClient] = useState('All');
  const [filterProject, setFilterProject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShots();
  }, []);

  const fetchShots = async () => {
    try {
      const { data, error } = await supabase
        .from('shots')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setShots(data || []);
      setFilteredShots(data || []);
    } catch (error) {
      console.error('Error fetching shots:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = shots;

    if (filterClient !== 'All') {
      filtered = filtered.filter(shot => shot.client_name === filterClient);
    }

    if (filterProject !== 'All') {
      filtered = filtered.filter(shot => shot.project_name === filterProject);
    }

    if (searchQuery) {
      filtered = filtered.filter(shot =>
        shot.shot_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shot.assigned_to.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredShots(filtered);
  }, [filterClient, filterProject, searchQuery, shots]);

  const uniqueClients = Array.from(new Set(shots.map(s => s.client_name)));
  const uniqueProjects = Array.from(new Set(shots.map(s => s.project_name)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'from-[#00E5FF] to-[#7DF9FF]';
      case 'In Progress': return 'from-[#FACC15] to-[#FCD34D]';
      case 'Review': return 'from-[#D97706] to-[#F59E0B]';
      case 'Completed': return 'from-[#16A34A] to-[#22C55E]';
      default: return 'from-[#6B7280] to-[#9CA3AF]';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="pt-[73px] pl-20 min-h-screen bg-gradient-to-br from-[#0B0F17] via-[#111827] to-[#0B0F17]">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Shot's Tracking</h2>

          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#111827]/60 backdrop-blur-xl rounded-lg border border-[#00E5FF]/20">
              <Filter size={18} className="text-[#00E5FF]" />
              <span className="text-sm text-gray-400">Filters</span>
            </div>

            <select
              value={filterClient}
              onChange={(e) => setFilterClient(e.target.value)}
              className="px-4 py-2 bg-[#111827]/60 backdrop-blur-xl rounded-lg border border-[#00E5FF]/20 text-white text-sm hover:border-[#00E5FF]/50 transition-all focus:outline-none focus:border-[#00E5FF]"
            >
              <option>All Clients</option>
              {uniqueClients.map(client => (
                <option key={client} value={client}>{client}</option>
              ))}
            </select>

            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="px-4 py-2 bg-[#111827]/60 backdrop-blur-xl rounded-lg border border-[#00E5FF]/20 text-white text-sm hover:border-[#00E5FF]/50 transition-all focus:outline-none focus:border-[#00E5FF]"
            >
              <option>All Projects</option>
              {uniqueProjects.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>

            <div className="flex items-center gap-2 px-4 py-2 bg-[#111827]/60 backdrop-blur-xl rounded-lg border border-[#00E5FF]/20 flex-1 min-w-[200px]">
              <Search size={18} className="text-[#00E5FF]" />
              <input
                type="text"
                placeholder="Search shots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white text-sm focus:outline-none w-full placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading shots...</div>
        ) : filteredShots.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No shots found</div>
        ) : (
          <div className="space-y-4">
            {filteredShots.map(shot => (
              <div
                key={shot.id}
                className="group relative bg-gradient-to-br from-[#111827]/60 to-[#0B0F17]/80 backdrop-blur-xl rounded-lg border border-[#00E5FF]/20 p-6 hover:border-[#00E5FF]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Client</p>
                      <p className="text-lg font-bold text-[#00E5FF]">{shot.client_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Project</p>
                      <p className="text-lg font-bold text-white">{shot.project_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Shot Name</p>
                      <p className="text-lg font-bold text-[#7DF9FF]">{shot.shot_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</p>
                      <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${getStatusColor(shot.status)} text-[#0B0F17] text-xs font-bold`}>
                        {shot.status}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Work Progress</p>
                      <div className="relative h-2 bg-[#111827] rounded-full overflow-hidden border border-[#00E5FF]/20">
                        <div
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#00E5FF] to-[#7DF9FF] rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)] transition-all duration-700"
                          style={{ width: `${shot.workload}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-[#00E5FF] font-mono mt-1">{shot.workload}%</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">ETA</p>
                      <p className="text-lg font-mono font-bold text-[#FACC15]">{formatDate(shot.eta_date)}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">In Date</p>
                      <p className="text-lg font-mono font-bold text-[#16A34A]">{formatDate(shot.in_date)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 bg-[#0B0F17]/50 rounded-lg p-3 border border-[#00E5FF]/10">
                      <div className="w-2 h-2 rounded-full bg-[#7DF9FF]"></div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Assigned To</p>
                        <p className="text-sm font-semibold text-white">{shot.assigned_to}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-[#0B0F17]/50 rounded-lg p-3 border border-[#00E5FF]/10">
                      <div className="w-2 h-2 rounded-full bg-[#00E5FF]"></div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Est. ID</p>
                        <p className="text-sm font-mono font-semibold text-white">{shot.estimated_id}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-[#0B0F17]/50 rounded-lg p-3 border border-[#00E5FF]/10">
                      <div className="w-2 h-2 rounded-full bg-[#D15C3A]"></div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Package</p>
                        <p className="text-sm font-mono font-semibold text-white">{shot.package_id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
