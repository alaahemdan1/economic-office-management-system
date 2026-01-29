@echo off
REM ===========================================
REM نظام إدارة المكتب الاقتصادي - سكريبت النشر
REM ===========================================

echo.
echo ==========================================
echo نظام إدارة المكتب الاقتصادي
echo ==========================================
echo.

REM تحقق من npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ خطأ: npm غير مثبت
    echo 📥 برجاء تثبيت Node.js من https://nodejs.org
    pause
    exit /b 1
)

echo ✅ npm موجود

REM اختر الخيار
echo.
echo اختر ما تريد:
echo 1) تشغيل التطوير (Development)
echo 2) بناء للإنتاج (Build)
echo 3) معاينة الإنتاج (Preview)
echo 4) تثبيت المكتبات (Install)
echo.

set /p choice="اختر (1-4): "

if "%choice%"=="1" (
    echo.
    echo 🚀 تشغيل الخادم...
    npm run dev
) else if "%choice%"=="2" (
    echo.
    echo 🔨 بناء المشروع...
    npm run build
    echo.
    echo ✅ تم البناء بنجاح!
    echo 📁 المجلد: dist
    echo.
) else if "%choice%"=="3" (
    echo.
    echo 👁️  معاينة البناء...
    npm run preview
) else if "%choice%"=="4" (
    echo.
    echo 📥 تثبيت المكتبات...
    npm install
    echo.
    echo ✅ تم التثبيت بنجاح!
    echo.
) else (
    echo ❌ اختيار غير صحيح
)

pause
