import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="client-home-page">
      <header className="client-home-topbar">
        <div className="client-home-topbar-inner">
          <Link to="/" className="client-home-brand">
            <span className="client-home-mark" />
            <div>
              <strong>Acode Aqui</strong>
              <span>Marketplace de precisão para profissionais</span>
            </div>
          </Link>

          <nav className="client-home-nav" aria-label="Navegação principal">
            <Link to="/users">Encontrar profissional</Link>
            <Link to="/#how-it-works">Como funciona</Link>
            <Link to="/become-pro">Oferecer serviços</Link>
            <Link to="/help-center">Central de ajuda</Link>
          </nav>

          <div className="client-home-actions">
            <Link to="/login" className="client-home-link-btn">
              Entrar
            </Link>
            <Link to="/become-pro" className="client-home-primary-btn">
              Seja um Pro
            </Link>
          </div>
        </div>
      </header>

      <main className="client-home-main">
        <section className="client-home-hero">
          <div className="client-home-hero-grid">
            <div className="client-home-hero-copy">
              <span className="client-home-kicker">Feito para precisão</span>
              <h1>
                A jornada do cliente,
                <span> projetada estruturalmente.</span>
              </h1>
              <p>
                Cada solicitação, cada marco e cada pagamento – orquestrados com a mesma disciplina de um
                projeto arquitetônico.
              </p>
              <div className="client-home-hero-actions">
                <Link
                  to="/login?persona=prestador"
                  className="client-home-hero-btn client-home-hero-btn-primary"
                >
                  Sou profissional
                </Link>
                <Link
                  to="/login?persona=cliente"
                  className="client-home-hero-btn client-home-hero-btn-secondary"
                >
                  Sou cliente
                </Link>
              </div>
              <div className="client-home-hero-meta">
                <span>Profissionais verificados, pagamentos protegidos em conta de custódia e transparência de execução.</span>
              </div>
            </div>

            <aside className="client-home-hero-card" aria-label="Live service feed">
              <header>
                <span>Orquestração de serviços em tempo real</span>
                <strong>Painel de execução</strong>
              </header>
              <ul>
                <li>
                  <div>
                    <span className="client-pill client-pill-green">In progress</span>
                    <strong>Consultoria de retrofit estrutural</strong>
                    <small>Cliente • São Paulo – Centro urbano</small>
                  </div>
                  <span>Previsão 02h 14m</span>
                </li>
                <li>
                  <div>
                    <span className="client-pill client-pill-amber">Verifying</span>
                    <strong>Auditoria fotográfica de pré‑entrega</strong>
                    <small>Profissional • Envio de documentação</small>
                  </div>
                  <span>3 pontos de verificação</span>
                </li>
                <li>
                  <div>
                    <span className="client-pill client-pill-blue">Escrow locked</span>
                    <strong>Pacote de restauração de fachada</strong>
                    <small>R$ 18.500 • Liberação após aprovação do cliente</small>
                  </div>
                  <span>Pronto para liquidação</span>
                </li>
              </ul>
              <footer>
                <p>
                  Cada operação é versionada, datada e rastreável – feita para equipes que tratam serviço
                  como infraestrutura.
                </p>
              </footer>
            </aside>
          </div>
        </section>

        <section id="how-it-works" className="client-home-journey">
          <header className="client-home-section-header">
            <span className="client-home-kicker">A jornada do cliente</span>
            <div>
              <h2>Da solicitação inicial à entrega verificada.</h2>
              <p>
                Cada etapa foi desenhada para que o cliente sempre saiba quem é o responsável, o que vem a
                seguir e como está o orçamento.
              </p>
            </div>
          </header>

          <div className="client-home-journey-grid">
            <article>
              <span className="client-step">Etapa 01</span>
              <h3>Descoberta e escopo</h3>
              <p>
                Capture o objetivo com briefings estruturados em vez de conversas vagas. Anexe referências,
                plantas e restrições desde o primeiro dia.
              </p>
              <ul>
                <li>Campos estruturados de requisitos</li>
                <li>Parâmetros de localização e acesso</li>
                <li>Faixas de orçamento máximo e prazo</li>
              </ul>
            </article>

            <article>
              <span className="client-step">Etapa 02</span>
              <h3>Avaliação e seleção</h3>
              <p>
                Compare profissionais por evidências: projetos anteriores, validações técnicas e
                desempenho em escopos semelhantes.
              </p>
              <ul>
                <li>Ranqueamento baseado em sinais, não em anúncios</li>
                <li>SLAs de resposta transparentes</li>
                <li>Lógica de recomendação sem conflitos de interesse</li>
              </ul>
            </article>

            <article>
              <span className="client-step">Etapa 03</span>
              <h3>Execução e liquidação</h3>
              <p>
                Acompanhe o progresso por marcos. Os valores ficam em custódia até que o trabalho seja
                verificado e aprovado pelo cliente.
              </p>
              <ul>
                <li>Checklists baseadas em marcos</li>
                <li>Provas visuais e documentação</li>
                <li>Fluxos de pagamento com conta de custódia</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="client-home-ecosystem">
          <header className="client-home-section-header">
            <span className="client-home-kicker">O ecossistema de profissionais</span>
            <div>
              <h2>Onde operadores sérios consolidam seu funil.</h2>
              <p>
                Feito para equipes que tratam cada atendimento como um projeto – com responsáveis
                claros, métricas e regras de liquidação.
              </p>
            </div>
          </header>

          <div className="client-home-ecosystem-grid">
            <article>
              <span className="client-ecosystem-label">Arquiteture seu perfil</span>
              <h3>Identidade estruturada</h3>
              <p>
                Categorias padronizadas, etiquetas de capacidade e selos de conformidade para que os clientes
                sempre saibam o que você realmente faz.
              </p>
            </article>
            <article>
              <span className="client-ecosystem-label">Gestão operacional</span>
              <h3>Cabine de execução</h3>
              <p>
                Um único centro de comando para todos os atendimentos: entrada, agendamento, documentação e
                faturas prontas para liberação.
              </p>
            </article>
            <article>
              <span className="client-ecosystem-label">Liquidação financeira</span>
              <h3>Pagamentos verificados</h3>
              <p>
                Fluxos com conta de custódia e regras claras. Valores são bloqueados, liberados e conciliados
                sem planilhas.
              </p>
            </article>
          </div>
        </section>

        <section className="client-home-stats">
          <div className="client-home-stats-inner">
            <div>
              <h3>Infraestrutura para confiança em escala.</h3>
              <p>
                Cada número aqui é resultado de um processo desenhado – não de um slide de marketing.
              </p>
            </div>
            <div className="client-home-stats-grid">
              <div>
                <strong>15k+</strong>
                <span>Profissionais verificados</span>
              </div>
              <div>
                <strong>R$ 2.4M</strong>
                <span>Volume processado em custódia</span>
              </div>
              <div>
                <strong>99%</strong>
                <span>Índice de confiança em serviços</span>
              </div>
            </div>
          </div>
        </section>

        <section className="client-home-cta">
          <div className="client-home-cta-inner">
            <div className="client-home-cta-copy">
              <span className="client-home-kicker">Pronto para construir</span>
              <h2>Pronto para construir algo grande?</h2>
              <p>
                Seja para estruturar um reparo pontual ou um retrofit em todo o portfólio, você conta com a
                mesma base operacional.
              </p>
              <div className="client-home-cta-actions">
                <Link to="/login?persona=cliente" className="client-home-primary-btn">
                  Começar como cliente
                </Link>
                <Link to="/login?persona=prestador" className="client-home-link-btn">
                  Explorar como profissional
                </Link>
              </div>
            </div>

            <aside className="client-home-cta-card" aria-label="Protocol snapshot">
              <header>
                <span>Blueprint de engajamento</span>
                <strong>Protocolo centrado no cliente</strong>
              </header>
              <ul>
                <li>
                  <span className="client-pill client-pill-green">Verified intake</span>
                  <p>As solicitações são filtradas para garantir clareza antes de chegar à sua equipe.</p>
                </li>
                <li>
                  <span className="client-pill client-pill-blue">Operational guardrails</span>
                  <p>Prazos, entregáveis e lógica de pagamento são explícitos desde o primeiro dia.</p>
                </li>
                <li>
                  <span className="client-pill client-pill-amber">Evidence‑based closure</span>
                  <p>Liberações dependem de provas documentadas – não de impressões vagas de satisfação.</p>
                </li>
              </ul>
            </aside>
          </div>
        </section>
      </main>

      <footer className="client-home-footer">
        <div className="client-home-footer-inner">
          <div>
            <strong>Acode Aqui</strong>
            <p>© {new Date().getFullYear()} Acode Aqui. Todos os direitos reservados.</p>
          </div>
          <nav aria-label="Rodapé">
            <Link to="/users">Encontrar profissional</Link>
            <a href="#how-it-works">Como funciona</a>
            <Link to="/become-pro">Oferecer serviços</Link>
            <Link to="/legal/terms">Termos de uso</Link>
            <Link to="/legal/privacy">Política de privacidade</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
