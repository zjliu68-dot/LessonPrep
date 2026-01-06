
import React, { useState, useRef } from 'react';
import { generateLessonPlan, generateExercises } from '../services/geminiService';
import { Exercise } from '../types';

const LessonPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [exerciseLoading, setExerciseLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '物理',
    syllabus: '',
    goals: '',
    content: '',
    mode: '探究式教学 (5E模型)'
  });
  const [uploadedFiles, setUploadedFiles] = useState<{ data: string; mimeType: string; preview: string }[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [exercisesText, setExercisesText] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = (reader.result as string).split(',')[1];
        setUploadedFiles(prev => [...prev, {
          data: base64Data,
          mimeType: file.type,
          preview: reader.result as string
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setExercisesText(null);
    try {
      const plan = await generateLessonPlan({
        ...formData,
        files: uploadedFiles.map(f => ({ data: f.data, mimeType: f.mimeType }))
      });
      setResult(plan || "未能生成内容，请重试。");
    } catch (error) {
      console.error(error);
      alert("生成失败，请检查网络或API配置。");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateExercises = async () => {
    if (!result) return;
    setExerciseLoading(true);
    try {
      // 传递生成的教案作为习题设计的上下文，确保配套
      const rawExercises = await generateExercises({ 
        topic: `【参考教案内容】\n${result.substring(0, 1000)}`, 
        grade: formData.subject, 
        difficulty: 'medium' 
      });
      
      // 将习题转换为标准的文本作业格式
      const formattedText = rawExercises.map((ex: Exercise, idx: number) => (
        `【习题 ${idx + 1} - ${ex.level}】\n题目：${ex.content}\n\n[正确答案]：${ex.answer}\n[解析提示]：${ex.analysis}\n`
      )).join('\n' + '─'.repeat(30) + '\n\n');
      
      setExercisesText(formattedText);
      // 自动滚动到习题区
      setTimeout(() => {
        document.getElementById('exercise-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } catch (e) {
      console.error(e);
      alert("习题配套生成失败。");
    } finally {
      setExerciseLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("内容已复制到剪贴板，可直接粘贴至Word或PPT！");
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <i className="fa-solid fa-wand-magic-sparkles text-indigo-500"></i>
            理科智能备课空间
          </h2>
          <p className="text-slate-500 mt-1">基于教材解析生成教案，并自动配套分层文本作业</p>
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
                <option>数学</option>
                <option>化学</option>
                <option>生物</option>
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

          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-700 block">参考资料上传（教科书图片、参考资料、旧教案）</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
            >
              <i className="fa-solid fa-cloud-arrow-up text-4xl text-slate-300 group-hover:text-indigo-400 mb-3 transition-colors"></i>
              <p className="text-slate-500 font-medium">点击或拖拽上传资料图片</p>
              <p className="text-xs text-slate-400 mt-1">AI 将自动读取图片中的核心知识点和习题情境</p>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple accept="image/*" />
            </div>

            {uploadedFiles.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 group">
                    <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                      className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <i className="fa-solid fa-trash-can text-lg"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">教学大纲 & 课程目标</label>
              <textarea 
                rows={3}
                placeholder="请输入本课对应的教学大纲要求或具体课程目标..."
                value={formData.syllabus}
                onChange={(e) => setFormData({...formData, syllabus: e.target.value})}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">教材内容 & 核心要点</label>
              <textarea 
                rows={3}
                placeholder="请输入教材核心内容描述或知识要点..."
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-bold text-white transition-all shadow-xl ${
              loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-circle-notch animate-spin"></i>
                正在解析多模态资料并生成教案...
              </span>
            ) : '生成智能教案'}
          </button>
        </form>

        {result && (
          <div className="p-8 border-t border-slate-50 bg-slate-50/30 space-y-8">
            {/* 教案预览区 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">1</div>
                  <h3 className="text-lg font-bold text-slate-900">教案生成结果</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => copyToClipboard(result)} className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm">
                    <i className="fa-solid fa-copy"></i>
                  </button>
                  <button 
                    onClick={handleGenerateExercises}
                    disabled={exerciseLoading}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 flex items-center gap-2 shadow-lg shadow-emerald-100 disabled:bg-slate-300 transition-all"
                  >
                    {exerciseLoading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : <i className="fa-solid fa-file-pen"></i>}
                    配套生成分层作业
                  </button>
                </div>
              </div>
              <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm prose prose-slate max-w-none whitespace-pre-wrap leading-relaxed font-serif text-slate-800">
                {result}
              </div>
            </div>

            {/* 习题文本呈现区 */}
            {exercisesText && (
              <div id="exercise-section" className="space-y-4 animate-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">2</div>
                    <h3 className="text-lg font-bold text-slate-900">配套分层作业设计 (文本格式)</h3>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => copyToClipboard(exercisesText)} className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold hover:text-emerald-600 hover:border-emerald-200 flex items-center gap-2 shadow-sm transition-all">
                      <i className="fa-solid fa-paste"></i> 复制全文习题
                    </button>
                    <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-500 hover:text-indigo-600 shadow-sm transition-all">
                      <i className="fa-solid fa-share-nodes mr-2"></i>分享至资源库
                    </button>
                  </div>
                </div>
                <div className="bg-white p-10 rounded-3xl border-l-8 border-l-emerald-500 border-slate-200 shadow-sm prose prose-emerald max-w-none whitespace-pre-wrap leading-relaxed italic text-slate-700">
                  {exercisesText}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPlanner;
