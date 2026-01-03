
import React, { useState } from 'react';
import { generateExercises } from '../services/geminiService';

const ExerciseLab: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('初中物理');
  const [results, setResults] = useState<any[]>([]);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const data = await generateExercises({ topic, grade, difficulty: 'medium' });
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
           <i className="fa-solid fa-vial-circle-check text-emerald-500"></i>
           智能分层作业设计
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="输入知识点（如：阿基米德原理、氧化还原反应...）"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <select 
            className="p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option>初中物理</option>
            <option>初中化学</option>
            <option>高中物理</option>
            <option>高中化学</option>
            <option>高中生物</option>
          </select>
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl transition-all disabled:bg-slate-300"
          >
            {loading ? '生成中...' : '生成习题'}
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((item, i) => (
            <div key={i} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className={`p-4 text-center font-bold text-white ${
                i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-indigo-500' : 'bg-purple-600'
              }`}>
                {item.level}
              </div>
              <div className="p-6 space-y-4">
                <div className="text-slate-800 font-medium min-h-[100px]">
                   {item.content}
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">正确答案</p>
                  <p className="text-sm text-slate-600 font-semibold">{item.answer}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-400 font-bold mb-1">解析</p>
                  <p className="text-xs text-slate-500 leading-relaxed italic">{item.analysis}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseLab;
