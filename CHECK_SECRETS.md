# Проверка секретов для сборки .ipa

## Требуемые секреты в GitHub

Для успешной сборки .ipa файла через GitHub Actions необходимо настроить следующие секреты:

**Settings → Secrets and variables → Actions**

1. ✅ `IOS_CERTIFICATE_BASE64` - сертификат .p12 в base64
2. ✅ `IOS_CERTIFICATE_PASSWORD` - пароль от .p12
3. ✅ `IOS_PROVISIONING_PROFILE_BASE64` - provisioning profile в base64  
4. ✅ `IOS_TEAM_ID` - Team ID из Apple Developer

## Как проверить наличие секретов

1. Перейдите в ваш репозиторий: https://github.com/samyunwanarmenia-hub/durak-card-tracker
2. Settings → Secrets and variables → Actions
3. Проверьте, что все 4 секрета присутствуют

## Если секреты отсутствуют

См. инструкции в `GITHUB_SETUP.md` для получения и настройки секретов.

## Запуск сборки

После настройки секретов:

1. Перейдите в **Actions**
2. Выберите **iOS Build**
3. Нажмите **Run workflow**
4. Выберите тип: `development` или `ad-hoc`
5. Нажмите зеленую кнопку

## Важно

Без настроенных секретов сборка **НЕ ЗАПУСТИТСЯ** или **ЗАВЕРШИТСЯ ОШИБКОЙ**.


