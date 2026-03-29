import { ArrowRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="model-not-found-page">
      <main className="model-not-found-main">
        <section className="model-not-found-card">
          <small>Hazard Ref: 404-B</small>
          <strong>404</strong>
          <p>Structural integrity compromised</p>
          <span>Foundation check failed: requested coordinate not found.</span>
        </section>

        <section className="model-not-found-copy">
          <h1>
            This section of the site is currently under <span>unplanned demolition.</span>
          </h1>
          <p>
            The page you're looking for was either relocated during the last build or the foundation was never poured.
          </p>

          <Link to="/" className="model-not-found-primary">
            Return to HQ <ArrowRight size={16} aria-hidden="true" />
          </Link>

          <div className="model-not-found-actions">
            <button type="button">Get Help</button>
            <Link to="/users">
              <Search size={14} aria-hidden="true" /> Find Pro
            </Link>
          </div>

          <div className="model-not-found-meta">
            <span>System status: Operational</span>
            <span>Build ID: AA-2024-URBN</span>
          </div>
        </section>
      </main>

      <footer className="model-shell-footer">
        <strong>Acode Aqui</strong>
        <nav aria-label="Rodapé interno">
          <span>How it works</span>
          <span>Offer services</span>
          <span>Privacy</span>
          <span>Help center</span>
        </nav>
      </footer>
    </div>
  )
}
