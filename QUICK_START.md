# Быстрый старт: Получить .ipa через GitHub Actions

## Минимальные шаги (5 минут)

### 1. Создайте репозиторий на GitHub
- Перейдите на https://github.com/new
- Назовите репозиторий (например: `durak-card-tracker`)
- **НЕ** добавляйте README/gitignore/license
- Нажмите "Create repository"

### 2. Загрузите код

Выполните в терминале (замените `ВАШ_USERNAME` на ваш GitHub username):

```bash
git remote add origin https://github.com/ВАШ_USERNAME/durak-card-tracker.git
git branch -M main
git push -u origin main
```

### 3. Настройте секреты

В репозитории GitHub: **Settings → Secrets and variables → Actions → New repository secret**

Добавьте 4 секрета:

| Секрет | Что это |
|--------|---------|
| `IOS_CERTIFICATE_BASE64` | Сертификат .p12 в base64 (см. ниже) |
| `IOS_CERTIFICATE_PASSWORD` | Пароль от .p12 |
| `IOS_PROVISIONING_PROFILE_BASE64` | Provisioning profile в base64 (см. ниже) |
| `IOS_TEAM_ID` | Team ID из Apple Developer (10 символов) |

**Как получить сертификат и профиль:**
- Нужен macOS и Apple Developer аккаунт
- См. подробные инструкции в `GITHUB_SETUP.md`

### 4. Запустите сборку

1. Перейдите в **Actions** в репозитории
2. Выберите **iOS Build**
3. Нажмите **Run workflow** (справа)
4. Выберите тип: **development** или **ad-hoc**
5. Нажмите зеленую кнопку **Run workflow**

### 5. Скачайте .ipa

1. Дождитесь завершения (10-15 минут)
2. Откройте выполненный workflow
3. Прокрутите вниз до **Artifacts**
4. Скачайте **ios-app**
5. Распакуйте - внутри будет `.ipa` файл

## ⚠️ Важно

Для работы нужен:
- **Apple Developer аккаунт** ($99/год) ИЛИ
- **Бесплатный Apple ID** (с ограничениями)

Без этого секреты получить нельзя, и сборка не запустится.

## Альтернатива

Если нет Apple Developer:
- Используйте веб-версию из `dist/`
- Задеплойте на Vercel/Netlify
- Работает в браузере на любом устройстве

