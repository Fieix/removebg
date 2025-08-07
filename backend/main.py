from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import uuid
from rembg import remove
from PIL import Image
import io
import logging

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Background Removal API", version="1.0.0")

# Настройка CORS для работы с frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Создаем папку для временных файлов
UPLOAD_DIR = "uploads"
PROCESSED_DIR = "processed"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

@app.get("/")
async def root():
    return {"message": "Background Removal API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API работает нормально"}

@app.post("/remove-background")
async def remove_background(file: UploadFile = File(...)):
    """
    Удаляет фон с загруженного изображения
    """
    logger.info(f"Получен запрос на удаление фона для файла: {file.filename}")
    
    # Проверяем тип файла
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Файл должен быть изображением")
    
    # Проверяем расширение файла
    allowed_extensions = {'.jpg', '.jpeg', '.png'}
    file_extension = os.path.splitext(file.filename)[1].lower()
    if file_extension not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Поддерживаются только JPG и PNG файлы")
    
    input_path = None
    output_path = None
    
    try:
        # Читаем содержимое файла
        logger.info("Чтение файла...")
        contents = await file.read()
        
        # Создаем уникальное имя файла
        file_id = str(uuid.uuid4())
        input_path = os.path.join(UPLOAD_DIR, f"{file_id}_input{file_extension}")
        output_path = os.path.join(PROCESSED_DIR, f"{file_id}_output.png")
        
        # Сохраняем исходное изображение
        logger.info("Сохранение исходного изображения...")
        with open(input_path, "wb") as f:
            f.write(contents)
        
        # Удаляем фон с помощью rembg
        logger.info("Начало удаления фона...")
        with open(input_path, "rb") as input_file:
            input_data = input_file.read()
            
        # Обрабатываем изображение
        logger.info("Обработка изображения с помощью rembg...")
        output_data = remove(input_data)
        logger.info("Фон успешно удален")
        
        # Сохраняем результат
        logger.info("Сохранение результата...")
        with open(output_path, "wb") as output_file:
            output_file.write(output_data)
        
        # Удаляем исходный файл
        os.remove(input_path)
        logger.info(f"Обработка завершена. File ID: {file_id}")
        
        return {
            "success": True,
            "file_id": file_id,
            "message": "Фон успешно удален"
        }
        
    except Exception as e:
        logger.error(f"Ошибка при обработке изображения: {str(e)}")
        # Очищаем файлы в случае ошибки
        if input_path and os.path.exists(input_path):
            os.remove(input_path)
        if output_path and os.path.exists(output_path):
            os.remove(output_path)
        raise HTTPException(status_code=500, detail=f"Ошибка обработки изображения: {str(e)}")

@app.get("/download/{file_id}")
async def download_image(file_id: str):
    """
    Скачивает обработанное изображение
    """
    output_path = os.path.join(PROCESSED_DIR, f"{file_id}_output.png")
    
    if not os.path.exists(output_path):
        raise HTTPException(status_code=404, detail="Файл не найден")
    
    return FileResponse(
        path=output_path,
        filename=f"removed_background_{file_id}.png",
        media_type="image/png"
    )

@app.delete("/cleanup/{file_id}")
async def cleanup_file(file_id: str):
    """
    Удаляет обработанный файл
    """
    output_path = os.path.join(PROCESSED_DIR, f"{file_id}_output.png")
    
    if os.path.exists(output_path):
        os.remove(output_path)
        return {"message": "Файл удален"}
    
    return {"message": "Файл не найден"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 