# Acode Aqui Marketplace (Frontend)

Frontend React baseado nos layouts enviados (Figma), com foco em fidelidade visual e componentes reutilizáveis.

## Páginas implementadas

Públicas:

- `/` — Landing principal do cliente
- `/login` — Login com escolha entre Cliente e Profissional
- `/register` — Cadastro de conta (cliente ou prestador)
- `/become-pro` — Landing enterprise para prestadores / parceiros
- `/help-center` — Central de ajuda
- `/legal/terms` — Termos de uso
- `/legal/privacy` — Política de privacidade

Área autenticada:

- `/dashboard` — Painel principal do ambiente logado
- `/users` — Lista de usuários / clientes
- `/users/:userId` — Detalhe do usuário
- `/checkout` — Fluxo de finalização de serviço
- `/subscriptions` — Assinaturas e planos
- `/reviews` — Avaliações e feedback
- `/settings` — Configurações de conta

## Rodando localmente

1. Instale dependências:

```bash
npm install
```

Requisitos de ambiente:

- Node.js `20.x` LTS ou `22.x`
- npm `10+`

Se você usa `nvm`, a versão recomendada está em `.nvmrc`.

2. Configure o ambiente local:

```bash
npm run setup:env
```

O projeto usa um único arquivo `.env` na raiz como fonte local de configuração.
Se precisar sobrescrever valores locais sem versionar mudanças, use `.env.local`.

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
- `npm run qa:auth-smoke` — executa smoke tests de guest login por e-mail, Zod inválido e registro local

Credenciais de desenvolvimento:

- `username@guest.com`
- `Password123@`

O login local usa `e-mail + senha` como identificador de autenticação.

4. Build de produção:

```bash
npm run build
```

## Observações

- Projeto em React + Vite.
- Tipografia via Google Fonts (Inter).
- Estrutura visual e paleta derivadas dos mockups enviados.
- O ambiente local pode operar com `USER_DATA_SOURCE=database` para persistência real em PostgreSQL ou `USER_DATA_SOURCE=mock` quando for necessário trabalhar sem banco.
- Os loaders locais consideram `.env.local` antes de `.env`.
- O PostgreSQL local usa o schema dedicado `acode_aqui` quando `DATABASE_URL` aponta para `?schema=acode_aqui`.
- O cadastro local já aceita criação de contas reais no banco, com validação compartilhada por Zod entre frontend e backend.
- O registro local usa e-mail único, nome completo com até 255 caracteres e telefone brasileiro no formato `+55 (11) 99999-9999`.
- Arquitetura de dados inicial do domínio de usuários: [docs/user-data-architecture.md](docs/user-data-architecture.md)
- Schema e seeds locais do banco: [server/database/schema.sql](server/database/schema.sql) e [server/database/seed.dev.sql](server/database/seed.dev.sql)
