import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ThumbnailAnalyzer = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [topic, setTopic] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      setAnalysisData(null);
      setError(null);
    }
  };

  const handleDelete = () => {
    setImageFile(null);
    setImageUrl(null);
    setAnalysisData(null);
    setError(null);
    setTopic('');
  };

  const handleUpload = async () => {
    if (!imageFile || !topic.trim()) {
      setError('Please provide both an image and a topic');
      return;
    }

    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      setError('You are not authorized. Please login again.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('photo', imageFile);
    formData.append('topic', topic.trim());

    try {
      const response = await axios.post('http://localhost:3000/api/v1/thumbnail/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setAnalysisData(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else {
        setError('Failed to analyze image. Please try again.');
      }
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Upload Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-6">
          <div className="flex flex-col items-center justify-center">
            <label className="w-full cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="mb-4">
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt="Thumbnail Preview" 
                      className="max-h-64 mx-auto rounded"
                    />
                  ) : (
                    <div className="text-white">Drop your thumbnail here or click to upload</div>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </label>

            {/* Topic Input */}
            {imageUrl && (
              <div className="w-full mt-4">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter your video topic"
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Action Buttons */}
            {imageUrl && (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleUpload}
                  disabled={loading || !topic.trim()}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Analyzing...' : 'Analyze Thumbnail'}
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Delete Image
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 text-red-400 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Analysis Results */}
        {analysisData && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
                <p className="text-gray-300 mt-1">Topic: {topic}</p>
              </div>
              <div className={`text-4xl font-bold ${getScoreColor(analysisData.overall_score)}`}>
                {analysisData.overall_score}
              </div>
            </div>

            {/* Scores */}
            <div className="space-y-4 mb-6">
              {Object.entries(analysisData.detailed_scores).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-white">
                    <span>{key.replace('_', ' ').toUpperCase()}</span>
                    <span className={getScoreColor(value)}>{value}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`${getScoreColor(value).replace('text', 'bg')} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-xl font-bold text-white mb-4">Suggestions</h3>
              <ul className="space-y-2">
                {analysisData.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-300 flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Metrics */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-gray-400 text-sm">Width</div>
                <div className="text-white font-bold">{analysisData.image_metrics.width}px</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-gray-400 text-sm">Height</div>
                <div className="text-white font-bold">{analysisData.image_metrics.height}px</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-gray-400 text-sm">Aspect Ratio</div>
                <div className="text-white font-bold">{analysisData.image_metrics.aspect_ratio}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThumbnailAnalyzer;