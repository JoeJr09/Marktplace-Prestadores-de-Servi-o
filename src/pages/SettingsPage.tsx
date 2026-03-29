import { AppShell, Button, Surface } from '../components/ui'

export function SettingsPage() {
  return (
    <AppShell
      shellClassName="model-shell"
      eyebrow="Professional Portal"
      title="Profile Settings"
      description="Manage your urban presence and service specifications."
      actions={
        <div className="model-profile-actions">
          <Button variant="secondary">Discard Changes</Button>
          <Button>Save Profile</Button>
        </div>
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
      <section className="model-profile-grid">
        <Surface className="model-profile-main" as="section">
          <div className="model-form-block">
            <h2>Business Identity</h2>

            <div className="model-profile-identity-grid">
              <div className="model-field-stack">
                <label>Professional Entity Name</label>
                <input value="Acode Aqui Structural System" readOnly />
              </div>

              <button type="button" className="model-brand-asset-btn">
                Change Brand Asset
              </button>
            </div>

            <div className="model-field-stack">
              <label>Primary Contact Email</label>
              <input value="ops@acodeaqui.pro" readOnly />
            </div>

            <div className="model-field-stack">
              <label>Professional Biography / Capability Statement</label>
              <textarea
                rows={4}
                value="Specializing in modular structural systems and urban hardware integration. Our approach leverages heavy industry standards for modern software architecture. Providing durable, scalable solutions for high-density professional environments."
                readOnly
              />
            </div>
          </div>

          <div className="model-form-block">
            <h2>Operational Logistics</h2>

            <div className="model-logistics-grid">
              <div className="model-field-stack">
                <label>Principal Office Address</label>
                <input value="88 Structural Way, Suite 400" readOnly />
              </div>
              <div className="model-field-stack">
                <label>City & Postal Code</label>
                <input value="New York, NY 10012" readOnly />
              </div>
              <div className="model-field-stack">
                <label>Work Phone (Public)</label>
                <input value="+1 (555) 041-6227" readOnly />
              </div>
            </div>

            <div className="model-logistics-bottom">
              <div className="model-map-placeholder" aria-hidden="true" />
              <Surface className="model-service-radius-card" as="article">
                <h3>Service Radius</h3>
                <p>Your professional services are currently restricted to a 25-mile radius from your principal office.</p>
                <button type="button" className="model-text-link">
                  Adjust service area
                </button>
              </Surface>
            </div>
          </div>

          <Surface className="model-deactivate-card" as="div">
            <div>
              <h3>Deactivate Professional Profile</h3>
              <p>Temporarily remove your profile and services from the public marketplace.</p>
            </div>
            <Button variant="secondary">Request Deactivation</Button>
          </Surface>
        </Surface>

        <aside className="model-profile-side">
          <Surface className="model-status-card" as="article">
            <span>Account Status</span>
            <strong>Verified Pro</strong>
            <div>
              <small>Response Rate</small>
              <b>88.4%</b>
            </div>
            <div className="model-progress thin">
              <span style={{ width: '88%' }} />
            </div>
          </Surface>

          <Surface className="model-availability-card" as="article">
            <h3>Availability</h3>
            <p>
              <span className="model-green-dot" /> Active & Accepting Leads
            </p>
            <small>Your profile is currently visible in the professional directory for the Tri-State area.</small>
          </Surface>
        </aside>
      </section>

      <footer className="model-shell-footer">
        <strong>Acode Aqui</strong>
        <nav aria-label="Rodapé interno">
          <span>Find a professional</span>
          <span>Offer services</span>
          <span>How it works</span>
          <span>Help center</span>
          <span>Terms</span>
          <span>Privacy</span>
        </nav>
      </footer>
    </AppShell>
  )
}
