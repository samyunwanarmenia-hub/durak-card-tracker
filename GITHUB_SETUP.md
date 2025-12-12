# Настройка GitHub Actions для сборки .ipa

## Пошаговая инструкция

### Шаг 1: Создайте репозиторий на GitHub

1. Перейдите на https://github.com/new
2. Создайте новый репозиторий (например, `durak-card-tracker`)
3. **НЕ** добавляйте README, .gitignore или лицензию (у нас уже есть)
4. Скопируйте URL репозитория (например: `https://github.com/ВАШ_USERNAME/durak-card-tracker.git`)

### Шаг 2: Загрузите код в GitHub

Выполните в терминале (замените URL на ваш):

```bash
git remote add origin https://github.com/ВАШ_USERNAME/durak-card-tracker.git
git branch -M main
git push -u origin main
```

### Шаг 3: Настройте секреты в GitHub

Перейдите в ваш репозиторий на GitHub:
**Settings → Secrets and variables → Actions → New repository secret**

#### Секрет 1: IOS_CERTIFICATE_BASE64

1. На macOS откройте **Keychain Access**
2. Найдите ваш сертификат разработчика (тип: "Apple Development" или "iOS Distribution")
3. Правый клик → **Export** → сохраните как `.p12` файл
4. Укажите пароль при экспорте (запомните его!)
5. Закодируйте в base64:
   ```bash
   base64 -i certificate.p12 | pbcopy
   ```
6. Вставьте весь вывод в секрет `IOS_CERTIFICATE_BASE64`

#### Секрет 2: IOS_CERTIFICATE_PASSWORD

Пароль, который вы указали при экспорте `.p12` файла.

#### Секрет 3: IOS_PROVISIONING_PROFILE_BASE64

1. Войдите в [Apple Developer Portal](https://developer.apple.com/account/)
2. **Certificates, Identifiers & Profiles** → **Profiles**
3. Создайте новый профиль:
   - **Development** - для разработки
   - **Ad Hoc** - для распространения без App Store
4. Выберите App ID, сертификат, устройства
5. Скачайте `.mobileprovision` файл
6. Закодируйте в base64:
   ```bash
   base64 -i profile.mobileprovision | pbcopy
   ```
7. Вставьте в секрет `IOS_PROVISIONING_PROFILE_BASE64`

#### Секрет 4: IOS_TEAM_ID

1. В [Apple Developer Portal](https://developer.apple.com/account/)
2. В правом верхнем углу нажмите на ваше имя/компанию
3. Скопируйте **Team ID** (10 символов, например: `ABC123DEF4`)
4. Добавьте как секрет `IOS_TEAM_ID`

### Шаг 4: Запустите сборку

1. Перейдите в **Actions** в вашем репозитории
2. Выберите workflow **iOS Build**
3. Нажмите **Run workflow** (справа)
4. Выберите тип сборки:
   - **development** - для разработки и тестирования
   - **ad-hoc** - для распространения без App Store
5. Нажмите зеленую кнопку **Run workflow**
6. Дождитесь завершения (обычно 10-15 минут)

### Шаг 5: Скачайте .ipa файл

1. После завершения workflow откройте выполненный run
2. Прокрутите вниз до секции **Artifacts**
3. Нажмите **ios-app** для скачивания
4. Распакуйте архив - внутри будет `.ipa` файл

## Важные замечания

⚠️ **Для первого запуска нужны:**
- Аккаунт Apple Developer (платный, $99/год)
- Сертификат разработчика
- Provisioning Profile
- Team ID

⚠️ **Если нет Apple Developer аккаунта:**
- Можно использовать бесплатный Apple ID для разработки
- Но функционал будет ограничен
- См. инструкции Apple для бесплатной разработки

## Альтернатива: Использовать готовый веб-версию

Если нет Apple Developer аккаунта, можно использовать веб-версию:
- Файлы в `dist/` готовы для деплоя
- Задеплойте на Vercel/Netlify/GitHub Pages
- Приложение будет работать в браузере на любом устройстве

## Помощь

Если возникли проблемы:
1. Проверьте логи в GitHub Actions
2. Убедитесь, что все секреты добавлены правильно
3. Проверьте, что сертификат и профиль действительны

