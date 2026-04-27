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

    // Set preview immediately
    const localUrl = URL.createObjectURL(fileList[0]);
    setOriginalImage(localUrl);

    setIsProcessing(true);
    setError(null);
    setProcessedImage(null);

    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('image_files', file);
    });

    try {
      const response = await axios.post('/api/image/remove-bg', formData, {
        responseType: 'blob',
      });

      // Handle JSON response (Batch or Error)
      if (response.data.type === 'application/json') {
        const text = await response.data.text();
        const result = JSON.parse(text);

        if (!result.success) {
          throw new Error(result.error || 'Processing failed');
        }

        // Multiple files
        const results = result.files;
        results.forEach(res => {
          saveToHistory(res.data, res.data);
        });
        setProcessedImage(results[0].data);
        toast.success(`${results.length} images processed!`);
      } else {
        // Handle Image Blob (Single result)
        const processedUrl = URL.createObjectURL(response.data);
        setProcessedImage(processedUrl);

        // Save to history (convert to base64 for persistence)
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = () => {
          saveToHistory(localUrl, reader.result);
        };

        toast.success('Background removed!');
      }
    } catch (err) {
      console.error('Image Processing Error:', err);
      let errorMessage = 'Failed to process image. Please try again.';

      // Extract error from Blob if necessary
      if (err.response && err.response.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const errorJson = JSON.parse(text);
          if (errorJson.error) errorMessage = errorJson.error;
        } catch (e) { /* use default */ }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);
      // If failed, we might want to reset the original image preview
      // setOriginalImage(null); 
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
