# Gastro — frontend по макету Figma

Адаптивная верстка лендинга гастрономического кластера на **React + TypeScript + Vite**.

## Что реализовано

- адаптивный desktop / tablet / mobile layout;
- семантическая структура страницы и якорная навигация;
- responsive header + мобильное меню;
- hero-блок с оригинальными графическими материалами из макета;
- декоративные цветовые ленты;
- секции «О проекте», «Резидентам», «Помещения», «Контакты»;
- UI-состояния hover/focus и базовая accessibility-разметка;
- форма заявки (frontend-only, без отправки на backend);
- CSS design tokens для цветов, размеров, радиусов и контейнера;
- компоненты и ассеты разнесены по структуре проекта;
- поддержка `prefers-reduced-motion`.

## Стек

- React 19+
- TypeScript
- Vite
- CSS without UI-frameworks
- ESLint

## Структура

```text
gastro-landing/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── eslint.config.js
├── README.md
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── styles.css
    ├── components/
    │   └── Icons.tsx
    └── assets/
        ├── hero-food.png
        ├── food-cluster.png
        ├── footer-food.png
        ├── fund-logo.png
        └── fund-logo-wide.png
```

## Как запустить локально

Требования: **Node.js 20+** и npm 10+.

```bash
npm install
npm run dev
```

После запуска Vite покажет адрес локального dev-сервера:

```text
http://localhost:5173
```
