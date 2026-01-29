FROM node:20-alpine

# اضبط المنطقة الزمنية للقاهرة
ENV TZ=Africa/Cairo

# ضع مجلد العمل
WORKDIR /app

# انسخ ملفات المشروع
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY src ./src

# ثبت المكتبات
RUN npm ci --only=production

# ثبت serve لخدمة الملفات
RUN npm install -g serve

# بناء الكود
RUN npm run build

# افضح المنفذ
EXPOSE 3000

# شغل التطبيق
CMD ["serve", "-s", "dist", "-l", "3000"]
