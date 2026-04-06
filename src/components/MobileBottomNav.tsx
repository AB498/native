import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../theme/appTheme';

export type MobileNavItem = {
  key: string;
  label: string;
  icon: string;
  onPress: () => void;
  active?: boolean;
};

export default function MobileBottomNav({ items }: { items: MobileNavItem[] }) {
  const { isDarkMode, colors } = useAppTheme();

  return (
    <View style={[styles.wrap, { borderTopColor: colors.border, backgroundColor: colors.surface }]}>
      <View style={styles.inner}>
        {items.map(item => (
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.85}
            onPress={item.onPress}
            style={styles.item}>
            <Image
              source={{ uri: item.icon }}
              style={[styles.icon, isDarkMode && styles.iconDark, item.active && { tintColor: colors.primary }]}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.label,
                { color: colors.textSoft },
                item.active && styles.labelActive,
                item.active && { color: colors.primary },
              ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 10,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 4,
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconDark: {
    tintColor: '#cbd5e1',
  },
  label: {
    color: '#6b7280',
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
  },
  labelActive: {
    color: '#2563eb',
    fontWeight: '700',
  },
});
