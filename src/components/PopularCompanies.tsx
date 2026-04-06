import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import {MOCK_COMPANIES} from '../data/mockLandingData';
import ShimmerPlaceholder from './ShimmerPlaceholder';
import {useAppTheme} from '../theme/appTheme';
import {CompanyCard} from '../types/landing';

const NEXT_ICON_URI =
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_2_630.png';

export default function PopularCompanies({
  companies = MOCK_COMPANIES,
  isLoading = false,
}: {
  companies?: CompanyCard[];
  isLoading?: boolean;
}) {
  const {width} = useWindowDimensions();
  const {colors} = useAppTheme();
  const isSm = width >= 640;
  const isLg = width >= 1024;
  const cardWidth = isLg ? '23.5%' : isSm ? '48%' : '100%';
  const loadingCount = isLg ? 8 : isSm ? 4 : 3;

  return (
    <View style={[styles.section, {backgroundColor: colors.surface}]}>
      <View style={styles.headerRow}>
        <View style={[styles.headerPill, {backgroundColor: colors.primarySoft}]}>
          <Text style={[styles.headerText, {color: colors.text}]}>Popular Companies</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {isLoading
          ? Array.from({length: loadingCount}, (_, index) => (
          <View
            key={`company-skeleton-${index}`}
            style={[styles.card, {width: cardWidth, backgroundColor: colors.surface, borderColor: colors.border}]}>
            <ShimmerPlaceholder style={[styles.logoSkeleton, {backgroundColor: colors.primarySoft}]} />
            <View style={styles.textWrap}>
              <ShimmerPlaceholder style={[styles.nameSkeleton, {backgroundColor: colors.primarySoft}]} />
              <ShimmerPlaceholder style={[styles.jobsSkeleton, {backgroundColor: colors.primarySoft}]} />
            </View>
          </View>
            ))
          : companies.map(company => (
          <View
            key={company.id}
            style={[styles.card, {width: cardWidth, backgroundColor: colors.surface, borderColor: colors.border}]}>
            <Image source={{uri: company.img}} style={styles.logo} resizeMode="cover" />

            <View style={styles.textWrap}>
              <Text style={[styles.companyName, {color: colors.text}]}>{company.name}</Text>
              <Text style={[styles.companyJobs, {color: colors.textSoft}]}>{company.jobs}</Text>
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
    maxWidth: 1280,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 32,
    borderRadius: 8,
    alignSelf: 'center',
  },
  headerRow: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerPill: {
    borderRadius: 999,
    backgroundColor: '#eff6ff',
    paddingHorizontal: 32,
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
    rowGap: 24,
  },
  card: {
    width: '100%',
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
  logo: {
    width: 56,
    height: 56,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginRight: 16,
  },
  logoSkeleton: {
    width: 56,
    height: 56,
    borderRadius: 999,
    marginRight: 16,
  },
  textWrap: {
    flex: 1,
    justifyContent: 'center',
    rowGap: 6,
  },
  nameSkeleton: {
    width: '72%',
    height: 16,
    borderRadius: 6,
  },
  jobsSkeleton: {
    width: '46%',
    height: 14,
    borderRadius: 6,
  },
  companyName: {
    color: '#374151',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
  companyJobs: {
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
    width: 56,
    height: 40,
    borderRadius: 8,
  },
  arrowButton: {
    width: 56,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#60a5fa',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
});
