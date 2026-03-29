import { Link } from 'react-router-dom'

export function HelpCenterPage() {
  return (
    <div className="help-center-page">
      <header className="client-home-topbar help-center-topbar">
        <div className="client-home-topbar-inner">
          <Link to="/" className="client-home-brand">
            <span className="client-home-mark" />
            <div>
              <strong>Acode Aqui</strong>
              <span>Suporte para cada blueprint</span>
            </div>
          </Link>

          <nav className="client-home-nav" aria-label="Navegação principal">
            <Link to="/users">Encontrar profissional</Link>
            <a href="/">Como funciona</a>
            <Link to="/become-pro">Oferecer serviços</Link>
            <span className="help-center-nav-current">Central de ajuda</span>
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

      <main className="help-center-main">
        <section className="help-center-hero">
          <div className="help-center-hero-copy">
            <span className="help-center-kicker">Central de ajuda</span>
            <h1>Onde cada dúvida recebe suporte estrutural.</h1>
            <p>
              Busque na base de conhecimento, revise guias operacionais e fale com nosso time quando seu
              blueprint precisar de um humano.
            </p>
            <form
              className="help-center-search"
              role="search"
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <input
                type="search"
                placeholder="Busque por tópico, palavra‑chave ou protocolo"
                aria-label="Buscar artigos de ajuda"
              />
              <button type="submit">Buscar</button>
            </form>
            <div className="help-center-quick-tags" aria-label="Popular topics">
              <button type="button">Conta e acesso</button>
              <button type="button">Pagamentos e custódia</button>
              <button type="button">Segurança e compliance</button>
            </div>
          </div>
        </section>

        <section className="help-center-layout">
          <aside className="help-center-sidebar" aria-label="Knowledge index">
            <div className="help-center-index">
              <h2>Índice de conhecimento</h2>
              <ol>
                <li>
                  <a href="#account">Conta e acesso</a>
                </li>
                <li>
                  <a href="#payments">Pagamentos e custódia</a>
                </li>
                <li>
                  <a href="#safety">Segurança e verificação</a>
                </li>
                <li>
                  <a href="#operations">Protocolo operacional</a>
                </li>
              </ol>
            </div>

            <div className="help-center-support-card">
              <span className="help-center-support-label">Precisa falar com alguém?</span>
              <h3>Suporte arquitetônico em tempo real.</h3>
              <p>
                Nosso time está disponível para questões de alto impacto em que uma conversa rápida é
                melhor do que um artigo longo.
              </p>
              <button type="button">Abrir chamado de suporte</button>
              <button type="button" className="secondary">
                Iniciar chat ao vivo
              </button>
            </div>
          </aside>

          <div className="help-center-content">
            <section id="account" className="help-center-category">
              <header>
                <h2>Conta e acesso</h2>
                <p>Identidade, login e configuração de perfil.</p>
              </header>
              <div className="help-center-cards">
                <article>
                  <h3>Verifique seu perfil profissional</h3>
                  <p>
                    Saiba como enviar documentos, certificações e evidências de portfólio para que os clientes
                    confiem em cada engajamento desde o primeiro dia.
                  </p>
                </article>
                <article>
                  <h3>Opções de login seguro</h3>
                  <p>
                    Ative autenticação em múltiplos fatores e alertas de sessão para manter sua superfície
                    operacional protegida.
                  </p>
                </article>
              </div>
            </section>

            <section id="payments" className="help-center-category">
              <header>
                <h2>Pagamentos e custódia</h2>
                <p>Como os valores se movem da intenção do cliente até a liquidação verificada.</p>
              </header>
              <div className="help-center-cards">
                <article>
                  <h3>Como funciona a custódia na Acode Aqui</h3>
                  <p>
                    Entenda como os valores são reservados, quando são liberados e como disputas são tratadas
                    sem achismos.
                  </p>
                </article>
                <article>
                  <h3>Atualizando dados de recebimento</h3>
                  <p>
                    Mantenha seus dados bancários atualizados para que o trabalho concluído seja liquidado sem
                    atrito.
                  </p>
                </article>
              </div>
            </section>

            <section id="safety" className="help-center-category">
              <header>
                <h2>Segurança e verificação</h2>
                <p>Protocolos que mantêm os dois lados estruturalmente protegidos.</p>
              </header>
              <div className="help-center-cards">
                <article>
                  <h3>Revisões de segurança por projeto</h3>
                  <p>
                    Veja como funcionam checagens de risco, documentação e aprovações antes de um projeto
                    entrar em execução.
                  </p>
                </article>
                <article>
                  <h3>Reportando uma preocupação</h3>
                  <p>
                    Use nossos canais de incidentes para sinalizar comportamentos que não atendem ao padrão da
                    plataforma.
                  </p>
                </article>
              </div>
            </section>

            <section id="operations" className="help-center-faq">
              <header>
                <h2>Perguntas frequentes</h2>
                <p>Detalhes operacionais que surgem no dia a dia.</p>
              </header>
              <ul>
                <li>
                  <h3>Como funcionam os marcos em projetos complexos?</h3>
                  <p>
                    Você pode definir vários pontos de verificação com seus próprios entregáveis, datas e
                    regras de liberação. Os valores permanecem em custódia até que cada marco seja verificado.
                  </p>
                </li>
                <li>
                  <h3>Clientes podem trabalhar novamente com o mesmo profissional?</h3>
                  <p>
                    Sim. Use as ferramentas de reengajamento em projetos concluídos para convidar o mesmo time
                    com um novo escopo e orçamento atualizado.
                  </p>
                </li>
                <li>
                  <h3>O que acontece se alguém perder um prazo?</h3>
                  <p>
                    A plataforma evidencia atrasos, pausa os fluxos de pagamento e ajuda as duas partes a
                    renegociar o escopo antes de qualquer liberação.
                  </p>
                </li>
              </ul>
            </section>

            <section className="help-center-resources">
              <header>
                <h2>Recursos técnicos</h2>
                <p>Blueprints para times que querem ir mais fundo.</p>
              </header>
              <div className="help-center-resources-grid">
                <article>
                  <h3>Visão geral do protocolo operacional</h3>
                  <p>Um diagrama de alto nível de como solicitações, profissionais e pagamentos circulam.</p>
                </article>
                <article>
                  <h3>Resumo de segurança e compliance</h3>
                  <p>Entenda como dados, credenciais e valores são protegidos de ponta a ponta.</p>
                </article>
                <article>
                  <h3>Guia de cobrança e faturamento</h3>
                  <p>Alinhe seus sistemas internos com nosso cronograma de repasses e formato de relatórios.</p>
                </article>
              </div>
            </section>
          </div>
        </section>
      </main>

      <footer className="client-home-footer help-center-footer">
        <div className="client-home-footer-inner">
          <div>
            <strong>Acode Aqui</strong>
            <p>© {new Date().getFullYear()} Acode Aqui. Todos os direitos reservados.</p>
          </div>
          <nav aria-label="Rodapé">
            <Link to="/users">Encontrar profissional</Link>
            <Link to="/become-pro">Oferecer serviços</Link>
            <Link to="/legal/terms">Termos de uso</Link>
            <Link to="/legal/privacy">Política de privacidade</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
