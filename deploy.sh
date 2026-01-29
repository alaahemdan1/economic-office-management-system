#!/bin/bash

echo ""
echo "========================================"
echo "نشر نظام إدارة المكتب الاقتصادي"
echo "========================================"
echo ""

# 1. إضافة جميع الملفات
echo "[1/5] إضافة الملفات للـ Git..."
git add .

# 2. كتابة الـ commit
echo "[2/5] كتابة رسالة الكود..."
git commit -m "Update: نشر النسخة الأخيرة من النظام"

# 3. التحقق من البيانات
echo "[3/5] بناء النسخة الإنتاجية..."
npm run build

if [ $? -ne 0 ]; then
    echo "[ERROR] فشل البناء! تأكد من عدم وجود أخطاء"
    exit 1
fi

# 4. دفع للـ GitHub
echo "[4/5] رفع الملفات على GitHub..."
git push origin main

# 5. نشر على Vercel
echo "[5/5] نشر على Vercel..."
vercel --prod

echo ""
echo "========================================"
echo "✅ تم النشر بنجاح!"
echo "========================================"
echo ""
echo "🌐 الروابط:"
echo "GitHub: https://github.com/your-username/economic-office-management-system"
echo "Vercel: https://economic-office-management-system.vercel.app"
echo ""
