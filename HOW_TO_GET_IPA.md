# Как получить .ipa файл

## Проблема
.ipa файл **НЕВОЗМОЖНО** создать на Windows. Для этого требуется:
- macOS с установленным Xcode
- ИЛИ GitHub Actions с macOS runner

## Вариант 1: GitHub Actions (Рекомендуется)

### Шаг 1: Загрузите код в GitHub

```bash
# Создайте репозиторий на GitHub, затем:
git remote add origin https://github.com/ВАШ_USERNAME/durak-card-tracker.git
git branch -M main
git push -u origin main
```

### Шаг 2: Настройте секреты в GitHub

Перейдите в **Settings → Secrets and variables → Actions** и добавьте:

1. **IOS_CERTIFICATE_BASE64** - сертификат .p12 в base64
2. **IOS_CERTIFICATE_PASSWORD** - пароль от .p12
3. **IOS_PROVISIONING_PROFILE_BASE64** - provisioning profile в base64
4. **IOS_TEAM_ID** - ваш Team ID из Apple Developer

Подробные инструкции в README.md

### Шаг 3: Запустите сборку

1. Перейдите в **Actions** в вашем репозитории
2. Выберите workflow **iOS Build**
3. Нажмите **Run workflow**
4. Выберите тип сборки (development или ad-hoc)
5. Дождитесь завершения
6. Скачайте .ipa из артефактов

## Вариант 2: На macOS

Если у вас есть доступ к Mac:

```bash
# 1. Установите зависимости
npm install

# 2. Соберите веб-версию
npm run build

# 3. Добавьте iOS платформу
npx cap add ios

# 4. Синхронизируйте
npx cap sync ios

# 5. Откройте в Xcode
npx cap open ios

# 6. В Xcode:
#    - Выберите устройство или симулятор
#    - Product → Archive
#    - Distribute App → Development/Ad Hoc
#    - Экспортируйте .ipa
```

## Вариант 3: Использовать готовый веб-версию

Пока нет .ipa, можно использовать веб-версию:
- Файлы в `dist/` готовы для деплоя
- Можно задеплоить на любой хостинг (Vercel, Netlify, GitHub Pages)
- Приложение будет работать в браузере

## Текущее состояние

✅ Git репозиторий инициализирован
✅ Код закоммичен
✅ Production build создан (папка `dist/`)
✅ GitHub Actions workflow настроен
❌ .ipa файл - требует macOS или GitHub Actions с секретами

## Что дальше?

1. **Если есть доступ к macOS**: используйте Вариант 2
2. **Если есть GitHub аккаунт**: используйте Вариант 1
3. **Если нет ни того, ни другого**: используйте веб-версию из `dist/`


