'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UploadCard({ title, icon, docType, onFileSelect, file }) {
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const isCameraEnabled = ['aadhaar', 'selfie'].includes(docType);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: docType === 'selfie' ? 'user' : 'environment' },
        audio: false 
      });
      setStream(mediaStream);
      setShowCamera(true);
      
      // Wait for video element to be available
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (err) {
      console.error('Camera access denied:', err);
      alert('Please allow camera access to capture photos');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      const file = new File([blob], `${docType}-${Date.now()}.jpg`, { type: 'image/jpeg' });
      onFileSelect(docType, file);
      stopCamera();
    }, 'image/jpeg', 0.9);
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      onFileSelect(docType, selectedFile);
    }
  };

  return (
    <>
      <motion.div
        className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-cyan-500/50 transition-all"
        whileHover={{ scale: 1.02 }}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">{icon}</div>
          <h3 className="text-white font-semibold mb-3">{title}</h3>
          
          {file ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                <span>✓</span>
                <span>{file.name}</span>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
              >
                Change File
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                📁 Choose File
              </button>
              
              {isCameraEnabled && (
                <button
                  onClick={startCamera}
                  className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  📷 Open Camera
                </button>
              )}
              
              <p className="text-xs text-gray-500 mt-2">
                {isCameraEnabled ? 'Upload or capture' : 'Upload document'}
              </p>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </motion.div>

      {/* Camera Modal */}
      <AnimatePresence>
        {showCamera && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">
                  📷 Capture {title}
                </h3>
                <button
                  onClick={stopCamera}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="relative bg-black rounded-xl overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-auto max-h-96"
                />
                
                {/* Overlay guides */}
                {docType === 'aadhaar' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="border-4 border-cyan-500/50 rounded-xl w-4/5 h-3/5">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-cyan-500/90 text-white px-4 py-1 rounded-full text-sm">
                        Align Aadhaar card within frame
                      </div>
                    </div>
                  </div>
                )}
                
                {docType === 'selfie' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="border-4 border-purple-500/50 rounded-full w-64 h-64">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-500/90 text-white px-4 py-1 rounded-full text-sm">
                        Position your face in the circle
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={capturePhoto}
                  className="flex-1 py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white rounded-full text-lg font-bold transition-colors"
                >
                  📸 Capture Photo
                </button>
                <button
                  onClick={stopCamera}
                  className="px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
              
              <p className="text-center text-gray-400 text-sm mt-4">
                {docType === 'aadhaar' 
                  ? 'Make sure all text is clearly visible and in focus'
                  : 'Ensure good lighting and look directly at the camera'}
              </p>
            </motion.div>
            
            <canvas ref={canvasRef} className="hidden" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
