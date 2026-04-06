import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useAppTheme } from '../theme/appTheme';

const QUICK_ACTIONS = [
  {
    label: 'Your profile is 11% completed',
    accent: '11%',
    icon: 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_14_84.png',
    highlighted: false,
  },
  {
    label: 'View Job Lists',
    accent: '',
    icon: 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_14_91.png',
    highlighted: false,
  },
  {
    label: 'Preview CV',
    accent: '',
    icon: 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_14_98.png',
    highlighted: true,
  },
] as const;

const STATS = [
  {
    label: 'Applied Jobs',
    value: '0',
    icon: 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_14_107.png',
  },
  {
    label: 'Shortlisted',
    value: '0',
    icon: 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_14_116.png',
  },
  {
    label: 'Interview',
    value: '0',
    icon: 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_14_125.png',
  },
  {
    label: 'Hired',
    value: '0',
    icon: 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_14_134.png',
  },
] as const;

const PROFILE_DETAILS = [
  ['Name:', 'Zubaer Ahmed', 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_14_176.png'],
  ['Contact:', '01827829617', 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_14_185.png'],
  ['Email:', 'zubaerahmed100@gmail.com', 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_14_194.png'],
  ['Address:', '', 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_14_203.png'],
  ['Nid:', '', 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_14_210.png'],
  ['Date Of Birth:', '2002-01-01', 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_14_217.png'],
  ['Gender:', 'Male', 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_14_226.png'],
] as const;

export default function DashboardScreen() {
  const { width } = useWindowDimensions();
  const { isDarkMode, colors } = useAppTheme();
  const isWide = width >= 1100;

  return (
    <View style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <ScrollView
        style={[styles.main, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.mainContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerBlock}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Hello, Zubaer Ahmed!</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>
            Welcome to Your Dashboard
          </Text>
        </View>

        <View style={[styles.quickActionsGrid, isWide && styles.quickActionsGridWide]}>
          {QUICK_ACTIONS.map(action => (
            <View
              key={action.label}
              style={[
                styles.quickActionCard,
                {
                  backgroundColor: action.highlighted ? colors.primarySoft : colors.surface,
                  borderColor: colors.border,
                },
              ]}>
              <View style={[styles.quickActionIconWrap, { backgroundColor: colors.primarySoft }]}>
                <Image source={{ uri: action.icon }} style={styles.quickActionIcon} resizeMode="contain" />
              </View>
              <Text style={[styles.quickActionText, { color: colors.text }]}>
                {action.label}
                {action.accent ? (
                  <Text style={[styles.quickActionAccent, { color: colors.textMuted }]}>
                    {' '}
                    {action.accent}
                  </Text>
                ) : null}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.statsGrid}>
          {STATS.map(stat => (
            <View
              key={stat.label}
              style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Image source={{ uri: stat.icon }} style={styles.statIcon} resizeMode="contain" />
              <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.bottomGrid, isWide && styles.bottomGridWide]}>
          <View style={[styles.panelCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.panelTitle, { color: colors.text }]}>Notice Board</Text>
            <View style={styles.noticeRow}>
              <View style={styles.noticeCopy}>
                <Text style={[styles.noticeHeadline, { color: colors.text }]}>
                  McDonald&apos;s Saudi Arabia - Service Crew নিয়োগ চলছে
                </Text>
                <Text style={[styles.noticeBody, { color: colors.textMuted }]}>
                  বিদেশে কাজের বড় সুযোগ...
                </Text>
              </View>
              <View style={styles.noticeDateWrap}>
                <Text style={[styles.noticeDate, { color: colors.textSoft }]}>3/6/2026</Text>
                <Text style={[styles.noticeDate, { color: colors.textSoft }]}>12:53 PM</Text>
              </View>
            </View>
          </View>

          <View style={[styles.panelCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.panelTitleSmall, { color: colors.text }]}>Candidate Profile</Text>
            <View style={styles.profileList}>
              {PROFILE_DETAILS.map(([label, value, icon]) => (
                <View key={`${label}-${value}`} style={styles.profileRow}>
                  <Image source={{ uri: icon }} style={styles.profileRowIcon} resizeMode="contain" />
                  <View style={styles.profileRowCopy}>
                    <Text style={[styles.profileRowLabel, { color: colors.text }]}>{label}</Text>
                    {value ? (
                      <Text style={[styles.profileRowValue, { color: colors.textMuted }]}>{value}</Text>
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  main: {
    flex: 1,
  },
  mainContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 28,
    rowGap: 20,
  },
  headerBlock: {
    rowGap: 4,
  },
  headerTitle: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  quickActionsGrid: {
    rowGap: 14,
  },
  quickActionsGridWide: {
    flexDirection: 'row',
    columnGap: 14,
  },
  quickActionCard: {
    flex: 1,
    minHeight: 96,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 14,
  },
  quickActionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionIcon: {
    width: 16,
    height: 16,
  },
  quickActionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  quickActionAccent: {
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  statCard: {
    minWidth: '47%',
    flexGrow: 1,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 22,
    alignItems: 'center',
  },
  statIcon: {
    width: 24,
    height: 24,
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  bottomGrid: {
    rowGap: 18,
  },
  bottomGridWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 18,
  },
  panelCard: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 22,
  },
  panelTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    marginBottom: 24,
  },
  panelTitleSmall: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    marginBottom: 20,
  },
  noticeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 16,
  },
  noticeCopy: {
    flex: 1,
  },
  noticeHeadline: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
  noticeBody: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 19,
  },
  noticeDateWrap: {
    alignItems: 'flex-end',
  },
  noticeDate: {
    fontSize: 12,
    lineHeight: 18,
  },
  profileList: {
    rowGap: 16,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 12,
  },
  profileRowIcon: {
    width: 16,
    height: 16,
    marginTop: 3,
  },
  profileRowCopy: {
    flex: 1,
    rowGap: 2,
  },
  profileRowLabel: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  profileRowValue: {
    fontSize: 14,
    lineHeight: 20,
  },
});
