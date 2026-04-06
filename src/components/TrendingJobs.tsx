import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import {MOCK_JOBS} from '../data/mockLandingData';
import ShimmerPlaceholder from './ShimmerPlaceholder';
import {useAppTheme} from '../theme/appTheme';
import {JobCard} from '../types/landing';

const DAYS_LEFT_ICON_URI =
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_4_44.png';
const OVERSEAS_ICON_URI =
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_4_29.png';
const LOCATION_ICON_URI =
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_4_33.png';

export default function TrendingJobs({
  job = MOCK_JOBS[0],
  isLoading = false,
}: {
  job?: JobCard;
  isLoading?: boolean;
}) {
  const {width} = useWindowDimensions();
  const {colors} = useAppTheme();
  const isMd = width >= 768;

  if (isLoading) {
    return (
      <View style={[styles.container, {backgroundColor: colors.trendingJobsSection}]}>
        <View style={styles.headerRow}>
          <View style={[styles.headerPill, {backgroundColor: colors.trendingJobsHeaderPill}]}>
            <Text style={[styles.headerText, {color: colors.text}]}>Trending Jobs</Text>
          </View>
        </View>

        <View style={[styles.card, {backgroundColor: colors.trendingJobsCard}]}>
          {isMd ? (
            <ShimmerPlaceholder style={[styles.badgeSkeleton, {backgroundColor: colors.trendingJobsBadge}]} />
          ) : (
            <View style={styles.badgeAnchor}>
              <ShimmerPlaceholder
                style={[
                  styles.badgeSkeleton,
                  styles.badgeCenteredMobile,
                  {backgroundColor: colors.trendingJobsBadge},
                ]}
              />
            </View>
          )}
          <View style={[styles.content, isMd && styles.contentDesktop]}>
            <View style={[styles.titleBlock, isMd && styles.titleBlockDesktop]}>
              <ShimmerPlaceholder style={[styles.titleSkeleton, {backgroundColor: colors.trendingJobsTagBackground}]} />
              <ShimmerPlaceholder style={[styles.companySkeleton, {backgroundColor: colors.trendingJobsTagBackground}]} />
            </View>
            <View style={[styles.detailsBlock, isMd && styles.detailsBlockDesktop]}>
              <ShimmerPlaceholder style={[styles.detailSkeleton, {backgroundColor: colors.trendingJobsTagBackground}]} />
              <ShimmerPlaceholder style={[styles.detailSkeletonShort, {backgroundColor: colors.trendingJobsTagBackground}]} />
              <View style={styles.tagsRow}>
                <ShimmerPlaceholder style={[styles.tagSkeleton, {backgroundColor: colors.trendingJobsTagBackground}]} />
                <ShimmerPlaceholder style={[styles.tagSkeleton, {backgroundColor: colors.trendingJobsTagBackground}]} />
              </View>
            </View>
            <View style={[styles.actions, isMd && styles.actionsDesktop]}>
              <ShimmerPlaceholder style={[styles.buttonSkeleton, {backgroundColor: colors.trendingJobsTagBackground}]} />
              <ShimmerPlaceholder style={[styles.buttonSkeleton, {backgroundColor: colors.trendingJobsTagBackground}]} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.trendingJobsSection}]}>
      <View style={styles.headerRow}>
        <View style={[styles.headerPill, {backgroundColor: colors.trendingJobsHeaderPill}]}>
          <Text style={[styles.headerText, {color: colors.text}]}>Trending Jobs</Text>
        </View>
      </View>

      <View style={[styles.card, {backgroundColor: colors.trendingJobsCard}]}>
        {isMd ? (
          <View style={[styles.badge, {backgroundColor: colors.trendingJobsBadge}]}>
            <Image source={{uri: DAYS_LEFT_ICON_URI}} style={styles.badgeIcon} resizeMode="contain" />
            <Text style={[styles.badgeText, {color: colors.trendingJobsBadgeText}]}>2 DAYS LEFT</Text>
          </View>
        ) : (
          <View style={styles.badgeAnchor}>
            <View style={[styles.badge, styles.badgeCenteredMobile, {backgroundColor: colors.trendingJobsBadge}]}>
              <Image source={{uri: DAYS_LEFT_ICON_URI}} style={styles.badgeIcon} resizeMode="contain" />
              <Text style={[styles.badgeText, {color: colors.trendingJobsBadgeText}]}>2 DAYS LEFT</Text>
            </View>
          </View>
        )}

        <View style={[styles.content, isMd && styles.contentDesktop]}>
          <View style={[styles.titleBlock, isMd && styles.titleBlockDesktop]}>
            <Text style={[styles.jobTitle, {color: colors.text}]}>{job.title}</Text>
            <Text style={[styles.company, {color: colors.text}]}>{job.company}</Text>
          </View>

          <View style={[styles.detailsBlock, isMd && styles.detailsBlockDesktop]}>
            <Text style={[styles.detailText, {color: colors.text}]}>Salary: {job.salary}</Text>
            {job.food ? <Text style={[styles.detailText, {color: colors.text}]}>Food Allowance: {job.food}</Text> : null}

            <View style={styles.tagsRow}>
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: colors.trendingJobsTagBackground,
                    borderColor: colors.trendingJobsTagBorder,
                  },
                ]}>
                <Image
                  source={{uri: OVERSEAS_ICON_URI}}
                  style={styles.tagIcon}
                  resizeMode="contain"
                />
                <Text style={[styles.tagText, {color: colors.text}]}>{job.type || 'OVERSEAS'}</Text>
              </View>

              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: colors.trendingJobsTagBackground,
                    borderColor: colors.trendingJobsTagBorder,
                  },
                ]}>
                <Image
                  source={{uri: LOCATION_ICON_URI}}
                  style={styles.tagIcon}
                  resizeMode="contain"
                />
                <Text style={[styles.tagText, {color: colors.text}]}>
                  {(job.location || 'Saudi Arabia').toUpperCase()}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.actions, isMd && styles.actionsDesktop]}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.secondaryButton,
                {
                  borderColor: colors.primary,
                  backgroundColor: colors.trendingJobsSecondaryButtonBackground,
                },
              ]}>
              <Text style={[styles.secondaryButtonText, {color: colors.primary}]}>View</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} style={[styles.primaryButton, {backgroundColor: colors.primaryStrong}]}>
              <Text style={styles.primaryButtonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: '#ffffff',
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
  card: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#dbeafe',
    paddingHorizontal: 24,
    paddingVertical: 24,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  badge: {
    position: 'absolute',
    top: -16,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#fee2e2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  badgeAnchor: {
    position: 'absolute',
    top: -16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  badgeCenteredMobile: {
    position: 'relative',
    top: 0,
    right: 'auto',
    left: 'auto',
  },
  badgeIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  badgeText: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  content: {
    rowGap: 24,
    alignItems: 'center',
  },
  contentDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 24,
  },
  titleBlock: {
    rowGap: 4,
    alignItems: 'center',
  },
  titleBlockDesktop: {
    flexBasis: '32%',
    maxWidth: '32%',
  },
  jobTitle: {
    color: '#111827',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
    textAlign: 'center',
  },
  company: {
    color: '#111827',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
  detailsBlock: {
    rowGap: 8,
    alignItems: 'center',
  },
  detailsBlockDesktop: {
    flexBasis: '40%',
    maxWidth: '40%',
  },
  detailText: {
    color: '#111827',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  detailMuted: {
    color: '#4b5563',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 8,
    rowGap: 8,
    paddingTop: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#60a5fa',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  tagIcon: {
    width: 14,
    height: 14,
    marginRight: 6,
  },
  tagText: {
    color: '#1f2937',
    fontSize: 12,
    lineHeight: 16,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 12,
    rowGap: 12,
  },
  actionsDesktop: {
    flexBasis: '22%',
    maxWidth: '22%',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
  },
  badgeSkeleton: {
    position: 'absolute',
    top: -16,
    right: 24,
    width: 132,
    height: 32,
    borderRadius: 12,
  },
  titleSkeleton: {
    width: '82%',
    height: 32,
    borderRadius: 8,
  },
  companySkeleton: {
    width: '56%',
    height: 22,
    borderRadius: 8,
  },
  detailSkeleton: {
    width: '72%',
    height: 18,
    borderRadius: 8,
  },
  detailSkeletonShort: {
    width: '52%',
    height: 18,
    borderRadius: 8,
  },
  tagSkeleton: {
    width: 110,
    height: 28,
    borderRadius: 6,
  },
  buttonSkeleton: {
    minWidth: 108,
    height: 40,
    borderRadius: 6,
    flex: 1,
  },
  secondaryButton: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: '#2563eb',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  primaryButton: {
    borderRadius: 6,
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
});
