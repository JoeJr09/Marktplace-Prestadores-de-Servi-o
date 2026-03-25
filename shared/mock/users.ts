import type { User } from '../contracts/users'

export const users: User[] = [
  {
    id: 'USR-1024',
    slug: 'helena-duarte',
    fullName: 'Helena Duarte',
    role: 'Cliente corporativa',
    company: 'Urban Forge Studio',
    status: 'active',
    email: 'helena.duarte@urbanforge.com',
    phone: '+55 11 98231-4420',
    city: 'Sao Paulo, SP',
    segment: 'Arquitetura e interiores',
    avatarTone: 'graphite',
    joinedAt: '12 jan 2026',
    lastAccess: 'Hoje, 09:18',
    plan: 'Enterprise Iron',
    openOrders: 3,
    lifetimeValue: 'R$ 18.400',
    responseExpectation: 'Até 30 min',
    note: 'Prefere alinhamentos rápidos por telefone antes da aprovação final.',
    tags: ['VIP', 'Contrato recorrente', 'Aprovação rápida'],
    bio:
      'Coordena demandas de retrofit e instalações premium em escritórios boutique. Valoriza previsibilidade, linguagem direta e entregas com documentação clara.',
    address: 'Rua Oscar Freire, 843, Cerqueira Cesar',
    recentActivity: [
      { label: 'Pagamento aprovado', detail: 'Pedido #4012 liberado para execução.', time: 'há 18 min' },
      { label: 'Briefing atualizado', detail: 'Novo escopo para sala de reunião executiva.', time: 'há 2 h' },
      { label: 'Visita confirmada', detail: 'Agenda técnica validada para 27 mar.', time: 'ontem' }
    ]
  },
  {
    id: 'USR-1038',
    slug: 'caio-medeiros',
    fullName: 'Caio Medeiros',
    role: 'Prestador parceiro',
    company: 'Iron Circuit Engenharia',
    status: 'pending',
    email: 'caio@ironcircuit.com.br',
    phone: '+55 61 99118-8301',
    city: 'Brasilia, DF',
    segment: 'Infraestrutura eletrica',
    avatarTone: 'steel',
    joinedAt: '07 fev 2026',
    lastAccess: 'Hoje, 07:42',
    plan: 'Professional',
    openOrders: 7,
    lifetimeValue: 'R$ 9.760',
    responseExpectation: 'Até 2 h',
    note: 'Cadastro em revisao documental antes da liberacao completa.',
    tags: ['Onboarding', 'Documentacao', 'Alta demanda'],
    bio:
      'Especialista em painéis, retrofit elétrico e integração de automação leve. Está em fase final de homologação para atender contratos corporativos.',
    address: 'SQN 215, Bloco B, Asa Norte',
    recentActivity: [
      { label: 'Documento recebido', detail: 'Comprovante de certificacao anexado.', time: 'há 40 min' },
      { label: 'Analise interna', detail: 'Time operacional revisando cobertura de atendimento.', time: 'há 5 h' },
      { label: 'Conta criada', detail: 'Fluxo de cadastro iniciado pelo parceiro.', time: '07 fev' }
    ]
  },
  {
    id: 'USR-1056',
    slug: 'natalia-ferraz',
    fullName: 'Natalia Ferraz',
    role: 'Cliente residencial',
    company: 'Residencial Vista Clara',
    status: 'inactive',
    email: 'natalia.ferraz@gmail.com',
    phone: '+55 21 98800-7721',
    city: 'Rio de Janeiro, RJ',
    segment: 'Reforma residencial',
    avatarTone: 'iron',
    joinedAt: '19 dez 2025',
    lastAccess: '12 mar 2026',
    plan: 'Essential',
    openOrders: 0,
    lifetimeValue: 'R$ 4.320',
    responseExpectation: 'Sob demanda',
    note: 'Cliente sem pedidos ativos; manter contato leve para reativacao.',
    tags: ['Pausa', 'Reengajamento', 'Historico positivo'],
    bio:
      'Já contratou revisões elétricas e acompanhamento de obra para reforma compacta. Tende a voltar quando há pacotes fechados e comunicação bem objetiva.',
    address: 'Rua Barata Ribeiro, 219, Copacabana',
    recentActivity: [
      { label: 'Ticket encerrado', detail: 'Solicitacao de garantia finalizada sem pendencias.', time: '12 mar' },
      { label: 'Proposta enviada', detail: 'Oferta de manutencao preventiva compartilhada.', time: '01 mar' },
      { label: 'Ultimo pedido concluido', detail: 'Entrega homologada com nota maxima.', time: '18 fev' }
    ]
  },
  {
    id: 'USR-1071',
    slug: 'rafael-santana',
    fullName: 'Rafael Santana',
    role: 'Gestor de facilities',
    company: 'Axis Metal Works',
    status: 'active',
    email: 'rafael.santana@axismetal.com',
    phone: '+55 31 99877-6504',
    city: 'Belo Horizonte, MG',
    segment: 'Operacao industrial leve',
    avatarTone: 'graphite',
    joinedAt: '23 fev 2026',
    lastAccess: 'Hoje, 10:02',
    plan: 'Business',
    openOrders: 5,
    lifetimeValue: 'R$ 14.980',
    responseExpectation: 'Até 1 h',
    note: 'Foco em SLA e relatórios fotográficos por etapa.',
    tags: ['B2B', 'SLA alto', 'Expansao'],
    bio:
      'Centraliza demandas operacionais de galpões e escritórios técnicos. Busca fornecedores consistentes, com comunicação enxuta e documentação pronta para auditoria.',
    address: 'Av. do Contorno, 5200, Funcionarios',
    recentActivity: [
      { label: 'Nova demanda criada', detail: 'Checklist de manutenção trimestral publicado.', time: 'há 12 min' },
      { label: 'Pedido reaberto', detail: 'Ajuste complementar solicitado após vistoria.', time: 'há 1 h' },
      { label: 'Contrato renovado', detail: 'Extensão de atendimento para mais 6 meses.', time: 'ontem' }
    ]
  }
]
