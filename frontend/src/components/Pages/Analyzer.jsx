import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../constant';

const Analyzer = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatOutput = (text) => {
    try {
      const jsonData = typeof text === 'string' ? JSON.parse(text) : text;
      
      if (jsonData.postType) {
        const insights = Array.isArray(jsonData.comparativeInsights)
          ? jsonData.comparativeInsights.map(item => item.insight)
          : Object.values(jsonData.comparativeInsights);

        return (
          <div className="space-y-6 bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            {/* Content Type Section */}
            <div className="border-b border-white/10 pb-4">
              <h4 className="text-blue-400 font-medium mb-2">Content Type</h4>
              <p className="text-slate-300">{jsonData.postType}</p>
            </div>

            {/* Performance Metrics Section */}
            <div className="border-b border-white/10 pb-4">
              <h4 className="text-blue-400 font-medium mb-3">Performance Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(jsonData.predictedPerformance).map(([key, value]) => (
                  <div key={key} className="bg-white/5 p-3 rounded-lg">
                    <p className="text-slate-400 text-sm mb-1">{key}</p>
                    <p className="text-slate-200 font-medium">
                      {typeof value === 'number' ? value.toFixed(2) : value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights Section */}
            <div>
              <h4 className="text-blue-400 font-medium mb-3">Insights</h4>
              <div className="space-y-2">
                {insights.map((insight, index) => (
                  <div 
                    key={index} 
                    className="bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-all duration-200"
                  >
                    {insight}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
      
      return formatTextOutput(text);
    } catch (e) {
      return formatTextOutput(text);
    }
  };

  const formatTextOutput = (text) => {
    // Split text by periods and filter out empty strings
    const sentences = text.split('.').filter(sentence => sentence.trim().length > 0);
    
    return (
      <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
        <div className="space-y-2">
          {sentences.map((sentence, index) => (
            <p key={index} className="text-slate-300 py-1 px-2 hover:bg-white/5 rounded transition-all">
              {sentence.trim()}.
            </p>
          ))}
        </div>
      </div>
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/analytics/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const lastMessage = data.session_id ? 
        data.outputs[0].outputs[0].results.message.text : 
        data.message;
      setOutput(lastMessage);
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 animate-[fadeIn_0.6s_ease-in-out]">
      <div className="max-w-8xl mx-auto">
        <div className="bg-slate-900/80 p-8 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/10 animate-[slideUp_0.6s_ease-out]">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-8">
            Analytics Dashboard
          </h2>
          
          <div className="space-y-6">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 hover:border-blue-500/20 transition-colors">
              <h3 className="text-lg font-medium text-blue-300 mb-4">Enter Your Message</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/5 text-slate-300 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all"
                  placeholder="Type your message or use extracted text..."
                />
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-slate-300 font-medium rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Analyze
                </button>
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 hover:border-blue-500/20 transition-colors">
              <h3 className="text-lg font-medium text-blue-300 mb-4">Analysis Results</h3>
              <div className="bg-white/5 p-5 rounded-xl border border-white/10 min-h-[200px] max-h-[400px] overflow-y-auto">
                <div className="text-slate-300">
                  {output ? (
                    formatOutput(output)
                  ) : (
                    <div className="flex items-center justify-center h-[200px] text-blue-400/80 italic">
                      Your analysis results will appear here...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyzer;