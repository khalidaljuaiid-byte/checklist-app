# نشر الموقع (Deployment Guide)

لقد تم تجهيز الملفات واختبارها بنجاح مع البيانات الحية!
بما أنني لا أملك صلاحية الوصول المباشر لحساب GitHub الخاص بك، يرجى اتباع الخطوات التالية لنشر الموقع:

## 1. إنشاء مستودع جديد (Create Repository)
1. اذهب إلى [GitHub.com](https://github.com) وسجل الدخول.
2. اضغط على علامة **+** في الزاوية العلوية واختر **New repository**.
3. سمّهِ مثلاً: `checklist-app`
4. اترك باقي الإعدادات كما هي واضغط **Create repository**.

## 2. رفع الملفات (Push Code)
انسخ الأوامر التالية ونفذها في هذا المجلد (Terminal):

```bash
git remote add origin https://github.com/YOUR_USERNAME/checklist-app.git
git branch -M main
git push -u origin main
```
*(استبدل `YOUR_USERNAME` باسم المستخدم الخاص بك)*

## 3. تفعيل الموقع (Activate Pages)
> **ملاحظة مهمة**: يجب أن يكون المستودع **عاماً (Public)** لتعمل خدمة GitHub Pages مجاناً.
> إذا ظهرت لك رسالة "Upgrade or make this repository public"، اذهب إلى **Settings** > **General**، انزل للأسفل إلى **Danger Zone**، واضغط **Change repository visibility** واجعله **Public**.

1. بعد رفع الملفات، اذهب إلى صفحة المستودع على GitHub.
2. ادخل على **Settings** > **Pages**.
3. تحت **Build and deployment** > **Branch**، اختر `main` واضغط **Save**.
4. انتظر دقيقة، وسيظهر لك رابط الموقع (مثلاً: `https://your-username.github.io/checklist-app`).

مبروك! موقعك يعمل الآن.
