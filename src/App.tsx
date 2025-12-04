import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ShotsPage from './components/ShotsPage';
import AttendancePage from './components/AttendancePage';

function App() {
  const [activePage, setActivePage] = useState('Task');

  const renderPage = () => {
    switch (activePage) {
      case 'Task':
        return <Dashboard />;
      case 'Shots':
        return <ShotsPage />;
      case 'Attendance':
        return <AttendancePage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] font-['Inter',sans-serif]">
      <Header />
      <Sidebar activeItem={activePage} onNavigate={setActivePage} />
      {renderPage()}

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7DF9FF]/5 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}

export default App;
