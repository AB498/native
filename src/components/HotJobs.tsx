import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import {MOCK_JOBS} from '../data/mockLandingData';
import ShimmerPlaceholder from './ShimmerPlaceholder';
import {useAppTheme} from '../theme/appTheme';
import {JobCard} from '../types/landing';

const COMPANY_LOGO_URI =
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/5fec8e5bb4b77e52b3bbbbe6b5353a017996d495.png';

export default function HotJobs({
  jobs = MOCK_JOBS.slice(0, 3),
  isLoading = false,
}: {
  jobs?: JobCard[];
  isLoading?: boolean;
}) {
  const {width} = useWindowDimensions();
  const {colors} = useAppTheme();
  const isSm = width >= 640;
  const isLg = width >= 1024;
  const cardWidth = isLg ? '31.8%' : isSm ? '48.5%' : '100%';
  const loadingCount = isLg ? 3 : isSm ? 4 : 3;

  return (
    <View style={[styles.section, {backgroundColor: colors.hotJobsSection}]}>
      <View style={styles.headerRow}>
        <View style={[styles.headerPill, {backgroundColor: colors.hotJobsHeaderPill}]}>
          <Text style={[styles.headerText, {color: colors.text}]}>Hot Jobs</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {isLoading
          ? Array.from({length: loadingCount}, (_, index) => (
          <View
            key={`hot-job-skeleton-${index}`}
            style={[
              styles.card,
              {
                width: cardWidth,
                backgroundColor: colors.hotJobsCard,
                borderColor: colors.hotJobsCardBorder,
              },
            ]}>
            <ShimmerPlaceholder style={[styles.jobTitleSkeleton, {backgroundColor: colors.hotJobsTagBackground}]} />
            <View style={styles.companyRow}>
              <ShimmerPlaceholder style={[styles.logoSkeleton, {backgroundColor: colors.hotJobsTagBackground}]} />
              <ShimmerPlaceholder style={[styles.companySkeleton, {backgroundColor: colors.hotJobsTagBackground}]} />
            </View>
            <View style={[styles.salaryBox, {backgroundColor: colors.hotJobsSalaryBox}]}>
              <ShimmerPlaceholder style={[styles.salarySkeleton, {backgroundColor: colors.hotJobsCard}]} />
              <ShimmerPlaceholder style={[styles.salarySkeletonShort, {backgroundColor: colors.hotJobsCard}]} />
            </View>
            <View style={styles.tagRow}>
              <ShimmerPlaceholder style={[styles.tagSkeleton, {backgroundColor: colors.hotJobsTagBackground}]} />
              <ShimmerPlaceholder style={[styles.tagSkeleton, {backgroundColor: colors.hotJobsTagBackground}]} />
            </View>
            <ShimmerPlaceholder style={[styles.deadlineSkeleton, {backgroundColor: colors.hotJobsTagBackground}]} />
            <View style={styles.actionsRow}>
              <ShimmerPlaceholder style={[styles.actionSkeleton, {backgroundColor: colors.hotJobsTagBackground}]} />
              <ShimmerPlaceholder style={[styles.actionSkeleton, {backgroundColor: colors.hotJobsTagBackground}]} />
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
                backgroundColor: colors.hotJobsCard,
                borderColor: colors.hotJobsCardBorder,
              },
            ]}>
            <Text style={[styles.jobTitle, {color: colors.text}]}>{job.title}</Text>

            <View style={styles.companyRow}>
              <Image
                source={{uri: job.logo || COMPANY_LOGO_URI}}
                style={styles.logo}
                resizeMode="cover"
              />
              <Text style={[styles.companyText, {color: colors.text}]}>{job.company}</Text>
            </View>

            <View style={[styles.salaryBox, {backgroundColor: colors.hotJobsSalaryBox}]}>
              <Text style={[styles.salaryText, {color: colors.text}]}>Salary: {job.salary}</Text>
              {job.food ? (
                <Text style={[styles.salaryFoodText, {color: colors.text}]}>
                  Food Allowance: {job.food}
                </Text>
              ) : null}
            </View>

            <View style={styles.tagRow}>
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: colors.hotJobsTagBackground,
                    borderColor: colors.hotJobsTagBorder,
                  },
                ]}>
                <Text style={[styles.tagText, {color: colors.text}]}>OVERSEAS</Text>
              </View>
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: colors.hotJobsTagBackground,
                    borderColor: colors.hotJobsTagBorder,
                  },
                ]}>
                <Text style={[styles.tagText, {color: colors.text}]}>SAUDI ARABIA</Text>
              </View>
            </View>

            <Text style={[styles.deadlineText, {color: colors.textMuted}]}>
              Application Deadline: {job.deadline}
            </Text>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.secondaryButton,
                  {
                    borderColor: colors.primary,
                    backgroundColor: colors.hotJobsSecondaryButtonBackground,
                  },
                ]}>
                <Text style={[styles.secondaryButtonText, {color: colors.primary}]}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.primaryButton, {backgroundColor: colors.primaryStrong}]}>
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
    paddingVertical: 48,
    backgroundColor: '#ffffff',
  },
  headerRow: {
    alignItems: 'center',
    marginBottom: 48,
  },
  headerPill: {
    borderRadius: 999,
    backgroundColor: '#f5f8fe',
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  headerText: {
    color: '#1f2937',
    fontSize: 24,
    lineHeight: 32,
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
    backgroundColor: '#f5f8fe',
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  jobTitle: {
    color: '#111827',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  jobTitleSkeleton: {
    width: '78%',
    height: 28,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
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
    marginRight: 16,
  },
  logoSkeleton: {
    width: 48,
    height: 48,
    borderRadius: 999,
    marginRight: 16,
  },
  companySkeleton: {
    width: '52%',
    height: 20,
    borderRadius: 8,
  },
  companyText: {
    color: '#111827',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  salaryBox: {
    borderRadius: 8,
    backgroundColor: '#dbeafe',
    padding: 16,
    marginBottom: 16,
    rowGap: 8,
  },
  salaryText: {
    color: '#1f2937',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  salaryFoodText: {
    color: '#111827',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  salarySkeleton: {
    width: '72%',
    height: 16,
    borderRadius: 6,
  },
  salarySkeletonShort: {
    width: '48%',
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
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#ffffff',
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
    borderRadius: 6,
  },
  deadlineSkeleton: {
    width: '68%',
    height: 16,
    borderRadius: 6,
    marginBottom: 16,
  },
  deadlineText: {
    color: '#374151',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    columnGap: 16,
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
    borderColor: '#2563eb',
    paddingVertical: 8,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#1d4ed8',
    paddingVertical: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
});
