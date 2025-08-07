# 🚀 Руководство по развертыванию

Этот документ содержит инструкции по развертыванию Background Removal App в различных средах.

## 🏠 Локальное развертывание

### Требования

- Python 3.8+
- Node.js 16+
- npm или yarn

### Быстрый запуск

```bash
# Клонируйте репозиторий
git clone https://github.com/your-username/background-removal-app.git
cd background-removal-app

# Запустите приложение
chmod +x start.sh
./start.sh
```

### Ручная установка

#### Backend

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

#### Frontend

```bash
cd frontend

# Установите зависимости
npm install

# Запустите приложение
npm start
```

## ☁️ Развертывание в облаке

### Heroku

#### Backend

1. Создайте `Procfile` в корне backend:
```
web: uvicorn main:app --host=0.0.0.0 --port=$PORT
```

2. Создайте `runtime.txt`:
```
python-3.9.16
```

3. Разверните:
```bash
heroku create your-app-name
git push heroku main
```

#### Frontend

1. Создайте `package.json` в корне frontend:
```json
{
  "scripts": {
    "build": "react-scripts build",
    "start": "serve -s build"
  },
  "dependencies": {
    "serve": "^14.0.0"
  }
}
```

2. Разверните:
```bash
npm run build
git add build
git commit -m "Add build files"
git push heroku main
```

### Docker

#### Dockerfile для Backend

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Dockerfile для Frontend

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend/uploads:/app/uploads
      - ./backend/processed:/app/processed

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
```

### AWS

#### EC2 с Docker

1. Запустите EC2 инстанс
2. Установите Docker:
```bash
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user
```

3. Клонируйте репозиторий и запустите:
```bash
git clone https://github.com/your-username/background-removal-app.git
cd background-removal-app
docker-compose up -d
```

#### AWS Lambda + API Gateway

1. Создайте Lambda функцию для backend
2. Настройте API Gateway
3. Разверните frontend на S3 + CloudFront

### Google Cloud Platform

#### App Engine

1. Создайте `app.yaml` для backend:
```yaml
runtime: python39
entrypoint: uvicorn main:app --host=0.0.0.0 --port=$PORT

env_variables:
  PYTHONPATH: /app
```

2. Разверните:
```bash
gcloud app deploy
```

#### Cloud Run

1. Создайте Dockerfile
2. Разверните:
```bash
gcloud run deploy --source .
```

## 🔧 Конфигурация

### Переменные окружения

Создайте `.env` файл:

```env
# Backend
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
DEBUG=false

# Frontend
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENVIRONMENT=production
```

### CORS настройки

Для продакшена обновите CORS в `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Nginx конфигурация

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://backend:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🔒 Безопасность

### SSL/TLS

1. Получите SSL сертификат (Let's Encrypt)
2. Настройте HTTPS редирект
3. Обновите CORS настройки

### Аутентификация

Для продакшена добавьте аутентификацию:

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer

security = HTTPBearer()

async def verify_token(token: str = Depends(security)):
    # Проверка токена
    pass
```

## 📊 Мониторинг

### Логирование

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
```

### Метрики

Добавьте Prometheus метрики:

```python
from prometheus_fastapi_instrumentator import Instrumentator

Instrumentator().instrument(app).expose(app)
```

## 🚀 CI/CD

### GitHub Actions

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: |
          # Ваши команды развертывания
```

## 📋 Checklist развертывания

- [ ] Все зависимости установлены
- [ ] Переменные окружения настроены
- [ ] CORS настройки обновлены
- [ ] SSL сертификат установлен
- [ ] Мониторинг настроен
- [ ] Логирование настроено
- [ ] Тесты пройдены
- [ ] Документация обновлена

## 🆘 Устранение неполадок

### Проблемы с памятью

```bash
# Увеличьте swap память
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Проблемы с портами

```bash
# Проверьте занятые порты
sudo netstat -tulpn | grep :8000
sudo netstat -tulpn | grep :3000
```

### Проблемы с правами доступа

```bash
# Установите правильные права
sudo chown -R $USER:$USER /app
chmod +x start.sh
``` 