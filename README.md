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
MONGODB_PASSWORD=vai ter que pedir pro pai no zap :sunglasses:
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