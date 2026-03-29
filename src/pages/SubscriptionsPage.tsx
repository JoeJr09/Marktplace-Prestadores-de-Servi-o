import { AppShell, Button, Surface } from '../components/ui'

const billingHistory = [
  { date: 'Nov 14, 2024', invoice: 'INV-2024-8842', plan: 'Elite Professional', amount: '$61.50', status: 'PAID' },
  { date: 'Oct 14, 2024', invoice: 'INV-2024-7210', plan: 'Elite Professional', amount: '$49.00', status: 'PAID' },
  { date: 'Sep 14, 2024', invoice: 'INV-2024-5591', plan: 'Standard Pro', amount: '$19.00', status: 'PAID' }
]

export function SubscriptionsPage() {
  return (
    <AppShell
      shellClassName="model-shell"
      eyebrow="Professional Portal"
      title="Subscriptions & Plans"
      description="Manage your professional presence and billing cycles."
      actions={<Button>Become a Pro</Button>}
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
      <section className="model-subscription-top">
        <Surface className="model-current-plan" as="section">
          <div className="model-current-plan-head">
            <div>
              <small>Current Active Plan</small>
              <h2>Elite Professional</h2>
            </div>
            <div>
              <small>Next Billing Date</small>
              <strong>Dec 14, 2024</strong>
            </div>
          </div>

          <div className="model-plan-metrics">
            <div>
              <small>Visibility score</small>
              <strong>Priority #1</strong>
            </div>
            <div>
              <small>Service fee</small>
              <strong>3.5% Flat</strong>
            </div>
            <div>
              <small>Support level</small>
              <strong>24/7 VIP</strong>
            </div>
          </div>

          <div className="model-plan-actions">
            <Button>Renew Early</Button>
            <Button variant="secondary">Change Method</Button>
          </div>
        </Surface>

        <Surface className="model-billing-summary" as="aside">
          <h3>Billing Summary</h3>
          <p>
            Monthly Base <strong>$49.00</strong>
          </p>
          <p>
            Add-ons (Boost) <strong>$12.50</strong>
          </p>
          <h4>
            Total due Dec 14 <strong>$61.50</strong>
          </h4>
        </Surface>
      </section>

      <section className="model-upgrade-grid">
        <Surface className="model-tier-card" as="article">
          <h3>Standard Pro</h3>
          <p>Essential tools for local service discovery and booking.</p>
          <strong>$19/mo</strong>
          <ul>
            <li>Verified Pro Badge</li>
            <li>Unlimited Job Quotes</li>
            <li>Standard Listing View</li>
          </ul>
          <Button variant="secondary">Downgrade to Standard</Button>
        </Surface>

        <Surface className="model-tier-card is-featured" as="article">
          <h3>Architect Tier</h3>
          <p>National visibility with AI-driven lead matching.</p>
          <strong>$99/mo</strong>
          <ul>
            <li>AI Lead Match Algorithm</li>
            <li>Zero Commission on First 5 Jobs</li>
            <li>Exclusive ‘Master’ Badge</li>
            <li>Dedicated Account Manager</li>
          </ul>
          <Button>Upgrade to Architect</Button>
        </Surface>

        <Surface className="model-tier-card" as="article">
          <h3>Enterprise</h3>
          <p>For agencies and teams managing multiple profiles.</p>
          <strong>Custom</strong>
          <ul>
            <li>Team Dashboard Access</li>
            <li>API Access for CRM</li>
            <li>White-label Client Reports</li>
          </ul>
          <Button>Contact sales</Button>
        </Surface>
      </section>

      <Surface className="model-billing-history" as="section">
        <div className="panel-header model-panel-headline">
          <h2>Billing History</h2>
          <button type="button" className="model-text-link">
            Download all (PDF)
          </button>
        </div>

        <div className="model-archive-table" role="table" aria-label="Billing history">
          <div className="model-archive-head" role="row">
            <span>Date</span>
            <span>Invoice ID</span>
            <span>Plan</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {billingHistory.map((invoice) => (
            <div key={invoice.invoice} className="model-archive-row" role="row">
              <span>{invoice.date}</span>
              <span>{invoice.invoice}</span>
              <strong>{invoice.plan}</strong>
              <strong>{invoice.amount}</strong>
              <span>{invoice.status}</span>
              <span>VIEW</span>
            </div>
          ))}
        </div>
      </Surface>

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
