// src/components/Shared/Modals/CameraModal.jsx
import React, { useEffect } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'motion/react';
import { PrimaryButton } from '../../UI/Buttons';
import { GlassCard } from '../../UI/Cards';
import { useCamera } from '../../../hooks/useCamera';
import { useFaceDetection } from '../../../hooks/useFaceDetection';
import { showSwal } from '../../../utils/swal';

const CameraModal = ({ isOpen, onClose, onCapture, user, title = "Take Selfie Photo for Attendance" }) => {
    const { webcamRef, canvasRef, streamReady, startCamera, stopCamera, setStreamReady } = useCamera(isOpen);
    const { isModelLoaded, faceDetected, loadModel, detectFaces } = useFaceDetection(webcamRef);

    useEffect(() => {
        if (isOpen) loadModel(() => {});
    }, [isOpen, loadModel]);

    useEffect(() => {
        if (isOpen) startCamera();
        else stopCamera();
    }, [isOpen, startCamera, stopCamera]);

    useEffect(() => {
        let interval;
        const drawFaceFrame = (face) => {
            const canvas = canvasRef.current;
            const video = webcamRef.current?.video;
            if (!canvas || !video) return;

            const ctx = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = face ? 'lime' : 'red';
            ctx.lineWidth = 3;

            const boxWidth = 200;
            const boxHeight = 200;
            const x = (canvas.width - boxWidth) / 2;
            const y = (canvas.height - boxHeight) / 2;

            ctx.strokeRect(x, y, boxWidth, boxHeight);
        };

        if (isOpen && streamReady && isModelLoaded) {
            interval = setInterval(async () => {
                await detectFaces();
                drawFaceFrame(faceDetected);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isOpen, streamReady, isModelLoaded, detectFaces, faceDetected, canvasRef, webcamRef]);

    const handleCaptureConfirm = () => {
        if (!faceDetected) {
            showSwal('Face Not Detected', 'Make sure your face is in the center of the frame.', 'warning');
            return;
        }

        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            onCapture(imageSrc);
            onClose();
            stopCamera();
        }
    };

    if (!isOpen) return null;
    const loadingStatus = !streamReady || !isModelLoaded;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <GlassCard className="relative w-full max-w-lg mx-auto p-6 shadow-xl bg-white">
                            <h2 className="text-xl font-bold mb-4 text-slate-800">{title}</h2>

                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden border-4 border-slate-200">
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    mirrored={true}
                                    videoConstraints={{ facingMode: 'user' }}
                                    onUserMedia={() => setStreamReady(true)}
                                    onUserMediaError={() => showSwal('Camera Access Failed', 'Please allow camera access.', 'error')}
                                    className="w-full h-full object-cover"
                                    style={{ display: streamReady ? 'block' : 'none' }}
                                />

                                {!streamReady && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
                                        <i className="fas fa-video-slash text-slate-500 text-3xl animate-pulse"></i>
                                    </div>
                                )}

                                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white text-xs flex justify-between">
                                    {streamReady && isModelLoaded ? (
                                        <span className={`font-semibold ${faceDetected ? 'text-green-400' : 'text-red-400'}`}>
                                            <i className={`fas ${faceDetected ? 'fa-check-circle' : 'fa-exclamation-triangle'} mr-1`}></i>
                                            {faceDetected ? 'Face Detected' : 'Face Not Detected'}
                                        </span>
                                    ) : (
                                        <span className="text-yellow-400 font-semibold">
                                            <i className="fas fa-spinner fa-spin mr-1"></i> Loading AI...
                                        </span>
                                    )}
                                    <span className="text-gray-400">{user.name}</span>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end space-x-3">
                                <PrimaryButton onClick={onClose} className="bg-slate-100 hover:bg-slate-200 text-slate-600">
                                    Cancel
                                </PrimaryButton>
                                <PrimaryButton onClick={handleCaptureConfirm} disabled={loadingStatus || !faceDetected}>
                                    <i className="fas fa-camera mr-2"></i> Confirm Photo
                                </PrimaryButton>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CameraModal;