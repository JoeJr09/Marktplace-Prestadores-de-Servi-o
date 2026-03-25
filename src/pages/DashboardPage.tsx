import { ArrowUpRight, Clock3, Plus } from 'lucide-react'
import { AppShell, Button, StatusPill, Surface } from '../components/ui'
import { activityFeed, dashboardStats, upcomingServices } from '../data/appData'

export function DashboardPage() {
  return (
    <AppShell
      eyebrow="Dashboard"
      title="Visão geral da operação"
      description="Acompanhe desempenho, agenda e ações prioritárias com a mesma base visual das demais telas."
      actions={
        <>
          <Button variant="secondary">Exportar relatório</Button>
          <Button>
            <Plus size={16} aria-hidden="true" />
            Novo serviço
          </Button>
        </>
      }
      sidebarExtra={
        <Surface className="sidebar-card" as="div">
          <p>Meta mensal</p>
          <strong>82%</strong>
          <span>Faltam R$ 4.030 para concluir o objetivo do mês.</span>
        </Surface>
      }
    >
      <section className="stats-grid">
        {dashboardStats.map((stat) => (
          <Surface key={stat.label} className="stat-card" as="article">
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <StatusPill tone={stat.tone}>{stat.change}</StatusPill>
          </Surface>
        ))}
      </section>

      <section className="dashboard-grid">
        <Surface className="panel" as="section">
          <div className="panel-header">
            <div>
              <span className="section-kicker">Agenda</span>
              <h2>Próximos atendimentos</h2>
            </div>
            <button className="text-action" type="button">
              Ver calendário
            </button>
          </div>

          <div className="service-list">
            {upcomingServices.map((service) => (
              <article key={`${service.client}-${service.service}`} className="service-row">
                <div>
                  <h3>{service.service}</h3>
                  <p>{service.client}</p>
                </div>
                <div className="service-meta">
                  <span>
                    <Clock3 size={15} aria-hidden="true" />
                    {service.date}
                  </span>
                  <strong>{service.price}</strong>
                  <StatusPill tone={service.status === 'Confirmado' ? 'success' : 'warning'}>
                    {service.status}
                  </StatusPill>
                </div>
              </article>
            ))}
          </div>
        </Surface>

        <Surface className="panel" as="section">
          <div className="panel-header">
            <div>
              <span className="section-kicker">Atividade</span>
              <h2>Últimas atualizações</h2>
            </div>
            <button className="text-action" type="button">
              Abrir inbox
            </button>
          </div>

          <div className="activity-list">
            {activityFeed.map(({ title, description, icon: Icon, time }) => (
              <article key={title} className="activity-row">
                <div className="icon-chip soft">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <span>{time}</span>
              </article>
            ))}
          </div>

          <Surface className="cta-banner" as="div">
            <div>
              <span className="section-kicker">Aprimoramento</span>
              <h3>Seu checkout está pronto para receber pagamento instantâneo.</h3>
            </div>
            <Button variant="ghost">
              Configurar agora
              <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
          </Surface>
        </Surface>
      </section>
    </AppShell>
  )
}
