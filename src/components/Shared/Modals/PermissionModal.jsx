// src/components/Shared/Modals/PermissionModal.jsx
import React, { useState } from 'react';

const PermissionModal = ({ isOpen, onClose, onSubmit, user, permissionData, workSettings }) => {
  const [note, setNote] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !permissionData) return null;

  const { type, isLate, isEarlyOut, currentTime, lateDuration } = permissionData;
  const workTime = type === 'In' ? workSettings?.startTime || '08:00' : workSettings?.endTime || '17:00';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note.trim()) {
      alert('Please fill in the permission reason');
      return;
    }
    if (!file) {
      alert('Please upload supporting evidence');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        note: note.trim(),
        file: file ? URL.createObjectURL(file) : null,
        originalTime: currentTime,
        workTime: workTime,
        type: type,
        lateDuration: lateDuration
      });
      setNote('');
      setFile(null);
    } catch (error) {
      console.error('Error submitting permission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      alert('Maximum file size is 5MB');
      return;
    }
    setFile(selectedFile);
  };

  const isFormValid = note.trim() && file;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-700/50">
        <div className="flex h-full">
          {/* Left Panel - Info Section */}
          <div className="w-1/3 p-8 bg-gradient-to-br from-indigo-600 to-violet-700 text-white">
            <div className="flex flex-col h-full">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-700/30 flex items-center justify-center mb-4">
                  <i className="fas fa-exclamation-triangle text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {type === 'In' ? 'Late Permission' : 'Early Leave Permission'}
                </h3>
                <p className="text-white/80">
                  {type === 'In' ? 'Clock In' : 'Clock Out'} - {currentTime}
                </p>
                {isLate && lateDuration > 0 && (
                  <p className="text-yellow-300 text-sm mt-1">
                    Late by {lateDuration} minutes
                  </p>
                )}
              </div>
              
              <div className="bg-slate-700/20 rounded-2xl p-4 mb-6">
                <div className="flex items-start">
                  <i className="fas fa-info-circle text-white/80 mt-1 mr-3"></i>
                  <div>
                    <p className="font-medium mb-1">
                      {type === 'In' ? 'You are late for work' : 'You are leaving early'}
                    </p>
                    <p className="text-sm text-white/80">
                      Work hours: {workTime}
                    </p>
                    <p className="text-sm text-white/80">
                      Actual time: {currentTime}
                    </p>
                    {isLate && lateDuration > 0 && (
                      <p className="text-sm text-yellow-300 mt-1">
                        Late duration: {lateDuration} minutes
                      </p>
                    )}
                    <p className="text-sm mt-2 text-white/80">
                      {type === 'Out' 
                        ? 'After permission is approved, clock out will be recorded automatically.'
                        : 'Please complete the permission form to continue attendance.'
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto">
                <button
                  onClick={onClose}
                  className="w-full py-3 px-4 bg-slate-700/20 text-white rounded-2xl font-medium hover:bg-slate-700/30 border-none focus:outline-none"
                  disabled={isSubmitting}
                >
                  <i className="fas fa-times mr-2"></i>
                  Cancel
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Panel - Form Section */}
          <div className="w-2/3 p-8 bg-slate-800">
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              {/* Reason Input */}
              <div className="mb-6">
                <label className="block text-slate-200 font-medium mb-2">
                  Permission Reason <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={`Explain your reason for ${type === 'In' ? 'being late' : 'leaving early'}...`}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none placeholder-slate-400 text-slate-100"
                  rows="4"
                  required
                />
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-slate-200 font-medium mb-2">
                  Upload Supporting Evidence <span className="text-red-400">*</span>
                </label>
                <div className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all ${
                  file 
                    ? 'border-emerald-400 bg-emerald-900/20' 
                    : 'border-slate-600 bg-slate-700/50 hover:border-indigo-500'
                }`}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    className="hidden"
                    id="file-upload"
                    required
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center">
                      <i className={`fas fa-cloud-upload-alt text-2xl mb-2 ${
                        file ? 'text-emerald-400' : 'text-slate-400'
                      }`}></i>
                      <p className={`font-medium ${
                        file ? 'text-emerald-400' : 'text-slate-300'
                      }`}>
                        {file ? file.name : 'Click to upload file'}
                      </p>
                      <p className="text-slate-500 text-sm mt-1">
                        JPG, PNG, PDF, DOC (Max. 5MB)
                      </p>
                    </div>
                  </label>
                </div>
                {file && (
                  <div className="flex items-center justify-between mt-2 p-2 bg-emerald-900/20 rounded-xl">
                    <div className="flex items-center">
                      <i className="fas fa-check-circle text-emerald-400 mr-2"></i>
                      <span className="text-emerald-400 text-sm">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                )}
              </div>
              {/* Submit Button */}
              <div className="mt-auto">
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-3 px-4 rounded-2xl font-medium transition-all flex items-center justify-center border-none focus:outline-none ${
                    isFormValid && !isSubmitting
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Submit Permission
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;