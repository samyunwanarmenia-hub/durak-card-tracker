#!/bin/bash
# Скрипт для быстрой настройки GitHub репозитория

echo "=== Настройка GitHub репозитория для сборки .ipa ==="
echo ""

# Проверка наличия git remote
if git remote | grep -q origin; then
    echo "✓ Git remote 'origin' уже настроен"
    git remote -v
else
    echo "Введите URL вашего GitHub репозитория:"
    read -r REPO_URL
    git remote add origin "$REPO_URL"
    echo "✓ Git remote добавлен"
fi

echo ""
echo "Загружаю код в GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "=== Следующие шаги ==="
echo "1. Перейдите в Settings → Secrets and variables → Actions"
echo "2. Добавьте секреты (см. GITHUB_SETUP.md):"
echo "   - IOS_CERTIFICATE_BASE64"
echo "   - IOS_CERTIFICATE_PASSWORD"
echo "   - IOS_PROVISIONING_PROFILE_BASE64"
echo "   - IOS_TEAM_ID"
echo "3. Перейдите в Actions → iOS Build → Run workflow"
echo ""
echo "Подробные инструкции в GITHUB_SETUP.md"

