import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Analyzer = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  // Commented out image-related states
  /*
  const [image, setImage] = useState(null);
  const [imageText, setImageText] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const fileInputRef = useRef(null);
  */

  // Commented out image handling functions
  /*
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsProcessing(true);
      try {
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);

        // Create form data for upload
        const formData = new FormData();
        formData.append('image', file);       

        const data = await response.json();
        if (data.text) {
          setImageText(data.text);
          setInput(data.text); // Automatically set the extracted text as input
        }
      } catch (error) {
        console.error('Error processing image:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      fileInputRef.current.files = e.dataTransfer.files;
      handleImageUpload({ target: { files: [file] } });
    }
  };
  */

  const formatOutput = (text) => {
    try {
      const jsonData = typeof text === 'string' ? JSON.parse(text) : text;
      
      if (jsonData.postType) {
        // Create a simple formatted string from the JSON data
        const formattedText = [
          `Content Type: ${jsonData.postType}`,
          '',
          'Performance Metrics:',
          ...Object.entries(jsonData.predictedPerformance)
            .map(([key, value]) => `${key}: ${typeof value === 'number' ? value.toFixed(2) : value}`),
          '',
          'Insights:',
          ...jsonData.comparativeInsights.map(item => `• ${item.insight}`)
        ].join('\n');

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
      const response = await fetch('http://localhost:3000/api/v1/analytics/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const lastMessage = data.data.session_id ? 
        data.data.outputs[0].outputs[0].results.message.text : 
        data.message;
      setOutput(lastMessage);
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
  };

  // Commented out image toggle function
  /*
  const toggleImageUpload = () => {
    setShowImageUpload(!showImageUpload);
  };
  */

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
            {/* Commented out image upload section
            <div className="space-y-4">
              <button
                onClick={toggleImageUpload}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
                {showImageUpload ? 'Hide ' : 'upload'}
              </button>

              {showImageUpload && (
                <div className="bg-slate-700/30 p-6 rounded-2xl border border-slate-600/50">
                  <h3 className="text-lg font-medium text-slate-200 mb-4">Upload Image</h3>
                  <div
                    className="border-2 border-dashed border-slate-600/50 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500/50 transition-colors duration-200"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    {image ? (
                      <div className="space-y-4">
                        <img src={image} alt="Uploaded" className="max-h-64 mx-auto rounded-lg" />
                        {imageText && (
                          <div className="bg-slate-800/50 p-4 rounded-lg text-slate-300">
                            <p className="font-medium mb-2">Extracted Text:</p>
                            <p className="text-sm">{imageText}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-slate-400">
                        <p className="text-lg mb-2">Drag and drop an image here</p>
                        <p className="text-sm">or click to select a file</p>
                      </div>
                    )}
                    {isProcessing && (
                      <div className="mt-4 text-blue-400">Processing image...</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            */}

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