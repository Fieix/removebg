#!/bin/bash

echo "🚀 Запуск приложения для удаления фона изображений"
echo "=================================================="

# Проверяем наличие Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 не найден. Пожалуйста, установите Python 3.8+"
    exit 1
fi

# Загружаем NVM и проверяем Node.js
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Проверяем наличие Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не найден. Пожалуйста, установите Node.js 16+"
    echo "💡 Попробуйте: nvm install 18"
    exit 1
fi

# Проверяем наличие npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm не найден. Пожалуйста, установите npm"
    exit 1
fi

echo "✅ Все необходимые зависимости найдены"
echo ""

# Настройка Backend
echo "🔧 Настройка Backend..."
cd backend

# Создаем виртуальное окружение если его нет
if [ ! -d "venv" ]; then
    echo "Создание виртуального окружения Python..."
    python3 -m venv venv
fi

# Активируем виртуальное окружение
source venv/bin/activate

# Устанавливаем зависимости
echo "Установка Python зависимостей..."
pip install -r requirements.txt

echo "✅ Backend настроен"
echo ""

# Настройка Frontend
echo "🔧 Настройка Frontend..."
cd ../frontend

# Устанавливаем зависимости
echo "Установка Node.js зависимостей..."
npm install

echo "✅ Frontend настроен"
echo ""

# Запуск приложения
echo "🚀 Запуск приложения..."
echo ""

echo "📋 Инструкции:"
echo "1. Backend будет доступен на http://localhost:8000"
echo "2. Frontend будет доступен на http://localhost:3000"
echo "3. Откройте http://localhost:3000 в браузере"
echo ""

echo "⏳ Запуск Backend в фоновом режиме..."
cd ../backend
source venv/bin/activate
python main.py &
BACKEND_PID=$!

echo "⏳ Запуск Frontend..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "🎉 Приложение запущено!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Для остановки приложения нажмите Ctrl+C"

# Функция для очистки при завершении
cleanup() {
    echo ""
    echo "🛑 Остановка приложения..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Приложение остановлено"
    exit 0
}

# Перехватываем сигнал завершения
trap cleanup SIGINT SIGTERM

# Ждем завершения
wait 