import { useRouter } from 'expo-router';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const logoSymbol = require('@/assets/images/logo-symbol.png');

const BRAND = '#3973E1';

export default function PrivacyScreen() {
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
            <Ionicons name="shield-checkmark" size={28} color="#fff" />
          </View>
          <Text style={styles.pageTitle}>Política de Privacidade</Text>
          <Text style={styles.pageSubtitle}>Última atualização: {new Date().toLocaleDateString('pt-PT')}</Text>
        </View>

        {/* Notice */}
        <View style={styles.noticeBox}>
          <Ionicons name="lock-closed" size={20} color="#1e40af" style={{ marginTop: 2 }} />
          <Text style={styles.noticeText}>
            Esta Política explica como a Melhor Saúde recolhe, utiliza e protege os seus dados, em conformidade com a <Text style={{ fontWeight: '700' }}>Lei n.º 23/2021</Text> de Moçambique.
          </Text>
        </View>

        <Section title="1. Enquadramento Legal">
          <Item><Bold>Lei n.º 23/2021</Bold> — Lei de Proteção de Dados Pessoais de Moçambique</Item>
          <Item><Bold>Constituição da República</Bold> — Artigo 71 (Direito à Privacidade)</Item>
          <Item><Bold>RGPD</Bold> — Adotado como padrão de boas práticas internacionais</Item>
        </Section>

        <Section title="2. Dados que Recolhemos">
          <SubSection title="Dados que fornece diretamente">
            <Item>Nome, email e número de telefone</Item>
            <Item>Respostas de onboarding e preferências de bem-estar</Item>
            <Item>Histórico de sessões e avaliações</Item>
            <Item>Registos de humor e check-ins de bem-estar</Item>
          </SubSection>
          <SubSection title="PostHog (análise de utilização)">
            <Item>Páginas visitadas e funcionalidades utilizadas</Item>
            <Item>ID de utilizador ligado ao seu perfil</Item>
            <Item>Dados enviados para servidores PostHog (EUA/EU)</Item>
          </SubSection>
          <SubSection title="Sentry (monitorização de erros)">
            <Item>Erros e falhas da aplicação</Item>
            <Item>Gravações anonimizadas em 10% das sessões e 100% dos erros</Item>
            <Item>Texto e dados de formulários são sempre mascarados</Item>
            <Item>Dados enviados para servidores Sentry (EUA/EU)</Item>
          </SubSection>
        </Section>

        <Section title="3. Como Utilizamos os Dados">
          <Item>Prestar e personalizar os serviços de bem-estar</Item>
          <Item>Agendar sessões e gerir a sua conta</Item>
          <Item>Melhorar a Plataforma com base em padrões de utilização</Item>
          <Item>Identificar e corrigir problemas técnicos</Item>
          <Item>Cumprir obrigações legais em Moçambique</Item>
        </Section>

        <Section title="4. O Que Não Fazemos">
          <Item>Não vendemos os seus dados pessoais</Item>
          <Item>Não partilhamos dados de saúde com empregadores ou seguradoras</Item>
          <Item>Não utilizamos os seus dados para publicidade de terceiros</Item>
        </Section>

        <Section title="5. Os Seus Direitos">
          <Item><Bold>Acesso</Bold> — Solicitar cópia dos seus dados</Item>
          <Item><Bold>Retificação</Bold> — Corrigir dados imprecisos</Item>
          <Item><Bold>Apagamento</Bold> — Solicitar eliminação ("Direito a ser esquecido")</Item>
          <Item><Bold>Portabilidade</Bold> — Receber os dados em formato estruturado</Item>
          <Item><Bold>Oposição</Bold> — Opor-se a determinados tratamentos</Item>
        </Section>

        <Section title="6. Contactos">
          <Item>Privacidade: privacidade@melhorsaude.co.mz</Item>
          <Item>Suporte: suporte@melhorsaude.co.mz</Item>
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

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.subSection}>
      <Text style={styles.subSectionTitle}>{title}</Text>
      {children}
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
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  noticeText: { flex: 1, color: '#1e40af', fontSize: 13, lineHeight: 20 },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 16, fontWeight: '700', color: '#111',
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sectionBody: { gap: 6 },
  subSection: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    gap: 6,
  },
  subSectionTitle: { fontSize: 13, fontWeight: '700', color: '#374151', marginBottom: 4 },
  item: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  bullet: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: BRAND,
    marginTop: 7, flexShrink: 0,
  },
  itemText: { flex: 1, color: '#444', fontSize: 14, lineHeight: 22 },
  footer: { marginTop: 32, alignItems: 'center' },
  footerText: { fontSize: 12, color: '#aaa', textAlign: 'center' },
});
