
import React, { useState } from 'react';
import { generateLessonPlan } from '../services/geminiService';

const LessonPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '物理',
    syllabus: '',
    goals: '',
    content: '',
    mode: '探究式教学'
  });
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const plan = await generateLessonPlan(formData);
      setResult(plan || "未能生成内容，请重试。");
    } catch (error) {
      console.error(error);
      alert("生成失败，请检查网络或API配置。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <i className="fa-solid fa-wand-magic-sparkles text-indigo-500"></i>
            AI 智能教案生成
          </h2>
          <p className="text-slate-500 mt-1">输入课程背景信息，为您生成专业的标准化理科教案</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">学科类别</label>
              <select 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>物理</option>
                <option>化学</option>
                <option>生物</option>
                <option>数学</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">教学模式偏好</label>
              <select 
                value={formData.mode}
                onChange={(e) => setFormData({...formData, mode: e.target.value})}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>探究式教学 (5E模型)</option>
                <option>讲授式教学</option>
                <option>项目式学习 (PBL)</option>
                <option>翻转课堂</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">教学大纲 & 课程目标</label>
            <textarea 
              rows={3}
              placeholder="例如：理解牛顿第二定律及其在实际生活中的应用..."
              value={formData.syllabus}
              onChange={(e) => setFormData({...formData, syllabus: e.target.value})}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">教材核心内容</label>
            <textarea 
              rows={4}
              placeholder="输入教材中的关键知识点或段落..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <button 
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
              loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-circle-notch animate-spin"></i>
                深度分析与生成中...
              </span>
            ) : '一键生成标准化教案'}
          </button>
        </form>

        {result && (
          <div className="p-8 border-t border-slate-50 bg-slate-50/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">生成结果预览</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
                  <i className="fa-solid fa-copy mr-2"></i>复制
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                  <i className="fa-solid fa-download mr-2"></i>导出PDF
                </button>
              </div>
            </div>
            <div className="prose prose-slate max-w-none bg-white p-8 rounded-2xl border border-slate-200 shadow-inner overflow-auto max-h-[600px] whitespace-pre-wrap leading-relaxed">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPlanner;
