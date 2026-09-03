<div align="center">

# 🔐 Astusha ID

### Единый сервис авторизации и управления аккаунтом для экосистемы Astusha

![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)

</div>

## О проекте

**Astusha ID** — централизованный сервис идентификации пользователей для приложений экосистемы **Astusha**.

Проект объединяет frontend и backend в одном монорепозитории и отвечает за авторизацию, управление аккаунтом, пользовательские сессии и настройки безопасности.

### Возможности

- регистрация и вход в аккаунт;
- JWT-аутентификация через `accessToken` и `refreshToken`;
- двухфакторная аутентификация по email;
- восстановление и сброс пароля;
- управление профилем и аватаром;
- изменение пароля и темы интерфейса;
- управление активными сессиями;
- история активности аккаунта;
- настройки уведомлений;
- единая авторизация для приложений экосистемы Astusha.

## Стек

**Frontend:** Angular 19, TypeScript, Taiga UI 5, RxJS, Reactive Forms, LESS.

**Backend:** NestJS 11, TypeScript, Prisma 6, PostgreSQL, JWT, Passport, Nodemailer, Swagger.

**Infrastructure:** Docker, Docker Compose, GitHub Actions, GitHub Container Registry.

## Структура

```text
AstushaID/
├── astusha-id-frontend/
├── astusha-id-backend/
├── .github/
├── docker-compose.yml
└── compose.prod.yml
```

## Запуск

```bash
docker compose up --build
```

После запуска:

```text
Frontend: http://localhost:4202
Backend:  http://localhost:3002
Swagger:  http://localhost:3002/api_id
```

---

<div align="center">

**Astusha ID — единая учётная запись для экосистемы Astusha.**

</div>
