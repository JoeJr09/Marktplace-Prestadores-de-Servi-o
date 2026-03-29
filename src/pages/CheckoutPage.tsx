import { ArrowLeft, Building2, CreditCard, Info, Lock, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, Surface } from '../components/ui'

export function CheckoutPage() {
  return (
    <div className="model-checkout-page">
      <header className="model-checkout-topbar">
        <Link to="/users" className="model-checkout-link">
          <ArrowLeft size={14} aria-hidden="true" />
          Return to Search
        </Link>
        <strong>Acode Aqui</strong>
        <span className="model-checkout-secure">
          <Lock size={12} aria-hidden="true" /> Secure Checkout
        </span>
      </header>

      <main className="model-checkout-main">
        <section className="model-checkout-grid">
          <Surface className="model-checkout-form" as="section">
            <h1>Finalize Your Service</h1>
            <p>Review your selection and choose a secure payment method to lock in your professional.</p>

            <h2>01 Payment Method</h2>
            <div className="model-payment-cards" role="radiogroup" aria-label="Payment method">
              <label className="model-payment-card is-active">
                <input type="radio" name="pay-method" defaultChecked />
                <CreditCard size={16} aria-hidden="true" />
                <span>Standard Pay</span>
                <strong>Credit / Debit</strong>
              </label>

              <label className="model-payment-card">
                <input type="radio" name="pay-method" />
                <Wallet size={16} aria-hidden="true" />
                <span>Instant</span>
                <strong>Digital Wallet</strong>
              </label>

              <label className="model-payment-card">
                <input type="radio" name="pay-method" />
                <Building2 size={16} aria-hidden="true" />
                <span>Direct</span>
                <strong>Bank Transfer</strong>
              </label>
            </div>

            <div className="model-checkout-fields">
              <div>
                <label>Cardholder Name</label>
                <input value="ALEXANDER VANCE" readOnly />
              </div>
              <div>
                <label>Card Number</label>
                <input value="**** **** **** 4421" readOnly />
              </div>
              <div>
                <label>Expiry Date</label>
                <input value="MM/YY" readOnly />
              </div>
              <div>
                <label>CVV</label>
                <input value="123" readOnly />
              </div>
              <div className="wide">
                <label>Postal Code</label>
                <input value="10001" readOnly />
              </div>
            </div>

            <h2>02 Review Requirements</h2>
            <Surface className="model-requirement-box" as="article">
              <h3>
                <Info size={16} aria-hidden="true" /> Project Milestone Agreement
              </h3>
              <p>
                By proceeding, you agree that 50% of the funds will be held in escrow until the first delivery
                milestone is met. The remaining balance will be released upon final project approval.
              </p>
            </Surface>
          </Surface>

          <aside className="model-checkout-side">
            <Surface className="model-order-summary" as="section">
              <span>Premium Service</span>
              <h3>Architectural Design Phase 1</h3>
              <small>Professional: Julian Sterling</small>

              <div>
                <p>
                  Subtotal <strong>$1,250.00</strong>
                </p>
                <p>
                  Platform Fee (5%) <strong>$62.50</strong>
                </p>
                <p>
                  Urban Insurance <strong>$15.00</strong>
                </p>
              </div>

              <h4>
                Total Amount <strong>$1,327.50</strong>
              </h4>

              <Button className="full-width">Confirm and Pay</Button>
              <small>Encrypted 256-bit SSL connection</small>
            </Surface>

            <Surface className="model-verified-box" as="div">
              <strong>Acode Verified</strong>
              <span>Buyer protection active</span>
            </Surface>
          </aside>
        </section>
      </main>

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
    </div>
  )
}
