import React, { useState, useRef } from 'react';

interface UploadResponse {
  success: boolean;
  file_id: string;
  message: string;
}

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_BASE_URL = 'http://localhost:8000';

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Проверяем тип файла
      if (!file.type.startsWith('image/')) {
        setError('Пожалуйста, выберите изображение');
        return;
      }

      // Проверяем расширение файла
      const allowedExtensions = ['.jpg', '.jpeg', '.png'];
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      if (!allowedExtensions.includes(fileExtension)) {
        setError('Поддерживаются только JPG и PNG файлы');
        return;
      }

      setSelectedFile(file);
      setError(null);
      setProcessedUrl(null);
      setFileId(null);

      // Создаем превью
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Пожалуйста, выберите файл');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      console.log('Отправка файла на сервер...');
      const response = await fetch(`${API_BASE_URL}/remove-background`, {
        method: 'POST',
        body: formData,
      });

      console.log('Получен ответ от сервера:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Ошибка при обработке изображения');
      }

      const data: UploadResponse = await response.json();
      console.log('Данные ответа:', data);
      
      if (data.success) {
        setFileId(data.file_id);
        // Создаем URL для отображения обработанного изображения
        const processedImageUrl = `${API_BASE_URL}/download/${data.file_id}`;
        setProcessedUrl(processedImageUrl);
        console.log('Обработка завершена успешно');
      } else {
        throw new Error(data.message || 'Неизвестная ошибка');
      }
    } catch (err) {
      console.error('Ошибка при загрузке:', err);
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (processedUrl) {
      const link = document.createElement('a');
      link.href = processedUrl;
      link.download = `removed_background_${fileId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setProcessedUrl(null);
    setError(null);
    setFileId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Удаление фона изображений
          </h1>
          <p className="text-gray-600 text-lg">
            Загрузите изображение и автоматически удалите фон
          </p>
        </div>

        {/* Основной контент */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Загрузка файла */}
          <div className="mb-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <span className="text-lg font-medium text-gray-700 mb-2">
                  {selectedFile ? selectedFile.name : 'Выберите изображение'}
                </span>
                <span className="text-sm text-gray-500">
                  Поддерживаются JPG и PNG файлы
                </span>
              </label>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Обработка...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Удалить фон
                </>
              )}
            </button>
            
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Сбросить
            </button>
          </div>

          {/* Сообщения об ошибках */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Результаты */}
          {(previewUrl || processedUrl) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Исходное изображение */}
              {previewUrl && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Исходное изображение</h3>
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Исходное изображение"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                </div>
              )}

              {/* Обработанное изображение */}
              {processedUrl && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Результат</h3>
                  <div className="relative">
                    <img
                      src={processedUrl}
                      alt="Обработанное изображение"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <button
                      onClick={handleDownload}
                      className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Скачать результат
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Информация */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            Обработка происходит локально с использованием AI-модели
          </p>
        </div>
      </div>
    </div>
  );
}

export default App; 