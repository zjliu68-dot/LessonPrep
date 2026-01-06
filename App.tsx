
import React, { useState } from 'react';
import { AppView } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LessonPlanner from './components/LessonPlanner';
import ExerciseLab from './components/ExerciseLab';
import Analytics from './components/Analytics';
import Hub from './components/Hub';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'lesson-planner':
        return <LessonPlanner />;
      case 'exercise-lab':
        return <ExerciseLab />;
      case 'analytics':
        return <Analytics />;
      case 'hub':
        return <Hub />;
      case 'collab':
        return (
          <div className="flex items-center justify-center h-[60vh] text-slate-400 flex-col gap-4">
            <i className="fa-solid fa-people-group text-6xl"></i>
            <p className="text-xl font-medium">实时协作功能正在内测...</p>
          </div>
        );
      case 'personal-advice':
        return (
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
             <h2 className="text-2xl font-bold mb-6">AI 个性化教学建议</h2>
             <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 text-amber-800 space-y-4">
               <p className="font-bold flex items-center gap-2">
                 <i className="fa-solid fa-circle-exclamation"></i>
                 系统提示：
               </p>
               <p>基于当前班级平均分下降趋势，AI 建议在下一堂课中增加关于“能量守恒定律”的实际案例演示。已有 5 名同学在课后作业中出现同类计算错误。</p>
             </div>
             <button className="mt-6 w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200">
                生成针对性补强方案
             </button>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'dashboard': return '我的教研工作台';
      case 'lesson-planner': return 'AI 智能备课中心';
      case 'exercise-lab': return '练习与任务设计';
      case 'hub': return '全国优秀教研资源共享';
      case 'collab': return '协作教案编写';
      case 'analytics': return '实时学情看板';
      case 'personal-advice': return '个性化教学建议';
      default: return 'SciPrep AI';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 ml-64 p-8 min-h-screen">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{getViewTitle()}</h2>
            <p className="text-slate-500 mt-1">理科老师的高效教学伙伴</p>
          </div>
          <div className="flex gap-3">
             <button className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all">
               <i className="fa-solid fa-magnifying-glass"></i>
             </button>
             <button className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all relative">
               <i className="fa-solid fa-bell"></i>
               <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2">
               <i className="fa-solid fa-plus"></i>
               新建教研任务
             </button>
          </div>
        </header>

        <div className="animate-in fade-in duration-500">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
