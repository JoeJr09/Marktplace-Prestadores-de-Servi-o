import { CreditCard, LockKeyhole, ShieldCheck } from 'lucide-react'
import { AppShell, Button, StatusPill, Stepper, Surface, TextField } from '../components/ui'
import { checkoutItems, checkoutSteps, paymentMethods } from '../data/appData'

const subtotal = checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0)
const fees = 58
const total = subtotal + fees

export function CheckoutPage() {
  return (
    <AppShell
      eyebrow="Checkout"
      title="Concluir pagamento"
      description="Fluxo objetivo para revisar itens, escolher a forma de pagamento e finalizar a contratação."
      actions={<StatusPill tone="info">Ambiente seguro</StatusPill>}
      sidebarExtra={
        <Surface className="sidebar-card" as="div">
          <p>Suporte financeiro</p>
          <strong>Online agora</strong>
          <span>Atendimento para dúvidas de cobrança e confirmação de pagamento.</span>
        </Surface>
      }
    >
      <section className="checkout-layout">
        <Surface className="panel checkout-main" as="section">
          <Stepper steps={checkoutSteps} currentStep={1} />

          <div className="checkout-block">
            <div className="panel-header">
              <div>
                <span className="section-kicker">Resumo</span>
                <h2>Itens da contratação</h2>
              </div>
            </div>

            <div className="invoice-list">
              {checkoutItems.map((item) => (
                <article key={item.name} className="invoice-row">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span>{item.quantity}x</span>
                  <strong>R$ {item.price.toFixed(2).replace('.', ',')}</strong>
                </article>
              ))}
            </div>
          </div>

          <div className="checkout-block">
            <div className="panel-header">
              <div>
                <span className="section-kicker">Pagamento</span>
                <h2>Escolha a forma de pagamento</h2>
              </div>
            </div>

            <div className="payment-options" role="radiogroup" aria-label="Métodos de pagamento">
              {paymentMethods.map(({ label, icon: Icon, description }, index) => (
                <label key={label} className={`payment-card ${index === 0 ? 'is-selected' : ''}`}>
                  <input type="radio" name="payment" defaultChecked={index === 0} />
                  <div className="icon-chip soft">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h3>{label}</h3>
                    <p>{description}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="form-grid three-columns">
              <TextField label="Nome no cartão" placeholder="Acode Aqui Studio" />
              <TextField label="Número do cartão" placeholder="1234 5678 9012 3456" />
              <TextField label="Validade" placeholder="08/28" />
              <TextField label="CVV" placeholder="123" />
              <TextField label="CPF/CNPJ" placeholder="00.000.000/0000-00" />
              <TextField label="CEP" placeholder="70000-000" />
            </div>
          </div>
        </Surface>

        <Surface className="panel checkout-summary" as="aside">
          <div className="panel-header">
            <div>
              <span className="section-kicker">Confirmação</span>
              <h2>Resumo financeiro</h2>
            </div>
          </div>

          <div className="summary-lines">
            <div>
              <span>Subtotal</span>
              <strong>R$ {subtotal.toFixed(2).replace('.', ',')}</strong>
            </div>
            <div>
              <span>Taxas</span>
              <strong>R$ {fees.toFixed(2).replace('.', ',')}</strong>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
            </div>
          </div>

          <Button className="full-width">
            <CreditCard size={16} aria-hidden="true" />
            Confirmar pagamento
          </Button>

          <div className="trust-list">
            <div>
              <ShieldCheck size={16} aria-hidden="true" />
              <span>Processamento criptografado</span>
            </div>
            <div>
              <LockKeyhole size={16} aria-hidden="true" />
              <span>Conformidade com boas práticas de segurança</span>
            </div>
          </div>
        </Surface>
      </section>
    </AppShell>
  )
}
