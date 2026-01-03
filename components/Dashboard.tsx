
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: '力学', mastery: 85, fill: '#6366f1' },
  { name: '电磁学', mastery: 62, fill: '#ec4899' },
  { name: '光学', mastery: 78, fill: '#10b981' },
  { name: '热学', mastery: 45, fill: '#f59e0b' },
  { name: '原子物理', mastery: 92, fill: '#8b5cf6' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '本周生成教案', val: '12', icon: 'fa-file-lines', color: 'text-blue-500' },
          { label: '习题库数量', val: '458', icon: 'fa-book-open', color: 'text-green-500' },
          { label: '平均学情分', val: '78.5', icon: 'fa-star', color: 'text-yellow-500' },
          { label: '待处理建议', val: '5', icon: 'fa-bell', color: 'text-red-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.val}</h3>
            </div>
            <div className={`${stat.color} bg-slate-50 p-3 rounded-xl`}>
              <i className={`fa-solid ${stat.icon} text-xl`}></i>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">全班知识点掌握度分布</h3>
            <button className="text-indigo-600 text-sm font-medium">查看详情</button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="mastery" radius={[8, 8, 0, 0]} barSize={40}>
                   {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg mb-4">近期备课活动</h3>
          <div className="space-y-4">
            {[
              { title: '高中物理：动量守恒定律', time: '2小时前', type: '教案生成' },
              { title: '初中化学：酸碱中和反应实验', time: '5小时前', type: '资源上传' },
              { title: '初中物理：牛顿第一定律习题', time: '昨天', type: '习题设计' },
              { title: '学生学情月度报告', time: '2天前', type: '数据分析' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-clock-rotate-left text-slate-400"></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{activity.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">{activity.time}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-xs text-indigo-500 font-medium">{activity.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
