import { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle, Wifi, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AttendanceRecord {
  id: string;
  team_member_name: string;
  date: string;
  status: 'Present' | 'Absent' | 'On Leave' | 'Remote';
  check_in_time: string | null;
  check_out_time: string | null;
  notes: string | null;
}

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [filteredAttendance, setFilteredAttendance] = useState<AttendanceRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .order('date', { ascending: false })
        .order('team_member_name', { ascending: true });

      if (error) throw error;
      setAttendance(data || []);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = attendance.filter(record => record.date === selectedDate);
    setFilteredAttendance(filtered);
  }, [selectedDate, attendance]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present':
        return <CheckCircle size={20} className="text-[#16A34A]" />;
      case 'Absent':
        return <XCircle size={20} className="text-[#DC2626]" />;
      case 'Remote':
        return <Wifi size={20} className="text-[#7DF9FF]" />;
      case 'On Leave':
        return <Calendar size={20} className="text-[#D97706]" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present':
        return 'from-[#16A34A] to-[#22C55E] text-[#0B0F17]';
      case 'Absent':
        return 'from-[#DC2626] to-[#EF4444] text-white';
      case 'Remote':
        return 'from-[#7DF9FF] to-[#00E5FF] text-[#0B0F17]';
      case 'On Leave':
        return 'from-[#D97706] to-[#F59E0B] text-[#0B0F17]';
      default:
        return 'from-[#6B7280] to-[#9CA3AF] text-white';
    }
  };

  const stats = {
    present: filteredAttendance.filter(r => r.status === 'Present').length,
    absent: filteredAttendance.filter(r => r.status === 'Absent').length,
    remote: filteredAttendance.filter(r => r.status === 'Remote').length,
    onLeave: filteredAttendance.filter(r => r.status === 'On Leave').length,
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (time: string | null) => {
    if (!time) return '-';
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="pt-[73px] pl-20 min-h-screen bg-gradient-to-br from-[#0B0F17] via-[#111827] to-[#0B0F17]">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Team Attendance</h2>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-400 mb-3">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-3 bg-[#111827]/60 backdrop-blur-xl rounded-lg border border-[#00E5FF]/20 text-white text-sm hover:border-[#00E5FF]/50 transition-all focus:outline-none focus:border-[#00E5FF]"
            />
          </div>

          <p className="text-[#00E5FF] text-sm mb-6 font-semibold">{formatDate(selectedDate)}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-[#111827]/60 to-[#0B0F17]/80 backdrop-blur-xl rounded-lg border border-[#16A34A]/20 p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Present</p>
              <p className="text-3xl font-bold text-[#16A34A]">{stats.present}</p>
            </div>
            <div className="bg-gradient-to-br from-[#111827]/60 to-[#0B0F17]/80 backdrop-blur-xl rounded-lg border border-[#DC2626]/20 p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Absent</p>
              <p className="text-3xl font-bold text-[#DC2626]">{stats.absent}</p>
            </div>
            <div className="bg-gradient-to-br from-[#111827]/60 to-[#0B0F17]/80 backdrop-blur-xl rounded-lg border border-[#7DF9FF]/20 p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Remote</p>
              <p className="text-3xl font-bold text-[#7DF9FF]">{stats.remote}</p>
            </div>
            <div className="bg-gradient-to-br from-[#111827]/60 to-[#0B0F17]/80 backdrop-blur-xl rounded-lg border border-[#D97706]/20 p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">On Leave</p>
              <p className="text-3xl font-bold text-[#D97706]">{stats.onLeave}</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading attendance...</div>
        ) : filteredAttendance.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No attendance records for this date</div>
        ) : (
          <div className="space-y-4">
            {filteredAttendance.map(record => (
              <div
                key={record.id}
                className="group relative bg-gradient-to-br from-[#111827]/60 to-[#0B0F17]/80 backdrop-blur-xl rounded-lg border border-[#00E5FF]/20 p-6 hover:border-[#00E5FF]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(record.status)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{record.team_member_name}</h3>
                        <p className="text-sm text-gray-400 mt-1">{record.notes || 'No notes'}</p>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getStatusColor(record.status)} text-xs font-bold tracking-wide`}>
                      {record.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 bg-[#0B0F17]/50 rounded-lg p-4 border border-[#00E5FF]/10">
                      <Clock size={18} className="text-[#00E5FF]" />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Check In</p>
                        <p className="text-sm font-mono font-bold text-white">{formatTime(record.check_in_time)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-[#0B0F17]/50 rounded-lg p-4 border border-[#00E5FF]/10">
                      <Clock size={18} className="text-[#FACC15]" />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Check Out</p>
                        <p className="text-sm font-mono font-bold text-white">{formatTime(record.check_out_time)}</p>
                      </div>
                    </div>

                    {record.check_in_time && record.check_out_time && (
                      <div className="flex items-center gap-3 bg-[#0B0F17]/50 rounded-lg p-4 border border-[#00E5FF]/10">
                        <Clock size={18} className="text-[#7DF9FF]" />
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wide">Duration</p>
                          <p className="text-sm font-mono font-bold text-white">
                            {(() => {
                              const checkIn = new Date(`2000-01-01T${record.check_in_time}`);
                              const checkOut = new Date(`2000-01-01T${record.check_out_time}`);
                              const diff = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60);
                              const hours = Math.floor(diff / 60);
                              const mins = diff % 60;
                              return `${hours}h ${mins}m`;
                            })()}
                          </p>
                        </div>
                      </div>
                    )}
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
