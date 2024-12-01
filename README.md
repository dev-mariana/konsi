# Desafio Técnico Konsi

Este é um projeto desenvolvido para o desafio técnico da Konsi. Ele consiste em uma aplicação simples que permite buscar benefícios associados a um CPF em uma API externa e exibir os resultados em uma nova tela. O projeto utiliza Fastify, TypeScript, Redis, RabbitMQ, Elasticsearch e Handlebars para a renderização das views.

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Redis](https://redis.io/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Elasticsearch](https://www.elastic.co/)
- [Handlebars](https://handlebarsjs.com/)

## Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **NPM** ou **Yarn** para gerenciamento de pacotes
- **Docker**

## Configuração do Ambiente

1. Clone o repositório para sua máquina local:

   ```bash
   git clone https://github.com/dev-mariana/konsi.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd konsi
   ```

3. Rode o docker compose para criar os containers:

   ```bash
   docker compose up -d
   ```

4. Instale as dependências:

   ```bash
   npm install ou yarn install
   ```

5. Crie um arquivo .env na raiz do projeto e coloque as variáveis de ambiente:

   - NODE_ENV="development"
   - PORT=3000
   - BASE_URL="api-externa"
   - EXTERNAL_API_USERNAME="username da api externa"
   - EXTERNAL_API_PASSWORD="password da api externa"
   - RABBITMQ_CONNECTION="connection rabbit mq"
   - RABBITMQ_QUEUE="nome da fila"
   - REDIS_URL="connection redis"
   - ELASTICSEARCH_URL="connection elasticsearch"

## Executando o Projeto

1. Iniciar o servidor:

   ```bash
   npm run dev ou yarn dev
   ```
