import { useRouter } from 'expo-router';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const logoSymbol = require('@/assets/images/logo-symbol.png');

const BRAND = '#3973E1';

export default function TermsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={BRAND} />
        </TouchableOpacity>
        <View style={styles.headerLogo}>
          <Image source={logoSymbol} style={styles.logoImg} resizeMode="contain" />
          <Text style={styles.headerTitle}>Melhor Saúde</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Page title */}
        <View style={styles.titleBlock}>
          <View style={styles.iconCircle}>
            <Ionicons name="document-text" size={28} color="#fff" />
          </View>
          <Text style={styles.pageTitle}>Termos e Condições</Text>
          <Text style={styles.pageSubtitle}>Última atualização: 07/11/2025</Text>
        </View>

        {/* Notice */}
        <View style={styles.noticeBox}>
          <Ionicons name="warning" size={20} color="#92400e" style={{ marginTop: 2 }} />
          <Text style={styles.noticeText}>
            Estes Termos e Condições constituem um acordo legal vinculativo. Recomendamos que leia cuidadosamente todos os termos antes de utilizar os nossos serviços.
          </Text>
        </View>

        <Section title="1. Definições">
          <Item>
            <Bold>Plataforma:</Bold> Sistema integrado de bem-estar corporativo 'Melhor Saúde', incluindo todas as funcionalidades, aplicações móveis e serviços de saúde mental, física, jurídica e financeira.
          </Item>
          <Item>
            <Bold>Utilizador:</Bold> Qualquer pessoa que interaja com a Plataforma — colaboradores, prestadores de serviços, administradores ou representantes empresariais.
          </Item>
          <Item>
            <Bold>Sessões:</Bold> Consultas de psicologia, coaching, aconselhamento jurídico/financeiro ou saúde física disponibilizadas através da Plataforma.
          </Item>
        </Section>

        <Section title="2. Aceitação dos Termos">
          <Item>Ao aceder, registar-se ou utilizar a Plataforma, declara ter lido e aceite integralmente estes Termos.</Item>
          <Item>Se não concordar com qualquer disposição, deve cessar imediatamente a utilização.</Item>
          <Item>A empresa pode alterar estes termos a qualquer momento, com aviso prévio de 30 dias.</Item>
        </Section>

        <Section title="3. Serviços">
          <Item>Plataforma de agendamento de sessões de bem-estar</Item>
          <Item>Portal de recursos educativos</Item>
          <Item>Sistema de gestão de utilizadores e empresas</Item>
          <Item>Suporte técnico e cliente</Item>
        </Section>

        <Section title="4. Registo e Contas">
          <Item>São necessários dados pessoais completos e verídicos</Item>
          <Item>Idade mínima: 18 anos (ou consentimento dos responsáveis legais)</Item>
          <Item>O utilizador é responsável pela confidencialidade das credenciais</Item>
          <Item>Não é permitida a partilha de contas</Item>
        </Section>

        <Section title="5. Serviços de Saúde">
          <View style={styles.warningBox}>
            <Ionicons name="alert-circle" size={18} color="#991b1b" style={{ marginTop: 2, flexShrink: 0 }} />
            <Text style={styles.warningText}>
              A Plataforma NÃO substitui cuidados médicos de emergência nem oferece diagnósticos. Em emergências, contacte o 112.
            </Text>
          </View>
          <Item>Todos os profissionais são licenciados conforme legislação moçambicana</Item>
          <Item>Consultas e sessões são confidenciais</Item>
        </Section>

        <Section title="6. Recolha de Dados">
          <Item>Utilizamos <Bold>PostHog</Bold> para análise de utilização (eventos de navegação, identificação do utilizador)</Item>
          <Item>Utilizamos <Bold>Sentry</Bold> para monitorização de erros (gravações anonimizadas em 10% das sessões, texto e formulários sempre mascarados)</Item>
          <Item>Os seus dados de saúde nunca são vendidos nem partilhados com empregadores</Item>
        </Section>

        <Section title="7. Conduta Proibida">
          <Item>Utilização para fins ilegais ou não autorizados</Item>
          <Item>Tentativas de acesso não autorizado a sistemas ou dados</Item>
          <Item>Uso de robots ou métodos automatizados</Item>
          <Item>Violação de direitos de propriedade intelectual</Item>
        </Section>

        <Section title="8. Pagamentos">
          <Item>Método disponível: transferência bancária</Item>
          <Item>Os pagamentos são confirmados em 2–3 dias úteis</Item>
        </Section>

        <Section title="9. Responsabilidade">
          <Item>A Plataforma é fornecida "tal como está", sem garantias expressas</Item>
          <Item>A responsabilidade está limitada ao valor pago nos últimos 12 meses</Item>
          <Item>Não nos responsabilizamos por falhas de terceiros ou força maior</Item>
        </Section>

        <Section title="10. Lei Aplicável">
          <Item>Lei de Moçambique, incluindo a Lei n.º 23/2021 (Proteção de Dados)</Item>
          <Item>Jurisdição dos tribunais de Moçambique</Item>
          <Item>Resolução alternativa: Centro de Arbitragem de Maputo</Item>
        </Section>

        <Section title="11. Contactos">
          <Item>Suporte: suporte@melhorsaude.co.mz</Item>
          <Item>Privacidade: privacidade@melhorsaude.co.mz</Item>
        </Section>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© {new Date().getFullYear()} Melhor Saúde Limitada. Todos os direitos reservados.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.item}>
      <View style={styles.bullet} />
      <Text style={styles.itemText}>{children}</Text>
    </View>
  );
}

function Bold({ children }: { children: React.ReactNode }) {
  return <Text style={{ fontWeight: '700' }}>{children}</Text>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  backBtn: { width: 40, alignItems: 'flex-start' },
  headerLogo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoImg: { width: 28, height: 28 },
  headerTitle: { fontSize: 15, fontWeight: '700', color: '#111' },
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  titleBlock: { alignItems: 'center', paddingVertical: 28, gap: 8 },
  iconCircle: {
    width: 56, height: 56,
    borderRadius: 16,
    backgroundColor: BRAND,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: BRAND,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  pageTitle: { fontSize: 26, fontWeight: '800', color: '#111', textAlign: 'center' },
  pageSubtitle: { fontSize: 14, color: '#888' },
  noticeBox: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#fffbeb',
    borderWidth: 1,
    borderColor: '#fde68a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  noticeText: { flex: 1, color: '#92400e', fontSize: 13, lineHeight: 20 },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 16, fontWeight: '700', color: '#111',
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sectionBody: { gap: 6 },
  item: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  bullet: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: BRAND,
    marginTop: 7, flexShrink: 0,
  },
  itemText: { flex: 1, color: '#444', fontSize: 14, lineHeight: 22 },
  warningBox: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  warningText: { flex: 1, color: '#991b1b', fontSize: 13, lineHeight: 20 },
  footer: { marginTop: 32, alignItems: 'center' },
  footerText: { fontSize: 12, color: '#aaa', textAlign: 'center' },
});
