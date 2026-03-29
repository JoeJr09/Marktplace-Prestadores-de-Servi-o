import {
  Bell,
  BriefcaseBusiness,
  CalendarRange,
  CircleDollarSign,
  CreditCard,
  FileClock,
  LayoutDashboard,
  MessageSquareText,
  Package,
  Settings,
  Wrench,
  MonitorSmartphone,
  ShieldCheck,
  WalletCards
} from 'lucide-react'
import type {
  ActivityFeedItem,
  CheckoutItem,
  DashboardHighlight,
  DashboardStat,
  MainNavItem,
  PaymentMethod,
  SettingsSections,
  UpcomingService
} from '../types/app'

export const mainNavItems: MainNavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/users', label: 'Service Management', icon: Wrench },
  { to: '/subscriptions', label: 'Subscriptions', icon: Package },
  { to: '/reviews', label: 'Reviews', icon: MessageSquareText },
  { to: '/checkout', label: 'Order Details', icon: CircleDollarSign },
  { to: '/settings', label: 'Settings', icon: Settings }
]

export const dashboardStats: DashboardStat[] = [
  { label: 'Faturamento do mês', value: 'R$ 18.420', change: '+12%', tone: 'success' },
  { label: 'Pedidos em aberto', value: '14', change: '4 urgentes', tone: 'warning' },
  { label: 'Clientes ativos', value: '128', change: '+8 novos', tone: 'info' }
]

export const dashboardHighlights: DashboardHighlight[] = [
  {
    title: 'Painel operacional',
    description: 'Visualize serviços, mensagens e faturamento em um só lugar.',
    icon: MonitorSmartphone
  },
  {
    title: 'Confirmação segura',
    description: 'Fluxo de pagamento e revisão de pedidos com validação clara.',
    icon: ShieldCheck
  },
  {
    title: 'Agenda integrada',
    description: 'Entregas e atendimentos priorizados de acordo com vencimento.',
    icon: CalendarRange
  }
]

export const upcomingServices: UpcomingService[] = [
  {
    client: 'Marina Costa',
    service: 'Revisão elétrica residencial',
    date: 'Hoje, 14:00',
    price: 'R$ 480',
    status: 'Confirmado'
  },
  {
    client: 'Condomínio Skyline',
    service: 'Manutenção preventiva',
    date: '26 mar, 09:30',
    price: 'R$ 1.250',
    status: 'Em andamento'
  },
  {
    client: 'Ateliê Norte',
    service: 'Instalação de iluminação',
    date: '27 mar, 11:00',
    price: 'R$ 920',
    status: 'Aguardando pagamento'
  }
]

export const activityFeed: ActivityFeedItem[] = [
  {
    title: 'Pagamento aprovado',
    description: 'Pedido #2048 foi confirmado e já pode ser agendado.',
    icon: CreditCard,
    time: 'há 8 min'
  },
  {
    title: 'Novo briefing recebido',
    description: 'Cliente enviou anexos para o projeto do loft da Asa Norte.',
    icon: BriefcaseBusiness,
    time: 'há 24 min'
  },
  {
    title: 'Documento atualizado',
    description: 'Contrato padrão de prestação de serviço revisado com sucesso.',
    icon: FileClock,
    time: 'há 1 h'
  }
]

export const settingsSections: SettingsSections = [
  {
    title: 'Perfil público',
    description: 'Ajuste os dados exibidos para clientes e parceiros.',
    fields: [
      { label: 'Nome da empresa', type: 'text', defaultValue: 'Acode Aqui Studio' },
      { label: 'E-mail profissional', type: 'email', defaultValue: 'contato@acodeaqui.com' },
      { label: 'Telefone', type: 'tel', defaultValue: '+55 61 99999-9999' }
    ]
  },
  {
    title: 'Preferências de operação',
    description: 'Defina como você recebe notificações e pedidos.',
    toggles: [
      { label: 'Receber alertas por e-mail', description: 'Novos pedidos, alterações e pagamentos.', enabled: true },
      { label: 'Exigir confirmação em duas etapas', description: 'Camada extra de segurança no acesso.', enabled: true },
      { label: 'Exibir agenda pública', description: 'Disponibilidade para agendamento direto.', enabled: false }
    ]
  }
]

export const checkoutSteps: string[] = ['Resumo', 'Pagamento', 'Confirmação']

export const checkoutItems: CheckoutItem[] = [
  {
    name: 'Projeto elétrico premium',
    description: 'Diagnóstico, planta técnica e visita de validação.',
    quantity: 1,
    price: 1450
  },
  {
    name: 'Taxa de urgência',
    description: 'Entrega antecipada em até 48 horas.',
    quantity: 1,
    price: 220
  }
]

export const paymentMethods: PaymentMethod[] = [
  { label: 'Cartão corporativo', icon: CreditCard, description: 'Parcelamento em até 3x sem juros.' },
  { label: 'PIX', icon: WalletCards, description: 'Confirmação imediata e emissão automática.' },
  { label: 'Boleto', icon: Bell, description: 'Vencimento em 2 dias úteis.' }
]
