import { useState } from 'react';
import { View } from 'react-native';
import { RecursosPage } from '@/components/RecursosPage';
import { COLORS } from '@/lib/design-tokens';

export default function ResourcesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.BG }}>
      <RecursosPage onBack={() => {}} />
    </View>
  );
}
