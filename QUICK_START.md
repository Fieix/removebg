# Быстрый запуск

## Автоматический запуск (рекомендуется)

```bash
# Сделайте скрипт исполняемым (если еще не сделано)
chmod +x start.sh

# Запустите приложение
./start.sh
```

Скрипт автоматически:
- Проверит наличие необходимых зависимостей
- Настроит виртуальное окружение Python
- Установит все зависимости
- Запустит backend и frontend

## Ручной запуск

### 1. Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # На Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### 2. Frontend (в новом терминале)
```bash
cd frontend
npm install
npm start
```

## Доступ к приложению

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Использование

1. Откройте http://localhost:3000 в браузере
2. Загрузите JPG или PNG изображение
3. Нажмите "Удалить фон"
4. Скачайте результат 