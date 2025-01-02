import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Video, FileText } from "lucide-react";
import { ChevronRight, Star, AlertTriangle, Lightbulb } from "lucide-react";
import { toast } from "react-toastify";

const VideoTranscript = () => {
    const [file, setFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const [output, setOutput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadType, setUploadType] = useState("video");
    const [transcriptionText, setTranscriptionText] = useState("");
    const fileInputRef = useRef(null);

    const formatOutput = ({ responseData }) => {
        if (!responseData) return null;

        try {
            const message = responseData.outputs[0].outputs[0].messages[0].message;

            const getIcon = (title) => {
                switch (title) {
                    case "Strengths:":
                        return <Star className="w-5 h-5 text-yellow-400" />;
                    case "Weaknesses:":
                        return <AlertTriangle className="w-5 h-5 text-red-400" />;
                    case "Suggestions:":
                        return <Lightbulb className="w-5 h-5 text-blue-400" />;
                    default:
                        return null;
                }
            };

            // Split the message into sections
            const sections = message.split(/(?=Strengths:|Weaknesses:|Suggestions:)/);
            
            return (
                <div className="space-y-6 text-white">
                    {sections.map((section, index) => {
                        const lines = section.trim().split('\n');
                        const title = lines[0];
                        const content = lines.slice(1);

                        

                        if (["Strengths:", "Weaknesses:", "Suggestions:"].includes(title)) {
                            return (
                                <div key={index} className="space-y-2">
                                    <h4 className="flex items-center gap-2 font-semibold text-lg">
                                        {getIcon(title)}
                                        {title}
                                    </h4>
                                    <div className="space-y-2 pl-7">
                                        {content.map((line, i) => {
                                            const trimmedLine = line.trim();
                                            if (trimmedLine) {  // Only render non-empty lines
                                                return (
                                                    <div key={i} className="flex gap-2 ml-10">
                                                        <span>{trimmedLine}</span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            );
        } catch (error) {
            console.error("Error formatting output:", error);
            return (
                <p className="text-red-400">
                    Error formatting response
                </p>
            );
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type.startsWith("video/")) {
            setFile(selectedFile);
            setVideoUrl(URL.createObjectURL(selectedFile));
            setOutput("");
        } else {
            toast.error("Please select a valid video file");
            setFile(null);
            setVideoUrl("");
        }
    };

    const handleGetTranscript = async () => {
        setIsProcessing(true);

        try {
            const formData = new FormData();

            if (uploadType === "video" && !file) {
                toast.error("Please select a video file");
                setIsProcessing(false);
                return;
            }

            if (uploadType === "text" && !transcriptionText) {
                toast.error("Please enter transcription text");
                setIsProcessing(false);
                return;
            }

            if (uploadType === "video" && file) {
                formData.append("video", file);
                formData.append("input_value", file.name);
            } else if (uploadType === "text") {
                formData.append("transcriptionText", transcriptionText);
                formData.append("input_value", "text_transcript");
            }

            const response = await fetch(
                "http://localhost:3000/api/v1/transcript/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
            if (data) {
                setOutput({ responseData: data });
                toast.success("Transcription analysis completed successfully");
            } else {
                toast.error("Failed to process request");
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("Error processing request: " + err.message);
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
                            <div className="mb-6 flex justify-center">
                                <ToggleSwitch
                                    value={uploadType}
                                    onChange={(type) => {
                                        setUploadType(type);
                                        setFile(null);
                                        setVideoUrl("");
                                        setTranscriptionText("");
                                    }}
                                />
                            </div>

                            {uploadType === "video" ? (
                                <div className="flex gap-3 items-center">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="video/*"
                                        className="hidden"
                                    />
                                    <button
                                        onClick={() =>
                                            fileInputRef.current.click()
                                        }
                                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Select Video
                                    </button>
                                    <button
                                        onClick={handleGetTranscript}
                                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {isProcessing
                                            ? "Processing..."
                                            : "Analyze Transcription"}
                                    </button>
                                    {file && (
                                        <span className="text-slate-300 text-sm truncate max-w-xs">
                                            {file.name}
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <textarea
                                        value={transcriptionText}
                                        onChange={(e) =>
                                            setTranscriptionText(e.target.value)
                                        }
                                        placeholder="Paste your transcription text here..."
                                        className="w-full h-52 bg-slate-800 text-white p-4 rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    <button
                                        onClick={handleGetTranscript}
                                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {isProcessing
                                            ? "Processing..."
                                            : "Analyze Transcription"}
                                    </button>
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
                            <h3 className="text-lg font-medium text-slate-200 mb-4">
                                Analysis Results
                            </h3>
                            <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-600/50 min-h-[200px] max-h-[400px] overflow-y-auto">
                                {isProcessing ? (
                                    <div className="flex items-center justify-center h-[200px] text-blue-400">
                                        <div className="animate-spin mr-2">
                                            ⚡
                                        </div>
                                        Processing request...
                                    </div>
                                ) : output ? (
                                    <div className="text-slate-100">
                                        {formatOutput(output)}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-[200px] text-slate-400 italic">
                                        Click 'Analyze Transcription' to
                                        analyze...
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

const ToggleSwitch = ({ value, onChange }) => (
    <div className="relative inline-flex bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
        <div
            className="absolute inset-1 w-[calc(50%-4px)] bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transition-transform duration-300 ease-out shadow-lg"
            style={{
                transform: `translateX(${value === "text" ? "100%" : "0"})`,
            }}
        />
        <button
            onClick={() => onChange("video")}
            className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors duration-300 min-w-[140px] justify-center ${value === "video" ? "text-white" : "text-slate-400"
                }`}
        >
            <Video size={18} />
            Video
        </button>
        <button
            onClick={() => onChange("text")}
            className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors duration-300 min-w-[140px] justify-center ${value === "text" ? "text-white" : "text-slate-400"
                }`}
        >
            <FileText size={18} />
            Text
        </button>
    </div>
);

export default VideoTranscript;
