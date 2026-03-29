import { Link } from 'react-router-dom'

export function TermsPage() {
  return (
    <div className="legal-page legal-terms-page">
      <header className="legal-hero legal-hero-terms">
        <div className="legal-hero-inner">
          <div className="legal-hero-breadcrumb">
            <Link to="/" aria-label="Return to home">
              
              <span>Voltar para a página inicial</span>
            </Link>
          </div>
          <div className="legal-hero-heading">
            <h1>Termos de uso</h1>
            <p>Ao acessar ou utilizar a Acode Aqui, você concorda com estes termos e condições estruturais.</p>
            <div className="legal-hero-meta">
              <span>Última atualização: 24 de maio de 2024</span>
            </div>
          </div>
        </div>
      </header>

      <main className="legal-main">
        <aside className="legal-sidebar" aria-label="Documentation index">
          <h2>Índice de documentação</h2>
          <ol>
            <li>
              <a href="#acceptance">Aceitação dos termos</a>
            </li>
            <li>
              <a href="#services">Descrição dos serviços</a>
            </li>
            <li>
              <a href="#eligibility">Elegibilidade do usuário</a>
            </li>
            <li>
              <a href="#conduct">Condutas proibidas</a>
            </li>
            <li>
              <a href="#ip">Propriedade intelectual</a>
            </li>
            <li>
              <a href="#liability">Limitação de responsabilidade</a>
            </li>
            <li>
              <a href="#termination">Rescisão</a>
            </li>
          </ol>

          <section className="legal-support-card">
            <h3>Suporte jurídico</h3>
            <p>Dúvidas sobre nossa estrutura jurídica ou obrigações de compliance.</p>
            <button type="button">Enviar e‑mail para compliance</button>
          </section>
        </aside>

        <section className="legal-content">
          <article id="acceptance" className="legal-section">
            <h2>
              <span className="legal-section-number">01</span> Aceitação dos termos
            </h2>
            <p>
              Ao acessar ou utilizar a plataforma Acode Aqui, você concorda em se vincular a estes Termos de
              Uso. Se não concordar com estes termos, você não deve acessar ou utilizar os serviços.
            </p>
            <p>
              Podemos atualizar estes termos periodicamente. O uso contínuo da plataforma após uma
              atualização constitui aceitação dos termos revisados.
            </p>
          </article>

          <article id="services" className="legal-section">
            <h2>
              <span className="legal-section-number">02</span> Descrição dos serviços
            </h2>
            <p>
              Acode Aqui é uma plataforma de marketplace que conecta clientes a profissionais verificados.
              Oferecemos infraestrutura digital para entrada de solicitações, avaliação, acompanhamento da
              execução e liquidação.
            </p>
            <div className="legal-cards-grid">
              <div>
                <h3>Papel do marketplace</h3>
                <p>
                  Atuamos como intermediador e não empregamos profissionais diretamente. Os contratos são
                  firmados entre clientes e profissionais.
                </p>
              </div>
              <div>
                <h3>Disponibilidade da plataforma</h3>
                <p>
                  Buscamos alta disponibilidade, mas não garantimos acesso ininterrupto aos serviços.
                </p>
              </div>
            </div>
          </article>

          <article id="eligibility" className="legal-section">
            <h2>
              <span className="legal-section-number">03</span> Elegibilidade do usuário
            </h2>
            <p>
              Para utilizar a plataforma, você deve ter pelo menos 18 anos e possuir capacidade legal para
              celebrar contratos vinculantes. Requisitos adicionais de elegibilidade podem ser aplicados a
              profissionais.
            </p>
            <ul className="legal-bullets">
              <li>Documentação de identidade verificada para todos os profissionais.</li>
              <li>Requisitos mínimos de idade para todos os titulares de conta.</li>
            </ul>
          </article>

          <article id="conduct" className="legal-section">
            <h2>
              <span className="legal-section-number">04</span> Condutas proibidas
            </h2>
            <p>
              As ações abaixo são estritamente proibidas e podem resultar em rescisão imediata da conta e
              adoção de medidas legais.
            </p>
            <div className="legal-panel-grid">
              <div>
                <h3>Sistemas de pagamento</h3>
                <p>Burlar ou tentar burlar os sistemas de pagamento ou custódia da Acode Aqui.</p>
              </div>
              <div>
                <h3>Conduta profissional</h3>
                <p>Assédio, fraude ou conduta não profissional em relação a outros usuários.</p>
              </div>
              <div>
                <h3>Integridade da plataforma</h3>
                <p>Realizar scraping ou engenharia reversa da infraestrutura da plataforma sem consentimento.</p>
              </div>
            </div>
          </article>

          <article id="ip" className="legal-section">
            <h2>
              <span className="legal-section-number">05</span> Propriedade intelectual
            </h2>
            <p>
              Todo o conteúdo da plataforma, incluindo, mas não se limitando a logo, sistemas de design e
              código customizado, é de propriedade exclusiva da Acode Aqui ou de seus licenciadores.
            </p>
            <p>
              Ao publicar conteúdos como fotos, descrições ou avaliações, você concede à Acode Aqui licença
              não exclusiva, mundial e isenta de royalties para usar e exibir tais conteúdos para operação da
              plataforma e fins de marketing, conforme a legislação aplicável.
            </p>
          </article>

          <article id="liability" className="legal-section">
            <h2>
              <span className="legal-section-number">06</span> Limitação de responsabilidade
            </h2>
            <p>
              Na máxima extensão permitida pela lei, a Acode Aqui não será responsável por quaisquer danos
              indiretos, incidentais ou consequenciais decorrentes do uso dos serviços.
            </p>
            <p>
              Algumas jurisdições não permitem a exclusão de determinados tipos de danos, de modo que a
              limitação acima pode não se aplicar integralmente a você.
            </p>
          </article>

          <article id="termination" className="legal-section">
            <h2>
              <span className="legal-section-number">07</span> Rescisão
            </h2>
            <p>
              Poderemos suspender ou encerrar seu acesso à plataforma a qualquer momento se acreditarmos, de
              forma razoável, que você violou estes termos ou está envolvido em atividade que prejudique
              outros usuários ou a própria plataforma.
            </p>
          </article>

          <section className="legal-cta">
            <h2>Compromisso com a integridade da plataforma</h2>
            <p>
              Ao continuar utilizando a Acode Aqui, você declara que leu, entendeu e concorda com estes
              termos estruturais.
            </p>
            <div className="legal-cta-actions">
              <button type="button">Eu aceito estes termos</button>
              <button type="button" className="secondary">
                Imprimir blueprint
              </button>
            </div>
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
            <Link to="/legal/privacy">Política de privacidade</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
