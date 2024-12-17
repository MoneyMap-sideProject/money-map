# local 실행 방법

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

1. nestjs 실행

- terminal open
- cd backend
- yarn
- yarn start

2. db 환경 docker로 실행

- docker 다운로드 및 실행
- docker run --name my-financial-db -e POSTGRES_PASSWORD=your_password -e POSTGRES_USER=postgres -e POSTGRES_DB=my_financial_db -p 5432:5432 -d postgres

3. user api test (curl)

- 사용자 생성 (POST /users) :

```bash
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"email": "test@example.com"}'
```

- 모든 사용자 조회 (GET /users)

```bash
curl -X GET http://localhost:3000/users
```

- 사용자 로그인 (POST /users/login)

```bash
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{"email": "test@example.com"}'
```
