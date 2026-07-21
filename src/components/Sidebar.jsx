import React from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  FileText,
  Download,
  Zap
} from 'lucide-react';

/**
 * TRISULAPROMPT - Sidebar Navigation Component
 * Collapsible navigation panel for switching workspace views & triggering export tools.
 * 
 * @param {Object} props
 * @param {boolean} props.isSidebarOpen - Responsive toggle state for sidebar expansion
 * @param {string} props.activeTab - Currently active tab identifier ('dashboard' | 'projects' | 'workspace' | 'notion')
 * @param {Function} props.setActiveTab - State setter function for tab switching
 * @param {Function} props.onOpenExport - Callback to trigger Export Center modal
 */
export default function Sidebar({
  isSidebarOpen,
  activeTab,
  setActiveTab,
  onOpenExport
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard SaaS',
      icon: LayoutDashboard,
      color: 'text-indigo-400'
    },
    {
      id: 'projects',
      label: 'Project Hub',
      icon: FolderKanban,
      color: 'text-indigo-400'
    },
    {
      id: 'workspace',
      label: 'AI Workspace (Split)',
      icon: Sparkles,
      color: 'text-amber-400'
    },
    {
      id: 'notion',
      label: 'Notion Studio',
      icon: FileText,
      color: 'text-emerald-400'
    }
  ];

  return (
    <aside
      className={`${
        isSidebarOpen ? 'w-64' : 'w-16'
      } bg-[#0F172A]/70 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 z-30 shrink-0`}
    >
      {}
      <div className="p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
              title={!isSidebarOpen ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 ${item.color} shrink-0`} />
              {isSidebarOpen && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </div>

      {}
      {isSidebarOpen && (
        <div className="p-3 m-3 bg-slate-900/80 border border-slate-800 rounded-2xl text-center shadow-lg">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
            <Zap className="w-4 h-4 fill-amber-400" />
            <span className="text-xs font-bold">3 Pilar Active</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed mb-2">
            Mindful • Meaningful • Joyful Engine Connected
          </p>
          <button
            onClick={onOpenExport}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-1.5 rounded-lg border border-slate-700 transition flex items-center justify-center gap-1.5 font-medium active:scale-95"
          >
            <Download className="w-3.5 h-3.5" /> Export Center
          </button>
        </div>
      )}
    </aside>
  );
}
