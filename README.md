# SRCE API

API do projeto SRCE.
## Instalação

Instalação com NPM

```bash
  npm install
```

ou

```bash
  yarn
```

## Variáveis de ambiente
@.env - Exemplo
```.env
PORT=8000
DATABASE_URL="mysql://root:1234@localhost:3306/srce"
SECRET=srce_upx
MONGODB_PASSWORD=w9c99z99c999u9nl
```
    
## Deploy

Para realizar o deploy:

```bash
  npx prisma db push
  npm run dev
```

ou

```bash
  yarn prisma db push
  yarn dev
```

## Routes

### GET - ping_pong

Rota para testar a API:

```
http://localhost${process.env.PORT}/ping
```

### GET - listar_conta_por_id

Rota para buscar uma conta por ID:

```
http://localhost${process.env.PORT}/listar_conta/:id
```

### GET - listar_contas

Rota para buscar todas as contas do banco de dados:

```
http://localhost${process.env.PORT}/listar_contas/
```

### POST - nova_conta

Rota para inserir uma nova conta no banco de dados:

```
http://localhost${process.env.PORT}/nova_conta/
```

### PUT - atualizar_conta

Rota atualizar uma conta já existente no banco de dados:

```
http://localhost${process.env.PORT}/atualizar_conta/:id
```

### DELETE - apagar_conta

Rota para excluir uma conta do banco de dados:

```
http://localhost${process.env.PORT}/apagar_conta/:id
```