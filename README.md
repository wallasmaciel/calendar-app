
# Calendar-app

O projeto foi desenvolvido com o objetivo de praticar. Quando pensei 
em começar algum projeto eu tinha em mente praticar desenvolver componentes
em React apenas usando classes e para o backend usando o NestJS que 
é um framework NodeJS que conheci em um evento NLW da Rocketseat. (Obs: Achei incrivel esse framework.)
## Aprendizados

Construi uma aplicação web de calendário para se registrar eventos e manter eles salvos em um banco de dados.
Meu maior desafio foi planejar uma lógica de desenho do calendário, mas depois que fixei a ideia, o projeto fluiu bem.

## Stack utilizada

**Front-end:** React, Bootstrap, Typescript

**Back-end:** Node, NestJS, Prisma


## Screenshots

![App Screenshot](https://raw.githubusercontent.com/wallasmaciel/calendar-app/master/screenshots/frontend/app-preview.PNG?text=App+Screenshot+Here)

![App Screenshot](https://raw.githubusercontent.com/wallasmaciel/calendar-app/master/screenshots/frontend/add-new-event.PNG?text=App+Screenshot+Here)

![App Screenshot](https://raw.githubusercontent.com/wallasmaciel/calendar-app/master/screenshots/frontend/new-event-adding.PNG?text=App+Screenshot+Here)

![App Screenshot](https://raw.githubusercontent.com/wallasmaciel/calendar-app/master/screenshots/frontend/remove-event.PNG?text=App+Screenshot+Here)


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/wallasmaciel/calendar-app.git
```

Entre no diretório do projeto backend

```bash
  cd calendar-app\backend
```

Instale as dependências

```bash
  npm install
```

Executar a migration no prisma para criar o banco de dados

```bash
npx prisma migrate dev --name init
```

Inicie o servidor

```bash
  npm run start:dev
```

Agora inicie o projeto frontend

```bash
  cd calendar-app\frontend
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```