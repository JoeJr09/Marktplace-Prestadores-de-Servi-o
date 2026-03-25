import { Save } from 'lucide-react'
import { AppShell, Button, SelectField, Surface, TextField, ToggleRow } from '../components/ui'
import { settingsSections } from '../data/appData'

export function SettingsPage() {
  const [profileSection, preferencesSection] = settingsSections

  return (
    <AppShell
      eyebrow="Configurações"
      title="Preferências e dados da conta"
      description="Centralize ajustes de perfil, segurança e preferências operacionais sem perder consistência entre as telas."
      actions={
        <Button>
          <Save size={16} aria-hidden="true" />
          Salvar alterações
        </Button>
      }
      sidebarExtra={
        <Surface className="sidebar-card" as="div">
          <p>Perfil completo</p>
          <strong>93%</strong>
          <span>Adicione sua biografia pública para finalizar as informações da conta.</span>
        </Surface>
      }
    >
      <section className="settings-grid">
        <Surface className="panel" as="form">
          <div className="panel-header">
            <div>
              <span className="section-kicker">Conta</span>
              <h2>{profileSection.title}</h2>
              <p>{profileSection.description}</p>
            </div>
          </div>

          <div className="form-grid">
            {profileSection.fields.map((field) => (
              <TextField
                key={field.label}
                label={field.label}
                type={field.type}
                defaultValue={field.defaultValue}
              />
            ))}

            <SelectField label="Plano atual" value="Profissional Plus" hint="Renovação em 12 de abril de 2026" />
            <TextField
              label="Biografia"
              as="textarea"
              rows={5}
              defaultValue="Especialistas em projetos e manutenção com atendimento ágil e comunicação clara."
            />
          </div>
        </Surface>

        <Surface className="panel" as="section">
          <div className="panel-header">
            <div>
              <span className="section-kicker">Operação</span>
              <h2>{preferencesSection.title}</h2>
              <p>{preferencesSection.description}</p>
            </div>
          </div>

          <div className="toggle-list">
            {preferencesSection.toggles.map((toggle) => (
              <ToggleRow key={toggle.label} {...toggle} />
            ))}
          </div>

          <Surface className="security-card" as="div">
            <span className="section-kicker">Segurança</span>
            <h3>Dispositivos conectados</h3>
            <p>Último acesso em Brasília, 25 de março de 2026 às 10:42.</p>
            <Button variant="secondary">Encerrar outras sessões</Button>
          </Surface>
        </Surface>
      </section>
    </AppShell>
  )
}
