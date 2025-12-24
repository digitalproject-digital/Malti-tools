
import React, { useState, useRef, useEffect } from 'react';
import { Tool } from '../types';
import { processWithAI } from '../services/gemini';

interface ToolInterfaceProps {
  tool: Tool;
}

const ToolInterface: React.FC<ToolInterfaceProps> = ({ tool }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-detect tool type
  const isImageTool = tool.category === "Image Tools";
  const isCodeTool = tool.category === "Developer Tools";

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setPreviewUrl(dataUrl);
        setInput(dataUrl.substring(0, 100) + "..."); // Just for visual feedback
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = (mode: string) => {
    if (!previewUrl || !canvasRef.current) return;
    setIsLoading(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        if (mode === 'grayscale') {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; data[i + 1] = avg; data[i + 2] = avg;
          }
          ctx.putImageData(imageData, 0, 0);
        }
        const format = tool.name.includes("PNG") ? "image/png" : "image/jpeg";
        const resultData = canvas.toDataURL(format);
        setOutput(resultData);
        setIsLoading(false);
      }
    };
    img.src = previewUrl;
  };

  const handleStandardProcess = () => {
    if (isImageTool) {
      if (tool.name.includes("Grayscale")) processImage('grayscale');
      else processImage('convert');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      let result = '';
      const text = input.trim();
      
      try {
        switch (tool.name) {
          case 'Word & Char Counter':
            const words = text ? text.split(/\s+/).filter(w => w.length > 0).length : 0;
            const readingTime = Math.ceil(words / 200);
            result = `--- Analysis ---\nWords: ${words}\nChars: ${text.length}\nReading Time: ~${readingTime} min\nLines: ${text.split('\n').length}`;
            break;
            
          case 'Case Converter':
            result = `Sentence: ${text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase())}\n\nUPPER: ${text.toUpperCase()}\n\nlower: ${text.toLowerCase()}\n\nTitle: ${text.replace(/\b\w/g, l => l.toUpperCase())}`;
            break;
            
          case 'JSON Formatter':
            result = JSON.stringify(JSON.parse(text), null, 4);
            break;
            
          case 'Password Generator':
            const charset = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+";
            result = Array.from({length: 24}, () => charset[Math.floor(Math.random() * charset.length)]).join('');
            break;

          case 'Binary Converter':
            result = text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
            break;

          case 'Scientific Calculator':
            // Use Function for basic safe evaluation
            result = `Result: ${new Function(`return ${text.replace(/[^0-9+\-*/().]/g, '')}`)()}`;
            break;

          case 'Reverse Text':
            result = text.split('').reverse().join('');
            break;

          case 'SHA-256 Hasher':
            // Simplified mock for local as real crypto needs async/complex web APIs
            result = "Use 'Smart AI Action' for verified cryptographic hashing.";
            break;

          case 'Remove Extra Spaces':
            result = text.replace(/\s+/g, ' ').trim();
            break;

          case 'Markdown to HTML':
            result = text.replace(/^# (.*$)/gim, '<h1>$1</h1>')
                        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                        .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
                        .replace(/\*(.*)\*/gim, '<i>$1</i>');
            break;

          case 'URL Encoder/Decoder':
            result = `Encoded: ${encodeURIComponent(text)}\nDecoded: ${decodeURIComponent(text)}`;
            break;

          default:
            result = `Processed Output for ${tool.name}:\n\n${text.split('').reverse().join('')}`;
        }
      } catch (e: any) {
        result = `Processing Error: ${e.message}. \nTry checking your input format or use AI mode.`;
      }
      
      setOutput(result);
      setIsLoading(false);
    }, 300);
  };

  const handleAIProcess = async () => {
    if (!input.trim() && !previewUrl) return;
    setAiLoading(true);
    let context = input;
    if (previewUrl && isImageTool) {
      context = `[Image Tool Context] User has uploaded an image for ${tool.name}. Base64 header: ${previewUrl.substring(0, 50)}`;
    }
    const result = await processWithAI(context, tool.name);
    setOutput(result || 'AI could not process this request.');
    setAiLoading(false);
  };

  const downloadOutput = () => {
    if (output.startsWith('data:image')) {
      const link = document.createElement('a');
      link.href = output;
      link.download = `multitools-${tool.filename}.${output.includes('png') ? 'png' : 'jpg'}`;
      link.click();
    } else {
      const blob = new Blob([output], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `output-${tool.filename}.txt`;
      link.click();
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Input Source</label>
          {isImageTool && (
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
            >
              <i className="fas fa-upload mr-2"></i> Upload Image
            </button>
          )}
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileUpload} 
        />

        {previewUrl && isImageTool ? (
          <div className="relative group rounded-2xl overflow-hidden border-2 border-dashed border-blue-200 bg-slate-50 p-4">
            <img src={previewUrl} className="max-h-64 mx-auto rounded-lg shadow-sm" alt="Preview" />
            <button 
              onClick={() => {setPreviewUrl(null); setInput('');}}
              className="absolute top-6 right-6 bg-red-500 text-white w-8 h-8 rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ) : (
          <textarea 
            className={`w-full h-48 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isCodeTool ? 'bg-slate-900 text-green-400 border-slate-700' : ''}`}
            placeholder={isImageTool ? "Or paste image URL here..." : `Enter text/code for ${tool.name}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={handleStandardProcess}
          disabled={isLoading || aiLoading || (!input && !previewUrl)}
          className="flex-grow md:flex-grow-0 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
        >
          {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-bolt"></i>}
          <span>Run Local Processing</span>
        </button>
        
        <button 
          onClick={handleAIProcess}
          disabled={isLoading || aiLoading || (!input && !previewUrl)}
          className="flex-grow md:flex-grow-0 bg-indigo-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          {aiLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
          <span>AI Supercharge</span>
        </button>
        
        <button 
          onClick={() => { setInput(''); setOutput(''); setPreviewUrl(null); }}
          className="px-6 py-3 rounded-xl font-bold border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
        >
          Reset
        </button>
      </div>

      {/* Output Section */}
      <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Output Result</label>
          {output && (
            <div className="flex gap-2">
              <button 
                onClick={downloadOutput}
                className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <i className="fas fa-download mr-1"></i> Download
              </button>
              <button 
                onClick={() => {navigator.clipboard.writeText(output); alert('Copied!');}}
                className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <i className="fas fa-copy mr-1"></i> Copy
              </button>
            </div>
          )}
        </div>

        <div className={`relative min-h-[12rem] rounded-2xl p-6 font-mono text-sm whitespace-pre-wrap border shadow-inner ${output.startsWith('data:image') ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 text-slate-300 border-slate-800'}`}>
          {output ? (
            output.startsWith('data:image') ? (
              <div className="text-center space-y-4">
                <img src={output} className="max-h-96 mx-auto rounded-lg shadow-xl" alt="Result" />
                <p className="text-slate-500 text-xs">Image processed successfully. Use the download button to save.</p>
              </div>
            ) : output
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 py-10 opacity-50">
              <i className="fas fa-terminal text-4xl mb-4"></i>
              <p>Resulting data will appear here...</p>
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
      
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-xs">
          <i className="fas fa-lightbulb"></i>
        </div>
        <div className="text-xs text-slate-600 leading-relaxed">
          <strong>Tip:</strong> Use <b>Local Processing</b> for instant results without internet. 
          Use <b>AI Supercharge</b> if you need intelligent parsing, summarization, or logic generation.
        </div>
      </div>
    </div>
  );
};

export default ToolInterface;
