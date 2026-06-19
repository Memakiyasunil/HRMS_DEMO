import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Path Alias (@) for Absolute Import
  // Enables imports like: import MyComp from '@/components/MyComp'
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
    }
  },

  // Server Configuration
  server: {
    host: '0.0.0.0', 
    allowedHosts: [
      'localhost',
      '127.0.0.1', 
      '*.ngrok-free.app',
      'dev-tunnel.local' 
    ]
  },
  
  // Force Vite to process dependencies (optimizeDeps)
  // Includes all packages for documents (docx, xlsx, pdf) and file-saver.
  optimizeDeps: {
    include: [
      '@tensorflow/tfjs',
      '@tensorflow-models/face-landmarks-detection',
      '@mediapipe/face_mesh',
      'xlsx',
      'docx',
      'file-saver',
      'jspdf',
      'jspdf-autotable'
    ],
  },
  
  // Fix WASM MediaPipe bug (RuntimeError: abort)
  build: {
    // Ensure small files are not inlined as Base64
    assetsInlineLimit: 0, 
  },
  
  // Treat WASM, tflite, and bin files as assets
  assetsInclude: ['**/*.tflite', '**/*.bin', '**/*.wasm'], 
})
