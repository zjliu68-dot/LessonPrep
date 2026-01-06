
import React, { useState } from 'react';
import { Resource } from '../types';

const MOCK_RESOURCES: Resource[] = [
  { id: '1', title: '高中物理：动量定理深度解析教案（含分层作业）', type: '教案', subject: '物理', grade: '高二', author: '王建国', downloads: 1250, likes: 450, previewUrl: 'https://images.unsplash.com/photo-1636466484362-c97035967c64?auto=format&fit=crop&w=400&q=80' },
  { id: '2', title: '初中数学：勾股定理精品同步习题（文本版）', type: '习题', subject: '数学', grade: '初二', author: '李美芳', downloads: 3400, likes: 890, previewUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80' },
  { id: '3', title: '探究性实验：电磁感应现象演示指南', type: '实验', subject: '物理', grade: '通用', author: '陈志远', downloads: 890, likes: 210, previewUrl: 'https://images.unsplash.com/photo-1626282874430-c11ae32d2898?auto=format&fit=crop&w=400&q=80' },
  { id: '4', title: '化学必修：离子反应方程式速记课件', type: '课件', subject: '化学', grade: '高一', author: '张晓蕾', downloads: 2100, likes: 560, previewUrl: 'https://images.unsplash.com/photo-1603126010305-18e541400877?auto=format&fit=crop&w=400&q=80' },
  { id: '5', title: '生物：细胞有丝分裂动态模型讲解教案', type: '教案', subject: '生物', grade: '高一', author: '林静', downloads: 1560, likes: 320, previewUrl: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&w=400&q=80' },
  { id: '6', title: '初三物理：欧姆定律实验探究配套习题', type: '习题', subject: '物理', grade: '初三', author: '周强', downloads: 2780, likes: 670, previewUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80' },
];

const Hub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const subjects = ['全部', '物理', '数学', '化学', '生物'];

  const filteredResources = MOCK_RESOURCES.filter(r => {
    const matchesTab = activeTab === '全部' || r.subject === activeTab;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-10">
      {/* 头部 Banner */}
      <div className="bg-gradient-to-br from-indigo-700 to-indigo-500 p-12 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-indigo-100 relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-black mb-4 tracking-tight">资源共享中心</h2>
          <p className="text-indigo-100 text-lg leading-relaxed">
            汇聚全国理科名师的智慧结晶。您可以查看、下载并引用优秀的教案、配套习题和实验方案。
          </p>
        </div>
        <div className="relative z-10 w-full md:w-96">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="搜索感兴趣的教研资料..." 
              className="w-full px-7 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl outline-none placeholder:text-white/60 focus:bg-white focus:text-slate-900 transition-all shadow-inner text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass absolute right-7 top-1/2 -translate-y-1/2 opacity-60 group-focus-within:opacity-100 transition-opacity"></i>
          </div>
        </div>
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
      </div>

      {/* 筛选导航 */}
      <div className="flex items-center gap-6 border-b border-slate-200 pb-2">
        {subjects.map(s => (
          <button
            key={s}
            onClick={() => setActiveTab(s)}
            className={`px-4 py-3 text-sm font-bold transition-all relative ${
              activeTab === s ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            {s}
            {activeTab === s && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full -mb-2 shadow-[0_-2px_8px_rgba(79,70,229,0.3)]"></div>}
          </button>
        ))}
      </div>

      {/* 资源列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <div key={resource.id} className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
              <div className="relative h-56">
                <img src={resource.previewUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={resource.title} />
                <div className="absolute top-5 left-5">
                  <span className="px-4 py-1.5 bg-white/95 backdrop-blur shadow-xl text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-[0.15em]">
                    {resource.type}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                   <button className="w-full py-4 bg-white text-indigo-600 font-bold rounded-2xl shadow-xl transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                     立即阅读全文
                   </button>
                </div>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">{resource.subject}</span>
                  <span className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">{resource.grade}</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-8 line-clamp-2 text-xl leading-snug group-hover:text-indigo-600 transition-colors">
                  {resource.title}
                </h4>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${resource.author}`} 
                      className="w-8 h-8 rounded-full bg-indigo-50 border border-slate-100" 
                      alt="avatar" 
                    />
                    <span className="text-xs font-bold text-slate-700">{resource.author}</span>
                  </div>
                  <div className="flex items-center gap-5 text-slate-400">
                    <span className="text-xs flex items-center gap-2">
                      <i className="fa-solid fa-download opacity-50"></i> {resource.downloads}
                    </span>
                    <button className="text-xs flex items-center gap-2 hover:text-pink-500 transition-colors">
                      <i className="fa-solid fa-heart opacity-50"></i> {resource.likes}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-slate-300">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <i className="fa-solid fa-magnifying-glass-chart text-4xl opacity-20"></i>
            </div>
            <p className="text-xl font-medium">暂时没有找到相关的教研资源</p>
            <p className="text-sm mt-2">换个关键词试试，或者由您来贡献第一份资料？</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hub;
