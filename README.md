# 🎨 Background Removal App

<div align="center">

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.0-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-38B2AC.svg)

**Веб-приложение для автоматического удаления фона с изображений с использованием AI**

[🚀 Демо](#демо) • [📋 Возможности](#возможности) • [🛠 Технологии](#технологии) • [⚡ Быстрый старт](#быстрый-старт) • [📖 Документация](#документация)

</div>

---

## 📸 Демо

<div align="center">
  <img src="https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Background+Removal+Demo" alt="Демо приложения" width="800"/>
  <p><em>Скриншот интерфейса приложения</em></p>
</div>

## ✨ Возможности

- 🖼️ **Загрузка изображений** - поддержка JPG и PNG форматов
- 🤖 **AI-удаление фона** - автоматическое удаление фона с помощью модели rembg
- 👀 **Предварительный просмотр** - сравнение исходного и обработанного изображения
- 💾 **Скачивание результата** - PNG с прозрачным фоном
- 🎨 **Современный интерфейс** - отзывчивый дизайн с TailwindCSS
- 🔒 **Локальная обработка** - данные не отправляются на внешние серверы
- ⚡ **Быстрая обработка** - оптимизированная AI-модель
- 📱 **Адаптивный дизайн** - работает на всех устройствах

## 🛠 Технологии

### Backend
- **FastAPI** - современный веб-фреймворк для Python
- **rembg** - библиотека для удаления фона с изображений
- **Pillow** - обработка изображений
- **uvicorn** - ASGI сервер

### Frontend
- **React 18** - JavaScript библиотека для создания UI
- **TypeScript** - типизированный JavaScript
- **TailwindCSS** - utility-first CSS фреймворк
- **React Hooks** - управление состоянием

## ⚡ Быстрый старт

### Предварительные требования

- **Python 3.8+**
- **Node.js 16+**
- **npm** или **yarn**

### 🚀 Автоматический запуск

```bash
# Клонируйте репозиторий
git clone https://github.com/your-username/background-removal-app.git
cd background-removal-app

# Запустите приложение
chmod +x start.sh
./start.sh
```

Скрипт автоматически:
- ✅ Проверит зависимости
- 🔧 Настроит виртуальное окружение Python
- 📦 Установит все пакеты
- 🚀 Запустит backend и frontend

### 🔧 Ручная установка

#### 1. Backend Setup

```bash
cd backend

# Создайте виртуальное окружение
python -m venv venv

# Активируйте окружение
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate   # Windows

# Установите зависимости
pip install -r requirements.txt

# Запустите сервер
python main.py
```

#### 2. Frontend Setup

```bash
cd frontend

# Установите зависимости
npm install

# Запустите приложение
npm start
```

### 🌐 Доступ к приложению

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 📖 Документация

### API Endpoints

#### `POST /remove-background`
Удаляет фон с загруженного изображения

**Параметры:**
- `file`: Изображение (JPG/PNG)

**Ответ:**
```json
{
  "success": true,
  "file_id": "uuid-string",
  "message": "Фон успешно удален"
}
```

#### `GET /download/{file_id}`
Скачивает обработанное изображение

#### `GET /health`
Проверка статуса API

```json
{
  "status": "healthy",
  "message": "API работает нормально"
}
```

### Структура проекта

```
├── backend/                 # FastAPI backend
│   ├── main.py             # Основной файл API
│   ├── requirements.txt    # Python зависимости
│   ├── uploads/           # Временные файлы загрузок
│   └── processed/         # Обработанные изображения
├── frontend/              # React frontend
│   ├── src/
│   │   ├── App.tsx        # Основной компонент
│   │   ├── index.tsx      # Точка входа
│   │   └── index.css      # Стили с TailwindCSS
│   ├── public/
│   │   └── index.html     # HTML шаблон
│   ├── package.json       # Node.js зависимости
│   ├── tailwind.config.js # Конфигурация TailwindCSS
│   ├── postcss.config.js  # Конфигурация PostCSS
│   └── tsconfig.json      # Конфигурация TypeScript
├── README.md              # Этот файл
├── QUICK_START.md         # Краткая инструкция
├── start.sh               # Скрипт автоматического запуска
└── .gitignore            # Исключения для Git
```

## 🎯 Использование

1. **Откройте браузер** и перейдите на http://localhost:3000
2. **Загрузите изображение** - нажмите на область загрузки или перетащите файл
3. **Выберите файл** - поддерживаются JPG и PNG форматы
4. **Нажмите "Удалить фон"** - начнется обработка
5. **Дождитесь завершения** - процесс занимает несколько секунд
6. **Просмотрите результат** - сравните исходное и обработанное изображение
7. **Скачайте результат** - PNG файл с прозрачным фоном

## 🔧 Конфигурация

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# Backend
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000

# Frontend
REACT_APP_API_URL=http://localhost:8000
```

### Настройка CORS

Для продакшена измените настройки CORS в `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🐛 Устранение неполадок

### Backend не запускается
```bash
# Проверьте Python версию
python --version

# Пересоздайте виртуальное окружение
rm -rf backend/venv
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend не запускается
```bash
# Очистите кэш npm
npm cache clean --force

# Удалите node_modules и переустановите
rm -rf node_modules package-lock.json
npm install
```

### Ошибки CORS
- Убедитесь, что backend запущен на порту 8000
- Проверьте настройки CORS в `backend/main.py`

### Проблемы с обработкой изображений
- Убедитесь, что изображение в формате JPG или PNG
- Проверьте размер файла (рекомендуется до 10MB)
- Убедитесь, что у процесса есть права на запись

## 🤝 Вклад в проект

1. **Fork** репозитория
2. Создайте **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** изменения (`git commit -m 'Add amazing feature'`)
4. **Push** в branch (`git push origin feature/amazing-feature`)
5. Откройте **Pull Request**

## 📝 Лицензия

Этот проект распространяется под лицензией MIT. См. файл `LICENSE` для получения дополнительной информации.

## 🙏 Благодарности

- [rembg](https://github.com/danielgatis/rembg) - библиотека для удаления фона
- [FastAPI](https://fastapi.tiangolo.com/) - современный веб-фреймворк
- [React](https://reactjs.org/) - библиотека для создания UI
- [TailwindCSS](https://tailwindcss.com/) - CSS фреймворк

## 📞 Поддержка

Если у вас есть вопросы или проблемы:

- 📧 Создайте [Issue](https://github.com/your-username/background-removal-app/issues)
- 💬 Обсудите в [Discussions](https://github.com/your-username/background-removal-app/discussions)
- 📖 Изучите [документацию](https://github.com/your-username/background-removal-app/wiki)

---

<div align="center">

⭐ **Если проект вам понравился, поставьте звездочку!** ⭐

</div> 