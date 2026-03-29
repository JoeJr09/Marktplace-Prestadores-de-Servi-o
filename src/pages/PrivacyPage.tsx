import { Link } from 'react-router-dom'

export function PrivacyPage() {
  return (
    <div className="legal-page legal-privacy-page">
      <header className="legal-hero legal-hero-privacy">
        <div className="legal-hero-inner">
          <div className="legal-hero-label">Documento legal</div>
          <div className="legal-hero-heading">
            <h1>Política de privacidade</h1>
            <p>
              Como tratamos seus dados é uma questão de integridade arquitetônica. Construímos confiança por
              meio de transparência e segurança.
            </p>
            <div className="legal-hero-meta">
              <span>Última atualização: 28 de outubro de 2024</span>
              <span>Version 2.4.0</span>
            </div>
          </div>
        </div>
      </header>

      <main className="legal-main">
        <aside className="legal-sidebar" aria-label="Policy navigation">
          <h2>Navegação</h2>
          <ol>
            <li>
              <a href="#intro">Introdução</a>
            </li>
            <li>
              <a href="#data">Coleta de dados</a>
            </li>
            <li>
              <a href="#usage">Protocolo de uso</a>
            </li>
            <li>
              <a href="#sharing">Compartilhamento de informações</a>
            </li>
            <li>
              <a href="#security">Sistemas de segurança</a>
            </li>
            <li>
              <a href="#rights">Seus direitos</a>
            </li>
          </ol>

          <section className="legal-support-card">
            <h3>Dúvidas?</h3>
            <p>Nosso time jurídico está disponível para revisar suas questões de forma estruturada.</p>
            <button type="button">Contactar jurídico</button>
          </section>
        </aside>

        <section className="legal-content">
          <article id="intro" className="legal-section">
            <h2>
              <span className="legal-section-number">01</span> Introdução
            </h2>
            <p>
              Esta Política de Privacidade explica como a Acode Aqui coleta, utiliza e protege dados
              pessoais em conexão com nossos serviços de marketplace.
            </p>
            <p>
              Ao acessar ou utilizar a plataforma, você declara que leu e entendeu esta política.
            </p>
          </article>

          <article id="data" className="legal-section">
            <h2>
              <span className="legal-section-number">02</span> Coleta de dados
            </h2>
            <p>Coletamos as seguintes categorias de informações para operar a plataforma.</p>
            <div className="legal-cards-grid">
              <div>
                <h3>Dados de identidade</h3>
                <p>Nomes, credenciais e identificadores necessários para verificação.</p>
              </div>
              <div>
                <h3>Dados de contato</h3>
                <p>Endereços de e‑mail, telefones e localizações de operação.</p>
              </div>
              <div>
                <h3>Fluxo financeiro</h3>
                <p>Histórico de transações e informações de pagamento tokenizadas. Não armazenamos números de cartão.</p>
              </div>
              <div>
                <h3>Registros técnicos</h3>
                <p>Endereços IP, características de navegador e identificadores de dispositivo usados para proteger a plataforma.</p>
              </div>
            </div>
          </article>

          <article id="usage" className="legal-section">
            <h2>
              <span className="legal-section-number">03</span> Protocolo de uso
            </h2>
            <p>
              Utilizamos os dados coletados para manter a integridade estrutural do marketplace, incluindo:
            </p>
            <ul className="legal-bullets">
              <li>Cruzamento de prestadores de serviço com requisitos de clientes.</li>
              <li>Processamento e liquidação segura de transações financeiras.</li>
              <li>Detecção de fraude, abuso e comportamentos anômalos.</li>
            </ul>
          </article>

          <article id="sharing" className="legal-section">
            <h2>
              <span className="legal-section-number">04</span> Compartilhamento de informações
            </h2>
            <p>
              Não vendemos seus dados. Compartilhamos informações apenas com parceiros verificados essenciais
              à operação da plataforma ou quando exigido por lei.
            </p>
          </article>

          <article id="security" className="legal-section">
            <h2>
              <span className="legal-section-number">05</span> Sistemas de segurança
            </h2>
            <p>
              Todos os dados em trânsito são protegidos por protocolos modernos de criptografia, e o acesso é
              restrito a pessoas autorizadas.
            </p>
            <div className="legal-panel-grid">
              <div>
                <h3>Autenticação em múltiplos fatores</h3>
                <p>Etapas adicionais de verificação disponíveis para ações sensíveis.</p>
              </div>
              <div>
                <h3>Detecção de anomalias</h3>
                <p>Monitoramento em tempo real para detectar padrões incomuns de acesso ou abuso.</p>
              </div>
            </div>
          </article>

          <article id="rights" className="legal-section">
            <h2>
              <span className="legal-section-number">06</span> Seus direitos
            </h2>
            <p>
              Dependendo da sua jurisdição, você pode ter direitos de acessar, corrigir, excluir ou portar
              seus dados pessoais.
            </p>
            <ul className="legal-bullets">
              <li>Direito de acessar e exportar seus dados.</li>
              <li>Direito de retificar informações incorretas.</li>
              <li>Direito de solicitar exclusão, sujeito a obrigações legais.</li>
            </ul>
          </article>

          <section className="legal-subscribe">
            <h2>Mantenha-se informado.</h2>
            <p>Seja avisado sobre atualizações legais importantes e mudanças estruturais.</p>
            <form
              className="legal-subscribe-form"
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <input type="email" placeholder="Seu e‑mail de trabalho" aria-label="Endereço de e‑mail" />
              <button type="submit">Inscrever-se</button>
            </form>
          </section>
        </section>
      </main>

      <footer className="client-home-footer legal-footer">
        <div className="client-home-footer-inner">
          <div>
            <strong>Acode Aqui</strong>
            <p>© {new Date().getFullYear()} Acode Aqui. Todos os direitos reservados.</p>
          </div>
          <nav aria-label="Rodapé">
            <Link to="/users">Encontrar profissional</Link>
            <Link to="/become-pro">Oferecer serviços</Link>
            <Link to="/legal/terms">Termos de uso</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
