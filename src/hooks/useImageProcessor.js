import { useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useImageProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [error, setError] = useState(null);

  const processImage = useCallback(async (files) => {
    const fileList = Array.isArray(files) ? files : [files];
    if (fileList.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setProcessedImage(null);

    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('image_files', file);
    });

    try {
      const response = await axios.post('/api/image/remove-bg', formData, {
        // If single file, we expect arraybuffer, if multiple, JSON
        responseType: fileList.length === 1 ? 'arraybuffer' : 'json',
      });

      if (fileList.length === 1) {
        // Handle single binary response
        const localUrl = URL.createObjectURL(fileList[0]);
        setOriginalImage(localUrl);

        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        const processedUrl = `data:image/png;base64,${base64}`;
        setProcessedImage(processedUrl);
        saveToHistory(localUrl, processedUrl);
        toast.success('Background removed!');
      } else {
        // Handle multiple files JSON response
        const results = response.data.files;
        results.forEach(res => {
          // We don't have original local URLs for all easily in this simplified preview,
          // but we can save them to history
          saveToHistory(res.data, res.data); // Use processed for both if original not available
        });
        setProcessedImage(results[0].data); // Preview the first one
        toast.success(`${results.length} images processed!`);
      }
    } catch (err) {
      console.error(err);
      let errorMessage = 'Failed to process image. Please try again.';
      
      if (err.response) {
        if (err.response.status === 429) {
          errorMessage = 'Daily free limit reached. Please upgrade to Pro.';
        } else if (err.response.data) {
          // Attempt to parse arraybuffer error response to string
          try {
            const decodedError = new TextDecoder().decode(err.response.data);
            const errorJson = JSON.parse(decodedError);
            if (errorJson.error) errorMessage = errorJson.error;
          } catch (e) {
            // ignore JSON parse error
          }
        }
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const saveToHistory = (original, processed) => {
    try {
      const historyStr = localStorage.getItem('bgremover_history') || '[]';
      let history = JSON.parse(historyStr);
      
      history.unshift({
        id: Date.now(),
        original,
        processed,
        date: new Date().toISOString()
      });
      
      // Keep only last 5
      if (history.length > 5) {
        history = history.slice(0, 5);
      }
      
      localStorage.setItem('bgremover_history', JSON.stringify(history));
      window.dispatchEvent(new Event('history_updated'));
    } catch (e) {
      console.error('Failed to save history', e);
    }
  };

  const reset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
  };

  return {
    isProcessing,
    originalImage,
    processedImage,
    error,
    processImage,
    reset
  };
};
