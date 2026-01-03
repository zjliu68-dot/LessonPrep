
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const radarData = [
  { subject: '逻辑推理', A: 80, full: 100 },
  { subject: '计算能力', A: 98, full: 100 },
  { subject: '实验分析', A: 65, full: 100 },
  { subject: '概念记忆', A: 70, full: 100 },
  { subject: '应用迁移', A: 55, full: 100 },
];

const historyData = [
  { name: '10-01', avg: 72 },
  { name: '10-08', avg: 75 },
  { name: '10-15', avg: 71 },
  { name: '10-22', avg: 79 },
  { name: '10-29', avg: 84 },
  { name: '11-05', avg: 82 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
           <div>
             <h2 className="text-2xl font-bold">班级整体学情分析</h2>
             <p className="text-slate-500">数据最后更新于：2024-11-20 14:00</p>
           </div>
           <div className="flex gap-2">
             <button className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50">下载报告</button>
             <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all">同步数据</button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-slate-700 mb-4 text-center">核心素养分布图</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Radar name="班级平均" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
             <h3 className="font-bold text-slate-700 mb-4 text-center">平均成绩趋势</h3>
             <div className="h-80">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={historyData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                   <YAxis hide />
                   <Tooltip 
                     contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                   />
                   <Line type="monotone" dataKey="avg" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-lg mb-6">重点学生关注 (薄弱预警)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 font-semibold text-slate-400 text-sm">学生姓名</th>
                <th className="pb-4 font-semibold text-slate-400 text-sm">学号</th>
                <th className="pb-4 font-semibold text-slate-400 text-sm">最近得分</th>
                <th className="pb-4 font-semibold text-slate-400 text-sm">薄弱知识点</th>
                <th className="pb-4 font-semibold text-slate-400 text-sm">状态</th>
                <th className="pb-4 font-semibold text-slate-400 text-sm">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: '王同学', id: '2023001', score: 58, weak: '受力分析', status: '预警' },
                { name: '李同学', id: '2023012', score: 62, weak: '能量守恒', status: '波动' },
                { name: '张同学', id: '2023045', score: 45, weak: '电路计算', status: '严峻' },
                { name: '赵同学', id: '2023021', score: 65, weak: '摩擦力', status: '好转' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 font-medium">{row.name}</td>
                  <td className="py-4 text-slate-500">{row.id}</td>
                  <td className="py-4 font-bold text-red-500">{row.score}</td>
                  <td className="py-4">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">{row.weak}</span>
                  </td>
                  <td className="py-4">
                     <span className={`text-xs px-2 py-1 rounded-md font-bold ${
                       row.status === '严峻' ? 'bg-red-100 text-red-600' : 
                       row.status === '预警' ? 'bg-orange-100 text-orange-600' :
                       'bg-blue-100 text-blue-600'
                     }`}>
                       {row.status}
                     </span>
                  </td>
                  <td className="py-4">
                    <button className="text-indigo-600 text-sm font-semibold hover:underline">个性化辅导</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
