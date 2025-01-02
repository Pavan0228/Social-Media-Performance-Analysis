import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const VideoTranscript = () => {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const formatOutput = (responseData) => {
    if (!responseData) return null;

    try {
      // Extract the message from the response structure
      const message = responseData.data.outputs[0].outputs[0].results.message.text;
      
      return (
        <div className="space-y-6">
          {message.split('\n\n').map((section, index) => {
            if (section.trim()) {
              const [title, ...content] = section.split('\n');
              return (
                <div 
                  key={index} 
                  className="bg-slate-800/40 rounded-xl p-4 transform transition-all duration-300 hover:scale-[1.01] hover:bg-slate-800/60 border border-slate-700/50"
                >
                  <h4 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-3 flex items-center">
                    <span className="text-emerald-400 mr-2">●</span>
                    {title.trim()}
                  </h4>
                  <div className="space-y-2">
                    {content.map((line, i) => (
                      <div key={i} className="flex items-start space-x-2 text-slate-300 p-2 hover:bg-slate-700/30 rounded-lg transition-colors duration-200">
                        <span className="text-blue-400 text-lg">{line.trim().startsWith('1.') || line.trim().startsWith('2.') ? '•' : ''}</span>
                        <span className="flex-1">{line.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      );
    } catch (error) {
      console.error('Error formatting output:', error);
      return <p className="text-red-400">Error formatting response</p>;
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      setVideoUrl(URL.createObjectURL(selectedFile));
      setError('');
      setOutput('');
    } else {
      setError('Please select a valid video file');
      setFile(null);
      setVideoUrl('');
    }
  };

  const handleGetTranscript = async () => {
    setIsProcessing(true);
    setError('');

    try {
      const formData = new FormData();
      
      // If there's a file, append it to formData
      if (file) {
        formData.append('video', file);
      }

      // Add input_value to formData (you can modify this as needed)
      formData.append('input_value', file ? file.name : 'No video selected');

      const response = await fetch('http://localhost:3000/api/v1/transcript/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.success) {
        setOutput(data);
      } else {
        setError('Failed to process request');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error processing request: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/home" 
          className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-white bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="mr-2">←</span>
          Back to Dashboard
        </Link>

        <div className="bg-slate-800/30 p-8 rounded-3xl shadow-2xl backdrop-blur-sm border border-slate-700/50">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-8">
            Video Transcription
          </h2>

          <div className="space-y-6">
            <div className="bg-slate-700/30 p-6 rounded-2xl border border-slate-600/50">
              <div className="flex gap-3 items-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="video/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  Select Video
                </button>
                <button
                  onClick={handleGetTranscript}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isProcessing ? 'Processing...' : 'Get Transcript'}
                </button>
                {file && (
                  <span className="text-slate-300 text-sm truncate max-w-xs">
                    {file.name}
                  </span>
                )}
              </div>

              {error && (
                <div className="mt-4 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {videoUrl && (
                <div className="mt-4">
                  <video 
                    src={videoUrl} 
                    controls 
                    className="w-full max-h-[300px] rounded-xl bg-slate-800/50"
                  />
                </div>
              )}
            </div>

            <div className="bg-slate-700/30 p-6 rounded-2xl border border-slate-600/50">
              <h3 className="text-lg font-medium text-slate-200 mb-4">Analysis Results</h3>
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-600/50 min-h-[200px] max-h-[400px] overflow-y-auto">
                {isProcessing ? (
                  <div className="flex items-center justify-center h-[200px] text-blue-400">
                    <div className="animate-spin mr-2">⚡</div>
                    Processing request...
                  </div>
                ) : output ? (
                  <div className="text-slate-100">
                    {formatOutput(output)}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[200px] text-slate-400 italic">
                    Click 'Get Transcript' to analyze...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTranscript;