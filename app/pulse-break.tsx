import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { PulseBreakFlow } from '@/components/PulseBreakFlow';

export default function PulseBreakScreen() {
  const { session_id, intervention_type } = useLocalSearchParams<{
    session_id: string;
    intervention_type: string;
  }>();
  const router = useRouter();

  if (!session_id || !intervention_type) {
    router.replace('/(tabs)/');
    return null;
  }

  return (
    <View style={styles.container}>
      <PulseBreakFlow
        sessionId={session_id}
        interventionType={intervention_type}
        onComplete={() => router.replace('/(tabs)/')}
        onSkip={() => router.replace('/(tabs)/')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
