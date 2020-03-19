<h1 align="center">
  <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>

<h3 align="center">GoBarber - Backend</h3>


## 💻 Projeto

Gobarber é uma aplicação para prestadores de serviço, como Barbeiros, Cabeleireiros, controlarem agendamentos de clientes, recebidos via aplicação Mobile. E faça o gerenciamento pela aplicação web.

## Docker

Você vai precisar criar uma imagem de **Postgres**, **Mongo** e **Redis**.

Postgres: https://hub.docker.com/_/postgres
Mongo: https://hub.docker.com/_/mongo
Redis: https://hub.docker.com/_/redis/


## 🚀 Instalação e execução

1. Faça um clone desse repositório;
2. Entre na pasta rodando `cd gobarber-backend`;
3. Rode `yarn` para instalar as dependências;
6. Rode `cp .env.example .env` e preencha o arquivo `.env` com SUAS variáveis ​​ambiente;
7. Rode `yarn sequelize db:migrate` para executar como migrações;
8. Rode `yarn dev` para iniciar o servidor.
9. Rode `yarn queue` para iniciar a fila.
