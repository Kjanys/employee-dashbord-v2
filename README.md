Это [Next.js](https://nextjs.org) проект загруженный с [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Начало работы

Запуск сервера разработки:

```bash
npm run dev
```

Сервер будет доступен тут: [http://localhost:3000](http://localhost:3000).

## Сборка

Окружение:
- NEXT_PUBLIC_REGISTRATION_KEY=secret-key - Ключ для регистрации на фронте
- NEXT_PUBLIC_BASE_URL=http://localhost:3000/api - Путь для API
- JWT_SECRET=your-secret-key - Ключ для шифрования пароля в БД
- DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/employee_tracker?schema=public - Путь до БД, PASSWORD пароль от нее
- WEBSOCKET_ORIGIN_URL=http://localhost:3000 - Путь для связи сервера вебсокета с приложением, должен повторять NEXT_PUBLIC_BASE_URL, но без /api
- WEBSOCKET_HOST_NAME=localhost - хост вебсокета
- WEBSOCKET_PORT_NAME=3001 - порт вебсокета

Build:

```bash
npm i --legacy-peer-deps
npm run build
```
