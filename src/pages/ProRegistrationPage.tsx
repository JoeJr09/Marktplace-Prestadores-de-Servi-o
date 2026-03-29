import { Link } from 'react-router-dom'

export function ProRegistrationPage() {
  return (
    <div className="pro-enterprise-page">
      <header className="client-home-topbar pro-enterprise-topbar">
        <div className="client-home-topbar-inner">
          <Link to="/" className="client-home-brand">
            <span className="client-home-mark" />
            <div>
              <strong>Acode Aqui</strong>
              <span>Soluções para força de trabalho em arquitetura</span>
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
            <Link to="/register?persona=prestador" className="client-home-primary-btn">
              Solicitar acesso
            </Link>
          </div>
        </div>
      </header>

      <main className="pro-enterprise-main">
        <section className="pro-enterprise-hero">
          <div className="pro-enterprise-hero-grid">
            <div className="pro-enterprise-hero-copy">
              <span className="pro-enterprise-kicker">Escale sua capacidade</span>
              <h1>
                Força de trabalho em arquitetura
                <span> para operadores sérios.</span>
              </h1>
              <p>
                Padronize como você capta, ativa e liquida trabalho em toda uma rede de profissionais – com
                governança embutida.
              </p>
              <div className="pro-enterprise-hero-actions">
                <Link
                  to="/register?persona=prestador"
                  className="pro-enterprise-btn pro-enterprise-btn-primary"
                >
                  Cadastrar sua empresa
                </Link>
                <Link to="/login?persona=prestador" className="pro-enterprise-btn pro-enterprise-btn-ghost">
                  Ver oportunidades
                </Link>
              </div>
              <div className="pro-enterprise-hero-meta">
                <span>Feito para agências, times de facilities e operadores de infraestrutura.</span>
              </div>
            </div>

            <aside className="pro-enterprise-tenders" aria-label="Active tenders">
              <header>
                <span>Superfície de demanda em tempo real</span>
                <strong>Chamadas ativas</strong>
              </header>
              <ul>
                <li>
                  <div>
                    <span className="client-pill client-pill-amber">Urgent</span>
                    <strong>Auditoria de infraestrutura urbana</strong>
                    <small>Multi‑site, 18 locais • janela de 30 dias</small>
                  </div>
                  <span>Encerra em 04d</span>
                </li>
                <li>
                  <div>
                    <span className="client-pill client-pill-blue">Open</span>
                    <strong>Gestão logística de frota</strong>
                    <small>Operações de longo prazo • cobertura nacional</small>
                  </div>
                  <span>Entrada contínua</span>
                </li>
                <li>
                  <div>
                    <span className="client-pill client-pill-green">Preferred</span>
                    <strong>Malha de cibersegurança para facilities</strong>
                    <small>Time multidisciplinar • validação técnica obrigatória</small>
                  </div>
                  <span>Pré‑selecionado</span>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="pro-enterprise-overview">
          <div className="pro-enterprise-overview-main">
            <span className="pro-enterprise-kicker">Dashboard avançado</span>
            <h2>Centro de comando para operações em escala.</h2>
            <p>
              Da entrada à liquidação, cada atendimento vira uma unidade de trabalho rastreável – com
              roteamento, aprovações e reconciliação embutidos no protocolo.
            </p>
            <button type="button" className="pro-enterprise-link-btn">
              Explorar capacidades do portal
            </button>
          </div>

          <div className="pro-enterprise-overview-grid">
            <article>
              <h3>Rede verificada</h3>
              <p>
                Verificação em múltiplas camadas para profissionais, incluindo identidade, evidências de
                portfólio e referências operacionais.
              </p>
              <ul>
                <li>Etiquetas de região e capacidade</li>
                <li>Cofre de conformidade e documentação</li>
                <li>Performance acompanhada por atendimento</li>
              </ul>
            </article>
            <article>
              <h3>Liquidação direta</h3>
              <p>
                Regras de custódia, critérios de liberação e estruturas de taxas são definidos uma vez e
                reutilizados em toda a operação.
              </p>
              <ul>
                <li>Marcos programáveis</li>
                <li>Fluxos de repasse consolidados</li>
                <li>Relatórios financeiros prontos para auditoria</li>
              </ul>
            </article>
            <article className="pro-enterprise-network">
              <h3>Camada de rede corporativa</h3>
              <p>
                Conecte times internos, parceiros externos e profissionais verificados em um único modelo
                operacional compartilhado.
              </p>
              <div className="pro-enterprise-network-media" aria-hidden="true">
                <span>Signal routing map</span>
              </div>
            </article>
          </div>
        </section>

        <section className="pro-enterprise-stats">
          <div className="pro-enterprise-stats-inner">
            <div className="pro-enterprise-stats-grid">
              <div>
                <strong>12k+</strong>
                <span>Profissionais ativos</span>
              </div>
              <div>
                <strong>R$ 4.2M</strong>
                <span>Volume em contratos</span>
              </div>
              <div>
                <strong>98%</strong>
                <span>Retenção de engajamentos</span>
              </div>
              <div>
                <strong>45</strong>
                <span>Setores industriais</span>
              </div>
            </div>
            <p>
              Não são métricas de vaidade – são o resultado de um sistema que trata cada engajamento como um
              fluxo desenhado.
            </p>
          </div>
        </section>

        <section id="onboarding" className="pro-enterprise-onboarding">
          <header className="pro-enterprise-onboarding-header">
            <span className="pro-enterprise-kicker">Protocolo de onboarding</span>
            <div>
              <h2>Do primeiro contato à operação plena.</h2>
              <p>
                Um processo claro e sequenciado para que seu time saiba exatamente o que é necessário para
                ativar a rede.
              </p>
            </div>
          </header>

          <div className="pro-enterprise-onboarding-grid">
            <aside className="pro-enterprise-onboarding-reqs" aria-label="Required documents">
              <h3>Documentos necessários</h3>
              <ul>
                <li>Documentação da pessoa jurídica</li>
                <li>Principais regiões e categorias de atuação</li>
                <li>Padrões de compliance e segurança</li>
                <li>Preferências de liquidação financeira</li>
              </ul>
            </aside>

            <ol className="pro-enterprise-steps">
              <li>
                <span className="step-label">Phase 01</span>
                <h3>Validação da entidade</h3>
                <p>
                  Valide estrutura jurídica, governança e contatos-chave para alinharmos os limites de
                  responsabilidade.
                </p>
              </li>
              <li>
                <span className="step-label">Phase 02</span>
                <h3>Calibração de serviços</h3>
                <p>
                  Mapeie suas categorias internas para a taxonomia do marketplace e defina as regras de
                  engajamento.
                </p>
              </li>
              <li>
                <span className="step-label">Phase 03</span>
                <h3>Ativação e rollout</h3>
                <p>
                  Faça um piloto com um conjunto controlado de regiões ou times antes de escalar para toda
                  a rede.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="pro-enterprise-final-cta">
          <div className="pro-enterprise-final-inner">
            <div>
              <span className="pro-enterprise-kicker">Pronto para construir</span>
              <h2>Pronto para arquitetar a próxima fase?</h2>
              <p>
                Conte como você opera hoje e nós mostramos como sua rede pode funcionar em cima da Acode
                Aqui.
              </p>
            </div>
            <div className="pro-enterprise-final-actions">
              <button type="button" className="pro-enterprise-btn pro-enterprise-btn-primary">
                Candidatar-se a parceria
              </button>
              <button type="button" className="pro-enterprise-btn pro-enterprise-btn-ghost">
                Falar com nosso time
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="client-home-footer pro-enterprise-footer">
        <div className="client-home-footer-inner">
          <div>
            <strong>Acode Aqui</strong>
            <p>© {new Date().getFullYear()} Acode Aqui. Todos os direitos reservados.</p>
          </div>
          <nav aria-label="Rodapé">
            <Link to="/users">Encontrar profissional</Link>
            <Link to="/#how-it-works">Como funciona</Link>
            <Link to="/become-pro">Oferecer serviços</Link>
            <Link to="/legal/terms">Termos de uso</Link>
            <Link to="/legal/privacy">Política de privacidade</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
