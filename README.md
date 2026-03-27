# Acode Aqui Marketplace (Frontend)

Frontend React baseado nos layouts enviados (Figma), com foco em fidelidade visual e componentes reutilizáveis.

## Páginas implementadas

- `/home` — Landing principal
- `/services` — Listagem de prestadores
- `/profile` — Perfil de profissional
- `/register` — Cadastro de cliente
- `/pro-register` — Cadastro de profissional
- `/plans` — Planos de assinatura

## Rodando localmente

1. Instale dependências:

```bash
npm install
```

2. Configure o ambiente local:

```bash
cp .env.example .env
```

O projeto usa um único arquivo `.env` na raiz como fonte local de configuração.

Para preparar o banco local, use `.env.example` como base e preencha seus valores reais no arquivo `.env`.

3. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Esse comando sobe o frontend e a API local juntos. O login guest depende da API disponível.

Scripts de banco disponíveis:

- `npm run db:schema` — cria estrutura inicial de usuários e sessões
- `npm run db:seed` — aplica contas seed de desenvolvimento
- `npm run db:reset` — recria schema + seed do ambiente local
- `npm run prisma:generate` — gera o Prisma Client
- `npm run prisma:migrate -- --name <nome>` — cria/aplica migrations Prisma no banco local
- `npm run prisma:seed` — aplica seeds Prisma para guest, usuário padrão e admin
- `npm run prisma:studio` — abre o Prisma Studio
- `npm run qa:auth-smoke` — executa smoke tests de guest login, Zod inválido e registro local

Credenciais de desenvolvimento:

- `username@guest.com`
- `Password123@`

4. Build de produção:

```bash
npm run build
```

## Observações

- Projeto em React + Vite.
- Tipografia via Google Fonts (Inter).
- Estrutura visual e paleta derivadas dos mockups enviados.
- O ambiente local pode operar com `USER_DATA_SOURCE=database` para persistência real em PostgreSQL ou `USER_DATA_SOURCE=mock` quando for necessário trabalhar sem banco.
- O PostgreSQL local usa o schema dedicado `acode_aqui` quando `DATABASE_URL` aponta para `?schema=acode_aqui`.
- O cadastro local já aceita criação de contas reais no banco, com validação compartilhada por Zod entre frontend e backend.
- Arquitetura de dados inicial do domínio de usuários: [docs/user-data-architecture.md](/home/renan/Documentos/UCB/5-Semestre/web/projeto_acode_aqui/Marktplace-Prestadores-de-Servi-o/docs/user-data-architecture.md)
- Schema e seeds locais do banco: [schema.sql](/home/renan/Documentos/UCB/5-Semestre/web/projeto_acode_aqui/Marktplace-Prestadores-de-Servi-o/server/database/schema.sql) e [seed.dev.sql](/home/renan/Documentos/UCB/5-Semestre/web/projeto_acode_aqui/Marktplace-Prestadores-de-Servi-o/server/database/seed.dev.sql)
