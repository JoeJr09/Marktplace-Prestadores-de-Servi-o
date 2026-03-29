import { Pencil, PlusCircle, Trash2 } from 'lucide-react'
import { AppShell, Button, Surface, TextField } from '../components/ui'

const services = [
  {
    category: 'STRUCTURAL GRADE',
    title: 'Industrial Site Surveying',
    description: 'Complete topographic and structural assessment for brownfield industrial deployment.',
    rateLabel: 'Base rate',
    rate: '$1,250/project',
    status: 'ACTIVE'
  },
  {
    category: 'TECHNICAL TIER',
    title: 'Smart Grid Integration',
    description: 'Optimization of energy consumption through industrial IoT and smart panel modernization.',
    rateLabel: 'Standard fee',
    rate: '$450/unit',
    status: 'DRAFT'
  }
]

export function UsersListPage() {
  return (
    <AppShell
      shellClassName="model-shell"
      eyebrow="Service Management"
      title="Service Management"
      description="Configure your urban professional offerings"
      actions={<Button variant="secondary">Marco Silva · Top Pro Grade</Button>}
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
      <section className="model-service-grid">
        <Surface className="model-service-form" as="form">
          <div className="model-service-form-head">
            <h2>
              <PlusCircle size={18} aria-hidden="true" />
              New Service Blueprint
            </h2>
          </div>

          <TextField label="Service title" placeholder="e.g. Urban HVAC Architecture" />

          <div className="model-service-row-2">
            <TextField label="Category" placeholder="Engineering" />
            <TextField label="Base price (USD)" placeholder="0.00" />
          </div>

          <TextField
            label="Technical description"
            as="textarea"
            rows={4}
            placeholder="Detail the structural scope and technical requirements..."
          />

          <Button className="full-width" type="submit">
            Initialize Service
          </Button>

          <div className="model-domain-list">
            <strong>Active domains</strong>
            <div>
              <span>Construction</span>
              <span>Civil Work</span>
              <span>Automation</span>
              <span>+ Add category</span>
            </div>
          </div>
        </Surface>

        <div className="model-service-portfolio">
          <div className="model-service-portfolio-head">
            <h2>Current portfolio</h2>
            <span>3 active offerings</span>
          </div>

          <div className="model-service-list">
            {services.map((service) => (
              <Surface key={service.title} className="model-service-card" as="article">
                <div className="model-service-image" aria-hidden="true" />
                <div className="model-service-copy">
                  <small>{service.category}</small>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="model-service-footer">
                    <div>
                      <span>{service.rateLabel}</span>
                      <strong>{service.rate}</strong>
                    </div>
                    <span>{service.status}</span>
                  </div>
                </div>
                <div className="model-service-actions" aria-label="Ações do serviço">
                  <button type="button" aria-label={`Editar ${service.title}`}>
                    <Pencil size={15} aria-hidden="true" />
                  </button>
                  <button type="button" aria-label={`Excluir ${service.title}`}>
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </div>
              </Surface>
            ))}
          </div>

          <Surface className="model-expand-service" as="div">
            <h3>Expand Your Urban Footprint</h3>
            <p>Click to draft a new professional service and reach more enterprise clients.</p>
          </Surface>
        </div>
      </section>
    </AppShell>
  )
}
