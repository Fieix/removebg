# 🤝 Руководство по участию в проекте

Спасибо за интерес к проекту Background Removal App! Мы приветствуем любой вклад в развитие проекта.

## 📋 Как внести свой вклад

### 🐛 Сообщение об ошибках

1. Проверьте, не была ли ошибка уже зарегистрирована в [Issues](https://github.com/your-username/background-removal-app/issues)
2. Создайте новое issue с подробным описанием:
   - Описание проблемы
   - Шаги для воспроизведения
   - Ожидаемое поведение
   - Фактическое поведение
   - Скриншоты (если применимо)
   - Информация о системе (ОС, версии Python/Node.js)

### 💡 Предложение новых функций

1. Создайте issue с тегом `enhancement`
2. Опишите предлагаемую функцию
3. Объясните, почему эта функция полезна
4. Предложите возможную реализацию

### 🔧 Исправление ошибок и добавление функций

1. **Fork** репозитория
2. Создайте **feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Внесите изменения и **commit**:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push** в ваш fork:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Создайте **Pull Request**

## 🛠 Настройка среды разработки

### Требования

- Python 3.8+
- Node.js 16+
- Git

### Установка

```bash
# Клонируйте ваш fork
git clone https://github.com/your-username/background-removal-app.git
cd background-removal-app

# Добавьте upstream remote
git remote add upstream https://github.com/original-owner/background-removal-app.git

# Установите зависимости
./start.sh
```

### Структура кода

- **Backend**: Следуйте PEP 8 для Python кода
- **Frontend**: Используйте Prettier для форматирования
- **Коммиты**: Используйте [Conventional Commits](https://www.conventionalcommits.org/)

## 📝 Стандарты кода

### Python (Backend)

```python
# Используйте type hints
def remove_background(file: UploadFile) -> dict:
    """Удаляет фон с изображения."""
    pass

# Добавляйте docstrings
def process_image(image_data: bytes) -> bytes:
    """
    Обрабатывает изображение.
    
    Args:
        image_data: Байты изображения
        
    Returns:
        bytes: Обработанные байты изображения
    """
    pass
```

### TypeScript (Frontend)

```typescript
// Используйте типы
interface UploadResponse {
  success: boolean;
  file_id: string;
  message: string;
}

// Добавляйте JSDoc комментарии
/**
 * Обрабатывает загрузку файла
 * @param file - Файл для загрузки
 * @returns Promise с результатом
 */
const handleFileUpload = async (file: File): Promise<UploadResponse> => {
  // ...
};
```

## 🧪 Тестирование

### Backend тесты

```bash
cd backend
python -m pytest tests/
```

### Frontend тесты

```bash
cd frontend
npm test
```

## 📋 Checklist для Pull Request

- [ ] Код соответствует стандартам проекта
- [ ] Добавлены тесты для новых функций
- [ ] Обновлена документация
- [ ] Код прошел все проверки
- [ ] Добавлено описание изменений

## 🏷️ Типы коммитов

- `feat:` - новая функция
- `fix:` - исправление ошибки
- `docs:` - изменения в документации
- `style:` - форматирование кода
- `refactor:` - рефакторинг
- `test:` - добавление тестов
- `chore:` - обновление зависимостей

## 📞 Получение помощи

- 💬 [Discussions](https://github.com/your-username/background-removal-app/discussions)
- 📧 [Issues](https://github.com/your-username/background-removal-app/issues)
- 📖 [Документация](https://github.com/your-username/background-removal-app/wiki)

## 🙏 Благодарности

Спасибо всем, кто вносит свой вклад в проект! Ваша помощь делает проект лучше для всех. 