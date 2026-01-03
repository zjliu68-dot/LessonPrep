
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: '工作台' },
    { id: 'lesson-planner', icon: 'fa-pen-to-square', label: '教案生成' },
    { id: 'exercise-lab', icon: 'fa-vial', label: '任务设计' },
    { id: 'hub', icon: 'fa-share-nodes', label: '资源共享' },
    { id: 'collab', icon: 'fa-users-rectangle', label: '协作编辑' },
    { id: 'analytics', icon: 'fa-chart-line', label: '学情分析' },
    { id: 'personal-advice', icon: 'fa-lightbulb', label: '个性化建议' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-xl font-bold">
          S
        </div>
        <h1 className="text-xl font-bold tracking-tight">SciPrep AI</h1>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as AppView)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center overflow-hidden">
             <img src="https://picsum.photos/seed/user/32/32" alt="avatar" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-semibold truncate">张老师</p>
            <p className="text-[10px] text-slate-500 truncate">高级物理教师</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
