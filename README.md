# Tax Calculator

The purpose of this project is help yoou with the calculus of your taxes, you only need you annual income and select the year wou want to calculate your taxes and this app will do all the hard work.

## Previuos requirements
- `node` v18 or higher
- `npm` v9 or higher

## Project Strucutre

```
project-root/
├── public/
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── AlertMessage.style.css
│   │   ├── AlertMessage.tsx
│   │   ├── Loading.style.css
│   │   ├── Loading.tsx
│   │   ├── TaxDetails.style.css
│   │   ├── TaxDetails.tsx
│   │   ├── TaxForm.style.css
│   │   ├── TaxForm.tsx
│   │   ├── TaxTable.style.css
│   │   └── TaxTable.tsx
│   ├── config/
│   │   └── tests.ts
│   ├── hooks/
│   │   ├── useLazyApi.ts
│   │   ├── useTaxCalculator.test.ts
│   │   └── useTaxCalculator.ts
│   ├── utils/
│   │   ├── consts.ts
│   │   ├── env.ts
│   │   ├── formats.ts
│   │   └── strings.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## First setps
- Create an `.env` file following the `env.example` file at the root of this project.
- Run `npm install` to install all dependecies.
- Run `npm run dev` to run the app in dev mode.
- App will run in http://localhost:5173

## Commands avaible
- `dev` - It runs the app in dev mode.
- `build` - It prepares and generate all the files needed to launch app to production enviroment.
- `lint` - It executes ESLint validation
- `preview` - It runs a preview of the app running in production
- `test` - It runs all app tests
- `test:ui` - It runs all app tests with an UI
- `coverage` - It runs all app tests and generates a coverage report 
