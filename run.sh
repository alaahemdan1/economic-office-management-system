#!/bin/bash

# ===========================================
# نظام إدارة المكتب الاقتصادي - سكريبت النشر
# ===========================================

echo ""
echo "=========================================="
echo "نظام إدارة المكتب الاقتصادي"
echo "=========================================="
echo ""

# تحقق من npm
if ! command -v npm &> /dev/null; then
    echo "❌ خطأ: npm غير مثبت"
    echo "📥 برجاء تثبيت Node.js من https://nodejs.org"
    exit 1
fi

echo "✅ npm موجود"

# اختر الخيار
echo ""
echo "اختر ما تريد:"
echo "1) تشغيل التطوير (Development)"
echo "2) بناء للإنتاج (Build)"
echo "3) معاينة الإنتاج (Preview)"
echo "4) تثبيت المكتبات (Install)"
echo ""

read -p "اختر (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 تشغيل الخادم..."
        npm run dev
        ;;
    2)
        echo ""
        echo "🔨 بناء المشروع..."
        npm run build
        echo ""
        echo "✅ تم البناء بنجاح!"
        echo "📁 المجلد: dist"
        echo ""
        ;;
    3)
        echo ""
        echo "👁️  معاينة البناء..."
        npm run preview
        ;;
    4)
        echo ""
        echo "📥 تثبيت المكتبات..."
        npm install
        echo ""
        echo "✅ تم التثبيت بنجاح!"
        echo ""
        ;;
    *)
        echo "❌ اختيار غير صحيح"
        ;;
esac
