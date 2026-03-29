import { Bell, ChevronRight, DollarSign, Plus } from 'lucide-react'
import { AppShell, Button, Surface } from '../components/ui'

const priorityLeads = [
  {
    title: 'Structural Site Audit',
    location: 'Downtown Redevelopment · 4km away',
    price: '$450.00',
    tag: 'URGENT'
  },
  {
    title: 'Foundation Inspection',
    location: 'West Side Residential · 12km away',
    price: '$280.00',
    tag: 'MID-RANGE'
  },
  {
    title: 'CAD Drafting Support',
    location: 'Remote / Global · New York',
    price: '$1,200.00',
    tag: 'PREMIUM'
  }
]

const recentActivity = [
  {
    title: 'PAYMENT RECEIVED',
    description: 'Invoice #8829 cleared for $1,250.00',
    time: '14 min ago'
  },
  {
    title: 'NEW REVIEW',
    description: '“Excellent structural detail on the garage expansion.” · Sarah J.',
    time: '2 hours ago'
  },
  {
    title: 'JOB COMPLETED',
    description: 'Project "Urban Loft Alpha" has been marked finished.',
    time: '5 hours ago'
  }
]

export function DashboardPage() {
  return (
    <AppShell
      shellClassName="model-shell"
      eyebrow="Dashboard"
      title="Dashboard"
      description="Status: Operational / Urban Hub"
      actions={
        <>
          <Surface className="model-money-chip" as="div">
            <DollarSign size={14} aria-hidden="true" />
            <strong>$12,450.00</strong>
          </Surface>
          <button className="model-icon-btn" type="button" aria-label="Notificações">
            <Bell size={15} aria-hidden="true" />
          </button>
          <Button className="model-avatar-chip" variant="secondary">
            <Plus size={16} aria-hidden="true" />
            Marco Silva
          </Button>
        </>
      }
      sidebarExtra={
        <div className="model-sidebar-aux">
          <Button className="full-width" type="button">
            Post a Service
          </Button>
          <div className="model-sidebar-links">
            <span>Help Center</span>
            <span>Privacy</span>
          </div>
        </div>
      }
    >
      <section className="model-dashboard-grid">
        <Surface className="model-revenue-card" as="article">
          <span>Monthly revenue</span>
          <strong>$8,234.50</strong>
          <p>↗ +14.2% from last month</p>
          <div className="model-bars" aria-hidden="true">
            <span />
            <span />
            <span />
            <span className="is-accent" />
            <span />
          </div>
        </Surface>

        <Surface className="model-profile-card" as="article">
          <span>Profile strength</span>
          <strong>LEVEL 8</strong>
          <div className="model-progress">
            <span style={{ width: '85%' }} />
          </div>
          <p>Complete 2 more reviews to reach Master Pro status.</p>
        </Surface>

        <Surface className="model-jobs-card" as="article">
          <span>Active jobs</span>
          <strong>12</strong>
          <small>On Track</small>
        </Surface>
      </section>

      <section className="model-dashboard-second-grid">
        <Surface className="model-priority-panel" as="section">
          <div className="panel-header model-panel-headline">
            <div>
              <h2>Priority Leads</h2>
            </div>
            <button className="model-text-link" type="button">
              View market explorer
            </button>
          </div>

          <div className="model-lead-list">
            {priorityLeads.map((lead) => (
              <article key={lead.title} className="model-lead-row">
                <div>
                  <h3>{lead.title}</h3>
                  <p>{lead.location}</p>
                </div>
                <div className="model-lead-meta">
                  <strong>{lead.price}</strong>
                  <span>{lead.tag}</span>
                  <button type="button" aria-label={`Abrir ${lead.title}`}>
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </Surface>

        <Surface className="model-activity-panel" as="section">
          <div className="panel-header model-panel-headline">
            <div>
              <h2>Recent activity</h2>
            </div>
          </div>

          <div className="model-activity-list">
            {recentActivity.map((activity) => (
              <article key={activity.title} className="model-activity-row">
                <div>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                </div>
                <span>{activity.time}</span>
              </article>
            ))}
          </div>
        </Surface>
      </section>

      <Surface className="model-engagement-card" as="section">
        <div className="model-engagement-chart" aria-hidden="true" />
        <div className="model-engagement-rank">
          <span>Global ranking</span>
          <strong>Top 3% provider</strong>
          <p>Your profile is performing better than 97% of pros in the Urban Engineering category this week.</p>
        </div>
      </Surface>
    </AppShell>
  )
}
