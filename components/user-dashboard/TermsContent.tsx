// DISABLED: import from 'framer-motion';
import { FileText, AlertTriangle, Shield } from 'lucide-react';

export function TermsContent() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24 md:pb-8">
      {/* Header */}
      <div


        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="text-gray-900 text-3xl md:text-4xl font-serif">
          Termos e Condições
        </h1>
        <p className="text-gray-600">
          Última atualização: 07/11/2025
        </p>
      </div>

      {/* Important Notice */}
      <div



        className="bg-amber-50/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-amber-200/50"
      >
        <div className="flex gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-amber-900 mb-2">Nota Importante</h3>
            <p className="text-amber-800 text-sm md:text-base">
              Estes Termos e Condições constituem um acordo legal vinculativo. Recomendamos vivamente que leia cuidadosamente todos os termos antes de utilizar os nossos serviços.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div



        className="bg-white/60 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-white/20 space-y-8"
      >
        {/* Section 1 */}
        <Section title="1. Informações Gerais">
          <InfoItem label="Empresa Responsável" value="Melhor Saúde, Limitada" />
          <InfoItem label="Número de Identificação Fiscal" value="[A preencher]" />
          <InfoItem label="Registo Comercial" value="[A preencher]" />
          <InfoItem label="Capital Social" value="[Valor em Meticais - MZM]" />
          <InfoItem label="Sede" value="Moçambique" />
          <InfoItem label="Telefone" value="[+258] [A preencher]" />
          <InfoItem label="Email" value="contato@melhorsaude.co.mz" />
        </Section>

        {/* Section 2 */}
        <Section title="2. Definições">
          <Definition
            term="2.1 'Plataforma'"
            description="Refere-se ao sistema integrado de bem-estar corporativo 'Melhor Saúde', incluindo todas as funcionalidades, recursos, interfaces, aplicações móveis e serviços relacionados de saúde mental, física, jurídica e financeira, bem como toda a infraestrutura tecnológica associada."
          />
          <Definition
            term="2.2 'Utilizador'"
            description="Termo genérico que designa qualquer pessoa física que interage com a Plataforma, podendo assumir diferentes categorias:"
          >
            <ul className="list-disc list-inside space-y-1 mt-2 text-gray-600">
              <li><strong>Cliente/Colaborador:</strong> Funcionários de empresas parceiras que utilizam os serviços de bem-estar</li>
              <li><strong>Prestador de Serviços:</strong> Profissionais de saúde licenciados que fornecem consultas e terapias</li>
              <li><strong>Administrador:</strong> Pessoas autorizadas que gerem contas empresariais e utilizadores</li>
              <li><strong>Representante Empresarial:</strong> Pessoa responsável pela gestão da conta da empresa cliente</li>
            </ul>
          </Definition>
          <Definition
            term="2.3 'Sessões'"
            description="Qualquer interação estruturada de bem-estar disponibilizada através da Plataforma:"
          >
            <ul className="list-disc list-inside space-y-1 mt-2 text-gray-600">
              <li>Consultas de psicologia e terapia</li>
              <li>Sessões de coaching e mentoria</li>
              <li>Aconselhamento jurídico e financeiro</li>
              <li>Consultas de saúde física e bem-estar</li>
              <li>Sessões individuais ou em grupo</li>
            </ul>
          </Definition>
          <Definition
            term="2.4 'Dados Pessoais'"
            description="Qualquer informação relativa a uma pessoa singular identificada ou identificável, conforme definido na Lei de Proteção de Dados Pessoais de Moçambique (Lei n.º 23/2021) e no RGPD, incluindo mas não limitado a:"
          >
            <ul className="list-disc list-inside space-y-1 mt-2 text-gray-600">
              <li>Dados identificativos (nome, email, telefone)</li>
              <li>Dados de saúde e bem-estar</li>
              <li>Dados de utilização da Plataforma</li>
              <li>Dados técnicos e de navegação</li>
            </ul>
          </Definition>
          <Definition
            term="2.5 'Empresa Parceira'"
            description="Entidade jurídica que contrata os serviços da Plataforma para disponibilizar bem-estar aos seus colaboradores, assumindo responsabilidade pelos termos contratuais e pelos utilizadores sob sua gestão."
          />
          <Definition
            term="2.6 'Conteúdo'"
            description="Todos os materiais, recursos educativos, vídeos, textos, ferramentas interativas e qualquer informação disponibilizada através da Plataforma para fins de apoio ao bem-estar dos utilizadores."
          />
        </Section>

        {/* Section 3 */}
        <Section title="3. Aceitação dos Termos">
          <AlertBox>
            Ao aceder, registar-se ou utilizar a Plataforma, o Utilizador declara ter lido, compreendido e aceite integralmente estes Termos e Condições.
          </AlertBox>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4">
            <li>A utilização da Plataforma implica aceitação incondicional e integral dos presentes termos</li>
            <li>Se não concordar com qualquer disposição, deve cessar imediatamente a utilização</li>
            <li>A empresa reserva-se o direito de alterar estes termos a qualquer momento</li>
            <li>Alterações entrarão em vigor após publicação na Plataforma</li>
          </ul>
        </Section>

        {/* Section 4 */}
        <Section title="4. Descrição dos Serviços">
          <Subsection title="4.1 Serviços Principais">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Plataforma de agendamento de sessões</li>
              <li>Portal de bem-estar e recursos educativos</li>
              <li>Sistema de gestão de utilizadores e empresas</li>
              <li>Relatórios e analytics de utilização</li>
              <li>Suporte técnico e cliente</li>
            </ul>
          </Subsection>
          <Subsection title="4.2 Serviços de Terceiros">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Integração com prestadores de serviços externos</li>
              <li>Ferramentas de comunicação segura</li>
              <li>Plataformas de pagamento online</li>
              <li>Serviços de armazenamento em nuvem</li>
            </ul>
          </Subsection>
        </Section>

        {/* Section 5 */}
        <Section title="5. Registo e Contas de Utilizador">
          <Subsection title="5.1 Requisitos de Registo">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Dados pessoais completos e verídicos</li>
              <li>Endereço de email válido e funcional</li>
              <li>Senha segura conforme políticas de segurança</li>
              <li>Confirmação da idade mínima (18 anos ou com consentimento dos responsáveis legais)</li>
              <li>Aceitação explícita da Política de Privacidade</li>
            </ul>
          </Subsection>
          <Subsection title="5.2 Responsabilidades do Utilizador">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Manter a confidencialidade das credenciais de acesso</li>
              <li>Notificar imediatamente qualquer uso não autorizado</li>
              <li>Atualizar informações pessoais quando necessário</li>
              <li>Respeitar os códigos de conduta estabelecidos</li>
              <li>Não partilhar a conta com terceiros</li>
              <li>Utilizar a Plataforma de forma ética e responsável</li>
              <li>Cumprir com os compromissos assumidos nas sessões</li>
            </ul>
          </Subsection>
        </Section>

        {/* Section 6 */}
        <Section title="6. Serviços de Saúde e Médicos">
          <Subsection title="6.1 Natureza dos Serviços">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>A Plataforma fornece serviços de bem-estar e suporte não médicos de emergência</li>
              <li>Todos os profissionais são licenciados e qualificados conforme legislação moçambicana</li>
              <li>Os serviços abrangem saúde mental, física, assistência jurídica e financeira</li>
              <li>Consultas e sessões são confidenciais e sigilosas</li>
            </ul>
          </Subsection>
          <Subsection title="6.2 Limitações Médicas">
            <WarningBox>
              <ul className="list-disc list-inside space-y-2">
                <li>A Plataforma NÃO substitui cuidados médicos de emergência</li>
                <li>A Plataforma NÃO oferece diagnósticos médicos ou prescrições</li>
                <li>Em emergências médicas, contacte 112 ou dirija-se a serviço médico</li>
                <li>Para questões médicas urgentes, consulte sempre um médico</li>
              </ul>
            </WarningBox>
          </Subsection>
        </Section>

        {/* Section 7 */}
        <Section title="7. Privacidade e Proteção de Dados">
          <Subsection title="7.1 Conformidade Legal">
            <p className="text-gray-600 mb-4">
              A Plataforma está em conformidade com a Lei de Proteção de Dados Pessoais de Moçambique (Lei n.º 23/2021), o Regulamento Geral sobre a Proteção de Dados (RGPD) da União Europeia e demais legislação aplicável em Moçambique.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Tratamento de dados com base legal clara</li>
              <li>Implementação de medidas técnicas e organizacionais adequadas</li>
              <li>Direitos dos titulares de dados totalmente respeitados</li>
              <li>Procedimentos de notificação de violações implementados</li>
            </ul>
          </Subsection>
          <Subsection title="7.2 Categorias de Dados">
            <div className="space-y-4">
              <DataCategory title="Dados Identificativos" items={['Nome completo', 'Email', 'Número de telefone']} />
              <DataCategory title="Dados de Saúde" items={['Informações de sessões', 'Avaliações de bem-estar', 'Histórico de consultas']} />
              <DataCategory title="Dados Técnicos" items={['Endereços IP', 'Cookies', 'Logs de acesso']} />
            </div>
          </Subsection>
          <Subsection title="7.3 Cookies e Tecnologia">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>A Plataforma utiliza cookies essenciais para funcionamento e análise</li>
              <li>Os utilizadores podem gerir preferências de cookies nas configurações</li>
              <li>Dados técnicos são recolhidos para melhorar a experiência e segurança</li>
              <li>Toda a tecnologia utilizada está em conformidade com as normas de segurança</li>
            </ul>
          </Subsection>
        </Section>

        {/* Section 8 */}
        <Section title="8. Conduta do Utilizador e Usos Proibidos">
          <Subsection title="8.1 Atividades Proibidas">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Utilização para fins ilegais ou não autorizados</li>
              <li>Transmissão de conteúdo ofensivo, difamatório ou inapropriado</li>
              <li>Tentativas de acesso não autorizado a sistemas ou dados</li>
              <li>Interferência com o funcionamento da Plataforma</li>
              <li>Uso de robots, spiders ou métodos automatizados</li>
              <li>Violação de direitos de propriedade intelectual</li>
              <li>Partilha de credenciais de acesso</li>
            </ul>
          </Subsection>
          <Subsection title="8.2 Consequências">
            <AlertBox>
              A violação destas disposições pode resultar em suspensão ou terminação imediata da conta, sem direito a qualquer tipo de compensação ou reembolso.
            </AlertBox>
          </Subsection>
        </Section>

        {/* Section 9 */}
        <Section title="9. Propriedade Intelectual">
          <Subsection title="9.1 Propriedade da Empresa">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Software e código fonte da Plataforma</li>
              <li>Design, interface e experiência do utilizador</li>
              <li>Marca, logótipo e elementos visuais</li>
              <li>Conteúdo educativo e recursos</li>
              <li>Documentação técnica e manuais</li>
            </ul>
          </Subsection>
          <Subsection title="9.2 Limitações de Uso">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Proibição de cópia, modificação ou distribuição</li>
              <li>Não é permitida engenharia reversa</li>
              <li>Reservado o direito de propriedade exclusiva</li>
              <li>Sanções por violação de direitos</li>
            </ul>
          </Subsection>
        </Section>

        {/* Section 10 */}
        <Section title="10. Termos de Pagamento">
          <Subsection title="10.1 Métodos de Pagamento">
            <p className="text-gray-700 mb-3">Método de Pagamento Atualmente Disponível:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
              <li>Transferência bancária</li>
            </ul>
            <p className="text-gray-600 mb-2"><strong>Processamento de Pagamentos:</strong></p>
            <p className="text-gray-600 mb-4">
              Os pagamentos são processados após confirmação bancária e podem demorar até 2-3 dias úteis.
            </p>
            <p className="text-gray-600 text-sm italic">
              Outros métodos de pagamento serão adicionados futuramente conforme disponibilidade.
            </p>
          </Subsection>
          <Subsection title="10.2 Política de Reembolsos">
            <div className="space-y-3">
              <RefundPolicy
                title="Cancelamentos Até 24h"
                description="Reembolso integral, sem penalizações"
                color="green"
              />
              <RefundPolicy
                title="Cancelamentos 24-48h"
                description="Reembolso de 50% do valor pago"
                color="amber"
              />
              <RefundPolicy
                title="Cancelamentos Após 48h"
                description="Sem direito a reembolso, salvo casos excecionais"
                color="red"
              />
            </div>
          </Subsection>
        </Section>

        {/* Section 11 */}
        <Section title="11. Responsabilidade e Isenções">
          <Subsection title="11.1 Limitações de Responsabilidade">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>A Plataforma é fornecida "tal como está", sem garantias expressas ou implícitas</li>
              <li>Não nos responsabilizamos por danos indiretos, consequenciais ou lucros cessantes</li>
              <li>A responsabilidade está limitada ao valor efetivamente pago pelos serviços nos últimos 12 meses</li>
              <li>Exclusão de responsabilidade por falhas de terceiros, força maior ou mau uso da Plataforma</li>
              <li>A empresa reserva-se o direito de modificar ou descontinuar serviços com aviso prévio</li>
            </ul>
          </Subsection>
          <Subsection title="11.2 Avisos Importantes">
            <WarningBox>
              <p className="mb-2"><strong>Aviso Médico:</strong> A Plataforma não substitui cuidados médicos profissionais de emergência. Em caso de emergência médica, contacte imediatamente os serviços de emergência (112) ou dirija-se ao serviço médico mais próximo.</p>
              <p><strong>Aviso Técnico:</strong> Embora nos esforcemos por manter a Plataforma sempre operacional, não garantimos disponibilidade ininterrupta.</p>
            </WarningBox>
          </Subsection>
        </Section>

        {/* Section 12 */}
        <Section title="12. Rescisão">
          <Subsection title="12.1 Rescisão pelo Utilizador">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Pode ser efetuada a qualquer momento</li>
              <li>Notificação prévia de 30 dias recomendada</li>
              <li>Acesso aos dados mantido por período transitório</li>
              <li>Direitos já adquiridos respeitados</li>
            </ul>
          </Subsection>
          <Subsection title="12.2 Rescisão pela Empresa">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Por violação dos termos e condições</li>
              <li>Por inatividade prolongada (6+ meses)</li>
              <li>Por razões de segurança ou legal</li>
              <li>Com aviso prévio de 30 dias quando possível</li>
            </ul>
          </Subsection>
        </Section>

        {/* Section 13 */}
        <Section title="13. Força Maior">
          <p className="text-gray-600 mb-4">
            Não nos responsabilizamos por incapacidade ou atraso no cumprimento das obrigações devido a circunstâncias extraordinárias fora do nosso controle, incluindo mas não limitado a:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Desastres naturais, pandemias, epidemias</li>
            <li>Guerras, distúrbios civis, atos terroristas</li>
            <li>Greves, lockouts, problemas laborais</li>
            <li>Falhas de infraestrutura, cortes de energia</li>
            <li>Alterações na legislação aplicável</li>
          </ul>
        </Section>

        {/* Section 14 */}
        <Section title="14. Lei Aplicável e Resolução de Conflitos">
          <Subsection title="14.1 Lei Aplicável">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Lei de Moçambique aplicável</li>
              <li>Jurisdição dos tribunais de Moçambique</li>
              <li>Lei de Proteção de Dados Pessoais de Moçambique (Lei n.º 23/2021)</li>
              <li>Lei do Consumidor de Moçambique e práticas comerciais</li>
              <li>Constituição da República de Moçambique</li>
            </ul>
          </Subsection>
          <Subsection title="14.2 Resolução Alternativa">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Arbitragem em Moçambique em caso de litígio</li>
              <li>Centro de Arbitragem de Maputo</li>
              <li>Direção Nacional do Consumidor (DNCON)</li>
              <li>Mediação prévia obrigatória</li>
              <li>Procedimento rápido para pequenos litígios</li>
            </ul>
          </Subsection>
        </Section>

        {/* Section 15 */}
        <Section title="15. Contactos e Reclamações">
          <Subsection title="15.1 Informações de Contacto">
            <div className="space-y-4">
              <ContactInfo
                title="Suporte Geral"
                items={[
                  { label: 'Email', value: 'suporte@melhorsaude.co.mz' },
                  { label: 'Telefone', value: '[+258] [A preencher]' }
                ]}
              />
              <ContactInfo
                title="Proteção de Dados"
                items={[
                  { label: 'Email', value: 'privacidade@melhorsaude.co.mz' },
                  { label: 'Encarregado de Proteção de Dados', value: '[A preencher]' }
                ]}
              />
            </div>
          </Subsection>
          <Subsection title="15.2 Direito de Reclamação">
            <p className="text-gray-600 mb-3">
              Os utilizadores têm direito a apresentar reclamações sobre o serviço ou tratamento de dados pessoais:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Autoridade Nacional de Proteção de Dados (ANPD) - Moçambique</li>
              <li>Direção Nacional do Consumidor (DNCON) - Moçambique</li>
              <li>Centro de Arbitragem de Maputo</li>
              <li>Provedor de Justiça de Moçambique</li>
            </ul>
          </Subsection>
        </Section>

        {/* Section 16 */}
        <Section title="16. Disposições Finais">
          <Subsection title="16.1 Integridade do Acordo">
            <p className="text-gray-600">
              Estes Termos e Condições constituem o acordo integral entre as partes e substituem todos os acordos anteriores relativos ao mesmo assunto.
            </p>
          </Subsection>
          <Subsection title="16.2 Modificações">
            <p className="text-gray-600">
              Qualquer modificação a estes termos será comunicada com antecedência mínima de 30 dias e publicada na Plataforma.
            </p>
          </Subsection>
          <Subsection title="16.3 Divisibilidade">
            <p className="text-gray-600">
              Se alguma disposição destes termos for considerada inválida ou inaplicável, as demais disposições permanecerão em pleno vigor.
            </p>
          </Subsection>
          <Subsection title="16.4 Versão e Data">
            <div className="space-y-1 text-gray-600">
              <p><strong>Versão:</strong> 1.0</p>
              <p><strong>Data de entrada em vigor:</strong> 07/11/2025</p>
            </div>
          </Subsection>
        </Section>

        {/* Declaration */}
        <div className="border-t-2 border-gray-200 pt-6">
          <div className="bg-blue-50/80 backdrop-blur-md rounded-xl p-6 border border-blue-200/50">
            <div className="flex gap-4">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-blue-900 mb-2">Declaração de Aceitação</h3>
                <p className="text-blue-800 text-sm md:text-base">
                  Ao utilizar a Plataforma, declaro ter lido, compreendido e aceite integralmente todos os termos e condições expostos neste documento.
                </p>
                <p className="text-blue-700 text-sm mt-3 italic">
                  Este documento está disponível para consulta permanente na secção "Termos e Condições" da Plataforma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-gray-900 text-xl md:text-2xl pb-2 border-b-2 border-gray-200">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-gray-800 md:text-lg">{title}</h3>
      {children}
    </div>
  );
}

function Definition({ term, description, children }: { term: string; description: string; children?: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="text-gray-800">{term}</h4>
      <p className="text-gray-600">{description}</p>
      {children}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm md:text-base">
      <span className="text-gray-700 min-w-[200px]">{label}:</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}

function AlertBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50/80 backdrop-blur-md rounded-xl p-4 border border-amber-200/50">
      <p className="text-amber-900">{children}</p>
    </div>
  );
}

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red-50/80 backdrop-blur-md rounded-xl p-4 border border-red-200/50">
      <div className="text-red-900 space-y-2">{children}</div>
    </div>
  );
}

function DataCategory({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-gray-50/80 rounded-lg p-4 border border-gray-200/50">
      <h5 className="text-gray-800 mb-2">{title}</h5>
      <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function RefundPolicy({ title, description, color }: { title: string; description: string; color: 'green' | 'amber' | 'red' }) {
  const colorClasses = {
    green: 'bg-green-50/80 border-green-200/50 text-green-900',
    amber: 'bg-amber-50/80 border-amber-200/50 text-amber-900',
    red: 'bg-red-50/80 border-red-200/50 text-red-900'
  };

  return (
    <div className={`rounded-lg p-4 border ${colorClasses[color]}`}>
      <p className="mb-1">{title}</p>
      <p className="text-sm">{description}</p>
    </div>
  );
}

function ContactInfo({ title, items }: { title: string; items: { label: string; value: string }[] }) {
  return (
    <div className="bg-gray-50/80 rounded-lg p-4 border border-gray-200/50">
      <h5 className="text-gray-800 mb-3">{title}</h5>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="text-sm">
            <span className="text-gray-700">{item.label}: </span>
            <span className="text-gray-600">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
