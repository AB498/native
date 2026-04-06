import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import {MOCK_INDUSTRIES} from '../data/mockLandingData';
import ShimmerPlaceholder from './ShimmerPlaceholder';
import {useAppTheme} from '../theme/appTheme';
import {IndustryCard} from '../types/landing';

const NEXT_ICON_URI =
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_2_126.png';

export default function PopularIndustries({
  industries = MOCK_INDUSTRIES,
  isLoading = false,
}: {
  industries?: IndustryCard[];
  isLoading?: boolean;
}) {
  const {width} = useWindowDimensions();
  const {colors} = useAppTheme();
  const isSm = width >= 640;
  const isLg = width >= 1024;
  const cardWidth = isLg ? '24%' : isSm ? '48.5%' : '100%';
  const loadingCount = isLg ? 8 : isSm ? 4 : 3;

  return (
    <View style={[styles.section, {backgroundColor: colors.surface}]}>
      <View style={styles.headerRow}>
        <View style={[styles.headerPill, {backgroundColor: colors.primarySoft}]}>
          <Text style={[styles.headerText, {color: colors.text}]}>Popular Industries</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {isLoading
          ? Array.from({length: loadingCount}, (_, index) => (
          <View
            key={`industry-skeleton-${index}`}
            style={[
              styles.card,
              {width: cardWidth, backgroundColor: colors.surface, borderColor: colors.border},
            ]}>
            <ShimmerPlaceholder style={[styles.iconSkeleton, {backgroundColor: colors.primarySoft}]} />
            <View style={styles.cardTextWrap}>
              <ShimmerPlaceholder style={[styles.titleSkeleton, {backgroundColor: colors.primarySoft}]} />
              <ShimmerPlaceholder style={[styles.subtitleSkeleton, {backgroundColor: colors.primarySoft}]} />
            </View>
          </View>
            ))
          : industries.map(item => (
          <View
            key={item.id}
            style={[
              styles.card,
              {width: cardWidth, backgroundColor: colors.surface, borderColor: colors.border},
            ]}>
            <View style={styles.iconWrap}>
              <Image source={{uri: item.icon}} style={styles.icon} resizeMode="cover" />
            </View>

            <View style={styles.cardTextWrap}>
              <Text numberOfLines={1} style={[styles.cardTitle, {color: colors.text}]}>
                {item.name}
              </Text>
              <Text style={[styles.cardSubtitle, {color: colors.textSoft}]}>{item.jobs}</Text>
            </View>
          </View>
            ))}
      </View>

      <View style={styles.footerRow}>
        {isLoading ? (
          <ShimmerPlaceholder style={[styles.arrowSkeleton, {backgroundColor: colors.primarySoft}]} />
        ) : (
          <TouchableOpacity activeOpacity={0.85} style={[styles.arrowButton, {backgroundColor: colors.surface, borderColor: colors.primary}]}>
            <Image source={{uri: NEXT_ICON_URI}} style={styles.arrowIcon} resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    maxWidth: 1504,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  headerRow: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerPill: {
    borderRadius: 999,
    backgroundColor: '#eff6ff',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  headerText: {
    color: '#374151',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
  },
  grid: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    columnGap: 16,
    rowGap: 16,
  },
  card: {
    width: '100%',
    minHeight: 80,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    overflow: 'hidden',
    flexShrink: 0,
    marginRight: 12,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  iconSkeleton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    marginRight: 12,
    flexShrink: 0,
  },
  cardTextWrap: {
    flex: 1,
    rowGap: 6,
  },
  titleSkeleton: {
    width: '74%',
    height: 16,
    borderRadius: 6,
  },
  subtitleSkeleton: {
    width: '46%',
    height: 14,
    borderRadius: 6,
  },
  cardTitle: {
    color: '#374151',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
  cardSubtitle: {
    color: '#6b7280',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  footerRow: {
    alignItems: 'center',
    marginTop: 32,
  },
  arrowSkeleton: {
    width: 58,
    height: 38,
    borderRadius: 8,
  },
  arrowButton: {
    width: 58,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#60a5fa',
    backgroundColor: '#ffffff',
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
});
