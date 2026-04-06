import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {MOCK_JOBS} from '../data/mockLandingData';
import ShimmerPlaceholder from './ShimmerPlaceholder';
import {useAppTheme} from '../theme/appTheme';
import {JobCard} from '../types/landing';

const OVERSEAS_ICON_URI =
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_2_198.png';
const LOCATION_ICON_URI =
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_2_202.png';
const DEADLINE_ICON_URI =
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_2_208.png';

function WishlistStarIcon() {
  return (
    <View style={styles.wishlistIconWrap}>
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Path
          d="m12 3.8 2.46 4.99 5.5.8-3.98 3.88.94 5.48L12 16.37 7.08 18.95l.94-5.48L4.04 9.6l5.5-.8L12 3.8Z"
          stroke="#2563eb"
          strokeWidth={1.8}
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </View>
  );
}

export default function RecommendedJobs({
  jobs = MOCK_JOBS,
  isLoading = false,
}: {
  jobs?: JobCard[];
  isLoading?: boolean;
}) {
  const {width} = useWindowDimensions();
  const {colors} = useAppTheme();
  const isMd = width >= 768;
  const isLg = width >= 1024;
  const cardWidth = isLg ? '31.8%' : isMd ? '48.5%' : '100%';
  const loadingCount = isLg ? 6 : isMd ? 4 : 3;

  return (
    <View style={[styles.section, {backgroundColor: colors.recommendedJobsSection}]}>
      <View style={styles.headerRow}>
        <View style={[styles.headerPill, {backgroundColor: colors.recommendedJobsHeaderPill}]}>
          <Text style={[styles.headerText, {color: colors.text}]}>Recommended Jobs</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {isLoading
          ? Array.from({length: loadingCount}, (_, index) => (
          <View
            key={`recommended-skeleton-${index}`}
            style={[
              styles.card,
              {
                width: cardWidth,
                backgroundColor: colors.recommendedJobsCard,
                borderColor: colors.recommendedJobsCardBorder,
              },
            ]}>
            <View style={styles.titleRow}>
              <ShimmerPlaceholder style={[styles.jobTitleSkeleton, {backgroundColor: colors.recommendedJobsTagBackground}]} />
              <ShimmerPlaceholder style={[styles.iconSkeleton, {backgroundColor: colors.recommendedJobsTagBackground}]} />
            </View>
            <View style={styles.companyRow}>
              <ShimmerPlaceholder style={[styles.logoSkeleton, {backgroundColor: colors.recommendedJobsTagBackground}]} />
              <ShimmerPlaceholder style={[styles.companySkeleton, {backgroundColor: colors.recommendedJobsTagBackground}]} />
            </View>
            <View style={[styles.salaryBox, {backgroundColor: colors.recommendedJobsSalaryBox}]}>
              <ShimmerPlaceholder style={[styles.salarySkeleton, {backgroundColor: colors.recommendedJobsHeaderPill}]} />
              <ShimmerPlaceholder style={[styles.salarySkeletonShort, {backgroundColor: colors.recommendedJobsHeaderPill}]} />
            </View>
            <View style={styles.tagRow}>
              <ShimmerPlaceholder style={[styles.tagSkeleton, {backgroundColor: colors.recommendedJobsTagBackground}]} />
              <ShimmerPlaceholder style={[styles.tagSkeleton, {backgroundColor: colors.recommendedJobsTagBackground}]} />
            </View>
            <View style={styles.deadlineRow}>
              <ShimmerPlaceholder style={[styles.deadlineIconSkeleton, {backgroundColor: colors.recommendedJobsTagBackground}]} />
              <ShimmerPlaceholder style={[styles.deadlineSkeleton, {backgroundColor: colors.recommendedJobsTagBackground}]} />
            </View>
            <View style={styles.actionsRow}>
              <ShimmerPlaceholder style={[styles.actionSkeleton, {backgroundColor: colors.recommendedJobsTagBackground}]} />
              <ShimmerPlaceholder style={[styles.actionSkeleton, {backgroundColor: colors.recommendedJobsTagBackground}]} />
            </View>
          </View>
            ))
          : jobs.map(job => (
          <View
            key={job.id}
            style={[
              styles.card,
              {
                width: cardWidth,
                backgroundColor: colors.recommendedJobsCard,
                borderColor: colors.recommendedJobsCardBorder,
              },
            ]}>
            <View style={styles.titleRow}>
              <Text style={[styles.jobTitle, {color: colors.text}]}>{job.title}</Text>
              <WishlistStarIcon />
            </View>

            <View style={styles.companyRow}>
              <Image source={{uri: job.logo}} style={styles.logo} resizeMode="cover" />
              <Text style={[styles.companyText, {color: colors.text}]}>{job.company}</Text>
            </View>

            <View style={[styles.salaryBox, {backgroundColor: colors.recommendedJobsSalaryBox}]}>
              <Text style={[styles.salaryText, {color: colors.text}]}>Salary: {job.salary}</Text>
              {job.food ? <Text style={[styles.salaryText, {color: colors.text}]}>Food Allowance: {job.food}</Text> : null}
            </View>

            <View style={styles.tagRow}>
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: colors.recommendedJobsTagBackground,
                    borderColor: colors.recommendedJobsTagBorder,
                  },
                ]}>
                <Image source={{uri: OVERSEAS_ICON_URI}} style={styles.tagIcon} resizeMode="cover" />
                <Text style={[styles.tagText, {color: colors.text}]}>OVERSEAS</Text>
              </View>
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: colors.recommendedJobsTagBackground,
                    borderColor: colors.recommendedJobsTagBorder,
                  },
                ]}>
                <Image source={{uri: LOCATION_ICON_URI}} style={styles.tagIcon} resizeMode="cover" />
                <Text style={[styles.tagText, {color: colors.text}]}>SAUDI ARABIA</Text>
              </View>
            </View>

            <View style={styles.deadlineRow}>
              <Image
                source={{uri: DEADLINE_ICON_URI}}
                style={styles.deadlineIcon}
                resizeMode="cover"
              />
              <Text style={[styles.deadlineText, {color: colors.textMuted}]}>
                Application Deadline: {job.deadline}
              </Text>
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.secondaryButton,
                  {
                    borderColor: colors.primary,
                    backgroundColor: colors.recommendedJobsSecondaryButtonBackground,
                  },
                ]}>
                <Text style={[styles.secondaryButtonText, {color: colors.primary}]}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} style={[styles.primaryButton, {backgroundColor: colors.primaryStrong}]}>
                <Text style={styles.primaryButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          </View>
            ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: '#ffffff',
  },
  headerRow: {
    alignItems: 'center',
    marginBottom: 40,
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
    minHeight: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#93c5fd',
    backgroundColor: '#ffffff',
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  jobTitle: {
    flex: 1,
    color: '#111827',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    textAlign: 'center',
    paddingRight: 12,
  },
  wishlistIconWrap: {
    paddingTop: 1,
    flexShrink: 0,
  },
  jobTitleSkeleton: {
    flex: 1,
    height: 28,
    borderRadius: 8,
    marginRight: 12,
  },
  iconSkeleton: {
    width: 24,
    height: 24,
    borderRadius: 999,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginRight: 12,
  },
  logoSkeleton: {
    width: 48,
    height: 48,
    borderRadius: 999,
    marginRight: 12,
  },
  companySkeleton: {
    height: 20,
    width: '48%',
    borderRadius: 8,
  },
  companyText: {
    color: '#111827',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    flexShrink: 1,
  },
  salaryBox: {
    borderRadius: 8,
    backgroundColor: '#dbeafe',
    padding: 16,
    marginBottom: 16,
    rowGap: 8,
  },
  salaryText: {
    color: '#111827',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  salarySkeleton: {
    width: '72%',
    height: 14,
    borderRadius: 6,
  },
  salarySkeletonShort: {
    width: '52%',
    height: 14,
    borderRadius: 6,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 8,
    rowGap: 8,
    marginBottom: 16,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#ffffff',
  },
  tagIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  tagText: {
    color: '#374151',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  tagSkeleton: {
    width: 110,
    height: 24,
    borderRadius: 4,
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  deadlineIconSkeleton: {
    width: 16,
    height: 16,
    borderRadius: 999,
    marginRight: 8,
  },
  deadlineIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  deadlineSkeleton: {
    flex: 1,
    height: 16,
    borderRadius: 6,
  },
  deadlineText: {
    flex: 1,
    color: '#374151',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    columnGap: 12,
    marginTop: 'auto',
    paddingTop: 8,
  },
  actionSkeleton: {
    flex: 1,
    height: 36,
    borderRadius: 6,
  },
  secondaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#3b82f6',
    paddingVertical: 8,
  },
  secondaryButtonText: {
    color: '#2563eb',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#2563eb',
    paddingVertical: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
});
