
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { toolsData, categories } from './data/tools';
import { Tool } from './types';
import ToolInterface from './components/ToolInterface';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-slate-900 text-white sticky top-0 z-50 px-4 py-3 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="text-2xl font-extrabold flex items-center gap-2 hover:text-blue-400 transition-colors">
            <i className="fas fa-microchip text-blue-400"></i>
            <span>MultiTools <span className="text-blue-400">AI</span></span>
          </Link>
          
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search 150+ tools..." 
              className="w-full bg-slate-800 border-none rounded-full px-6 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute right-5 top-2.5 text-slate-500"></i>
            
            {searchTerm.length > 1 && (
              <div className="absolute top-12 left-0 right-0 bg-white text-slate-900 rounded-xl shadow-2xl max-h-96 overflow-y-auto z-[60] border border-slate-200">
                {toolsData
                  .filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(tool => (
                    <Link 
                      key={tool.id} 
                      to={`/tool/${tool.id}`}
                      className="flex items-center gap-3 p-3 hover:bg-slate-50 border-b last:border-none transition-colors"
                      onClick={() => setSearchTerm('')}
                    >
                      <i className={`fas ${tool.icon} text-blue-600 w-6 text-center`}></i>
                      <div>
                        <div className="font-semibold text-sm">{tool.name}</div>
                        <div className="text-xs text-slate-500">{tool.category}</div>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>
      </nav>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                 <i className="fas fa-microchip text-blue-400"></i>
                 MultiTools AI
              </h3>
              <p className="text-slate-400 max-w-md">
                Privacy-focused, lightweight, and AI-enhanced utility suite. 
                Processing happens mostly in your browser or through secure AI calls.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Categories</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                {categories.slice(0, 5).map(c => (
                  <li key={c.name}><a href={`#${c.name.toLowerCase().replace(/ /g, '-')}`} className="hover:text-white transition-colors">{c.name}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} MultiTools AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="space-y-12">
      <header className="gradient-primary text-white rounded-3xl p-12 text-center shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">One Platform, 150+ Smart Tools</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto opacity-90">
            Professional-grade utilities for everyone. Powered by AI, designed for speed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#tools-grid" className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:shadow-lg hover:bg-slate-50 transition-all">
              Explore All Tools
            </a>
            <div className="flex items-center gap-2 text-sm bg-blue-800/30 px-6 py-3 rounded-full backdrop-blur-sm">
              <i className="fas fa-shield-alt"></i> 100% Secure & Private
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <i className="fas fa-tools absolute -top-10 -left-10 text-[20rem] rotate-12"></i>
        </div>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <a 
            key={cat.name}
            href={`#${cat.name.toLowerCase().replace(/ /g, '-')}`}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 flex flex-col items-center gap-3 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <i className={`fas ${cat.icon}`}></i>
            </div>
            <span className="text-xs font-bold text-slate-700 text-center uppercase tracking-wider">{cat.name}</span>
          </a>
        ))}
      </section>

      <section id="tools-grid" className="space-y-12">
        {categories.map((category) => {
          const catTools = toolsData.filter(t => t.category === category.name);
          if (catTools.length === 0) return null;
          
          return (
            <div key={category.name} id={category.name.toLowerCase().replace(/ /g, '-')} className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-slate-800">{category.name}</h2>
                <div className="h-px flex-grow bg-slate-200"></div>
                <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{catTools.length} tools</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {catTools.map(tool => (
                  <Link 
                    key={tool.id} 
                    to={`/tool/${tool.id}`}
                    className="tool-card group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-100 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <i className={`fas ${tool.icon}`}></i>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 text-blue-400 transition-opacity">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

const ToolPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tool = toolsData.find(t => t.id === Number(id));

  if (!tool) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Tool not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:underline">Return Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <nav className="mb-8 flex items-center text-sm text-slate-500 gap-2">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <i className="fas fa-chevron-right text-[10px]"></i>
        <span>{tool.category}</span>
        <i className="fas fa-chevron-right text-[10px]"></i>
        <span className="text-slate-900 font-semibold">{tool.name}</span>
      </nav>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="gradient-primary p-8 text-white flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl">
              <i className={`fas ${tool.icon}`}></i>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">{tool.name}</h1>
              <p className="text-blue-100 opacity-80">{tool.description}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
           <ToolInterface tool={tool} />
        </div>
      </div>
      
      <div className="mt-12 bg-blue-50 rounded-2xl p-8 border border-blue-100 flex flex-col md:flex-row items-center gap-8">
        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex-shrink-0 flex items-center justify-center text-2xl shadow-lg">
           <i className="fas fa-magic"></i>
        </div>
        <div className="text-center md:text-left">
           <h3 className="text-lg font-bold text-blue-900 mb-2">Smart Processing Enabled</h3>
           <p className="text-blue-800/70 text-sm">
             This tool uses local processing for standard tasks and Gemini AI for advanced logical operations. 
             Your data is never used to train models.
           </p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tool/:id" element={<ToolPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
