import {
  Bell,
  BookOpen,
  Calendar,
  Compass,
  Library,
  ListChecks,
  LucideIcon,
  Settings,
  Timer,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, NavLink, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import CoursesPage from './pages/Courses';
import LibraryPage from './pages/Library';
import OverviewPage from './pages/Overview';
import SchedulePage from './pages/Schedule';
import SettingsPage from './pages/Settings';
import TasksPage from './pages/Tasks';
import './App.css';
import './styles/dashboard-pages.css';

interface NavItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

const navItems: NavItem[] = [
  { label: '概览', icon: Compass, path: '/overview' },
  { label: '课程', icon: BookOpen, path: '/courses' },
  { label: '任务', icon: ListChecks, path: '/tasks' },
  { label: '资料库', icon: Library, path: '/library' },
  { label: '日程', icon: Calendar, path: '/schedule' },
  { label: '设置', icon: Settings, path: '/settings' },
];

function DashboardLayout() {
  const location = useLocation();
  const [focusCountdown, setFocusCountdown] = useState<number | null>(null);
  const [isFocusRunning, setFocusRunning] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (!isFocusRunning || focusCountdown === null) {
      return undefined;
    }
    if (focusCountdown <= 0) {
      setFocusRunning(false);
      setFocusCountdown(null);
      return undefined;
    }
    const timer = window.setTimeout(() => {
      setFocusCountdown((prev) => (prev ? prev - 1 : prev));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [focusCountdown, isFocusRunning]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000 * 30);
    return () => window.clearInterval(timer);
  }, []);

  const focusLabel = useMemo(() => {
    if (!isFocusRunning || focusCountdown === null) {
      return '开始专注 45′';
    }
    const minutes = Math.floor(focusCountdown / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(focusCountdown % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [focusCountdown, isFocusRunning]);

  const handleStartFocus = () => {
    if (isFocusRunning) {
      setFocusRunning(false);
      setFocusCountdown(null);
      return;
    }
    const minutes45 = 45 * 60;
    setFocusCountdown(minutes45);
    setFocusRunning(true);
  };

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
    }).format(now);
  }, [now]);

  const activeItem = useMemo(
    () => navItems.find((item) => location.pathname.startsWith(item.path)) ?? navItems[0],
    [location.pathname],
  );

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="主导航">
        <div className="brand">
          <div className="logo">技共</div>
          <span className="brand-text">TECH COMMONS</span>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <NavLink to={item.path} className={({ isActive }) => `nav-button${isActive ? ' is-active' : ''}`}>
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button type="button" className="focus-button" onClick={handleStartFocus}>
            <Timer aria-hidden="true" />
            <span>{focusLabel}</span>
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="top-bar">
          <div>
            <p className="subtitle">{formattedDate}</p>
            <h1 className="page-title">技术小天地 Dashboard · {activeItem.label}</h1>
          </div>
          <button type="button" className="icon-button" aria-label="查看提醒">
            <Bell aria-hidden="true" />
            <span className="icon-button-indicator" aria-hidden="true" />
          </button>
        </header>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
