import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Analyzer = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatOutput = (text) => {
    try {
      const jsonData = typeof text === 'string' ? JSON.parse(text) : text;
      
      if (jsonData.postType) {
        // Handle insights whether they're in an array or object format
        const insights = Array.isArray(jsonData.comparativeInsights)
          ? jsonData.comparativeInsights.map(item => item.insight)
          : Object.values(jsonData.comparativeInsights);

        const formattedText = [
          `Content Type: ${jsonData.postType}`,
          '',
          'Performance Metrics:',
          ...Object.entries(jsonData.predictedPerformance)
            .map(([key, value]) => `${key}: ${typeof value === 'number' ? value.toFixed(2) : value}`),
          '',
          'Insights:',
          ...insights.map(insight => `• ${insight}`)
        ].join('\n');

        console.log(formattedText)

        return (
          <div className="bg-slate-800/40 rounded-xl p-4 hover:bg-slate-800/60 transition-all duration-300">
            <pre className="text-slate-300 whitespace-pre-wrap font-sans">{formattedText}</pre>
          </div>
        );
      }
      
      return formatTextOutput(text);
    } catch (e) {
      return formatTextOutput(text);
    }
  };

  const formatTextOutput = (text) => {
    return (
      <div className="bg-slate-800/40 rounded-xl p-4 hover:bg-slate-800/60 transition-all duration-300">
        <p className="text-slate-300">{text}</p>
      </div>
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      console.log(data)
      const lastMessage = data.session_id ? 
        data.outputs[0].outputs[0].results.message.text : 
        data.message;
      setOutput(lastMessage);
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8 animate-[fadeIn_0.6s_ease-in-out]">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/home" 
          className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-white bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="mr-2">←</span>
          Back to Dashboard
        </Link>

        <div className="bg-slate-800/30 p-8 rounded-3xl shadow-2xl backdrop-blur-sm border border-slate-700/50 animate-[slideUp_0.6s_ease-out]">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-8">
            Analytics Dashboard
          </h2>
          
          <div className="space-y-6">
            <div className="bg-slate-700/30 p-6 rounded-2xl border border-slate-600/50">
              <h3 className="text-lg font-medium text-slate-200 mb-4">Enter Your Message</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-800/50 text-slate-100 border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="Type your message or use extracted text..."
                />
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  Analyze
                </button>
              </div>
            </div>

            <div className="bg-slate-700/30 p-6 rounded-2xl border border-slate-600/50">
              <h3 className="text-lg font-medium text-slate-200 mb-4">Analysis Results</h3>
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-600/50 min-h-[200px] max-h-[400px] overflow-y-auto">
                <div className="text-slate-100">
                  {output ? (
                    formatOutput(output)
                  ) : (
                    <div className="flex items-center justify-center h-[200px] text-slate-400 italic">
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