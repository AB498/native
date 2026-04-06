import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../theme/appTheme';

export default function PlaceholderScreen({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { colors } = useAppTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.backgroundAlt }]}>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.textMuted }]}>{description}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eff6ff',
    padding: 16,
  },
  card: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 24,
    shadowColor: '#94a3b8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
    justifyContent: 'center',
  },
  title: {
    color: '#1f2937',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '800',
    marginBottom: 10,
  },
  description: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
  },
});
