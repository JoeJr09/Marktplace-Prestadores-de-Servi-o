import { Plus } from 'lucide-react'
import { AppShell, Button, Surface } from '../components/ui'

const reviewCards = [
  {
    category: 'STRUCTURAL REPAIR',
    title: 'Renovation of Westside Warehouse',
    subtitle: 'Service provided to Modern Dev Corp · Oct 14, 2023',
    quote:
      'The execution was technically flawless. The team displayed a deep understanding of urban structural integrity. Communication was professional and data-driven throughout the entire process.',
    rating: '★★★★★',
    highlighted: false
  },
  {
    category: 'PENDING ACTION',
    title: 'Urban Landscaping – Phase 2',
    subtitle: 'Service provided to Central Park Residency · Finished 3 days ago',
    quote: 'Your feedback helps maintain the high standards of the Acode Aqui network.',
    rating: '—',
    highlighted: true
  },
  {
    category: 'CONSULTANCY',
    title: 'Zoning Compliance Audit',
    subtitle: 'Service provided to Elite Estates · Sept 22, 2023',
    quote:
      'Precise and timely. The compliance documentation provided was comprehensive and facilitated our permitting process significantly.',
    rating: '★★★★☆',
    highlighted: false
  }
]

export function ReviewsPage() {
  return (
    <AppShell
      shellClassName="model-shell"
      eyebrow="Professional Portal"
      title="Reviews & Feedback"
      description="Measure your professional integrity and keep your delivery quality visible."
      actions={<Button variant="secondary">Complete now</Button>}
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
      <section className="model-reviews-top">
        <Surface className="model-reviews-hero" as="article">
          <span>Service Impact</span>
          <h2>Your Professional Integrity Measured in Excellence.</h2>
          <div>
            <p>
              Average rating <strong>4.92</strong>
            </p>
            <p>
              Completed jobs <strong>128</strong>
            </p>
          </div>
        </Surface>

        <Surface className="model-pending-reviews" as="article">
          <h3>2 Pending Reviews</h3>
          <p>Clients are waiting for your professional feedback on recent projects.</p>
          <Button>Complete now</Button>
        </Surface>
      </section>

      <div className="model-reviews-tabs">
        <button type="button" className="is-active">
          Given Reviews
        </button>
        <button type="button">Pending Actions</button>
        <button type="button">Received</button>
      </div>

      <section className="model-reviews-list">
        {reviewCards.map((review) => (
          <Surface
            key={review.title}
            className={`model-review-card ${review.highlighted ? 'is-highlighted' : ''}`}
            as="article"
          >
            <div className="model-review-head">
              <div>
                <small>{review.category}</small>
                <h3>{review.title}</h3>
                <p>{review.subtitle}</p>
              </div>
              <span>{review.rating}</span>
            </div>

            <blockquote>{review.quote}</blockquote>

            <div className="model-review-actions">
              <button type="button">Edit review</button>
              <button type="button">Remove</button>
              {review.highlighted ? (
                <Button>
                  <Plus size={16} aria-hidden="true" />
                  Write review
                </Button>
              ) : null}
            </div>
          </Surface>
        ))}
      </section>

      <div className="model-reviews-footer-action">
        <button type="button">Load archive</button>
      </div>

      <footer className="model-shell-footer">
        <strong>Acode Aqui</strong>
        <nav aria-label="Rodapé interno">
          <span>Find a professional</span>
          <span>Offer services</span>
          <span>How it works</span>
          <span>Help center</span>
          <span>Privacy</span>
        </nav>
      </footer>
    </AppShell>
  )
}
