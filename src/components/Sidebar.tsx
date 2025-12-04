import { CheckSquare, Film, Users, FileText, Calendar } from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
}

export default function Sidebar({ activeItem, onNavigate }: SidebarProps) {
  const menuItems = [
    { icon: CheckSquare, label: 'Task' },
    { icon: Film, label: 'Shots' },
    { icon: Users, label: 'Attendance' },
    { icon: FileText, label: 'Logs' },
    { icon: Calendar, label: 'Leaves' },
  ];

  return (
    <aside className="fixed left-0 top-[73px] bottom-0 w-20 bg-[#0B0F17]/90 backdrop-blur-xl border-r border-[#00E5FF]/20 z-40">
      <nav className="flex flex-col items-center gap-2 py-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;

          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.label)}
              className={`relative flex flex-col items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 group ${
                isActive
                  ? 'text-[#00E5FF]'
                  : 'text-gray-400 hover:text-[#7DF9FF]'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#00E5FF] to-[#7DF9FF] rounded-r-full shadow-[0_0_10px_rgba(0,229,255,0.6)]"></div>
              )}

              <Icon
                size={24}
                className={`transition-all duration-300 ${
                  isActive
                    ? 'drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]'
                    : 'group-hover:drop-shadow-[0_0_6px_rgba(125,249,255,0.5)]'
                }`}
              />
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
