# Tech Challenge Fase 3

Interface gráfica de blogging desenvolvida com **Next.js**, **React** e **TypeScript**, com os recursos:
- Leitura de posts
- Autenticação de usuários
- Manipulação dos Posts (Criar, Editar e Excluir)
- Pesquisa de posts pelo conteúdo

## Link de produção

A aplicação está disponível em:
[https://tech-challenge-fase-3.vercel.app/](https://tech-challenge-fase-3.vercel.app/)

## Integração
A aplicação utiliza o projeto [Tech Challenge Fase 2](https://github.com/giovane-f16/tech-challenge-fase-2) como backend.

## Requisitos
1. Docker e Docker compose

> https://www.docker.com/

2. Instância no MongoDB Atlas

> https://www.mongodb.com/products/platform/atlas-database

3. Token JWT do Backend

> https://www.jwt.io/

4. Next Auth Secret

> https://next-auth.js.org/configuration/options#secret

## Como usar
1. Clone o projeto

```bash
git clone https://github.com/giovane-f16/tech-challenge-fase-3.git
```

2. Configure o arquivo **.env** utilizando como base o **[.env.example](.env.example)**

3. Suba o container para rodar conforme produção ou utilize o ambiente de desenvolvimento

```bash
docker compose up --build -d # Produção
npm run dev # Desenvolvimento
```
A aplicação estará disponível no [http://localhost:3000/](http://localhost:3000/)