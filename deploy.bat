@echo off
REM نشر تطبيق الاقتصاد على GitHub و Vercel

echo.
echo ========================================
echo نشر نظام إدارة المكتب الاقتصادي
echo ========================================
echo.

REM 1. إضافة جميع الملفات
echo [1/5] إضافة الملفات للـ Git...
git add .

REM 2. كتابة الـ commit
echo [2/5] كتابة رسالة الكود...
git commit -m "Update: نشر النسخة الأخيرة من النظام"

REM 3. التحقق من البيانات
echo [3/5] بناء النسخة الإنتاجية...
npm run build

if %errorlevel% neq 0 (
    echo [ERROR] فشل البناء! تأكد من عدم وجود أخطاء
    exit /b 1
)

REM 4. دفع للـ GitHub
echo [4/5] رفع الملفات على GitHub...
git push origin main

REM 5. نشر على Vercel
echo [5/5] نشر على Vercel...
vercel --prod

echo.
echo ========================================
echo ✅ تم النشر بنجاح!
echo ========================================
echo.
echo 🌐 الروابط:
echo GitHub: https://github.com/your-username/economic-office-management-system
echo Vercel: https://economic-office-management-system.vercel.app
echo.
pause
