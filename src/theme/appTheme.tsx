import React from 'react';

type ThemeColors = {
  background: string;
  backgroundAlt: string;
  surface: string;
  surfaceMuted: string;
  footerBackground: string;
  footerSurface: string;
  footerBorder: string;
  footerText: string;
  footerTextMuted: string;
  footerTextSoft: string;
  hotJobsSection: string;
  hotJobsHeaderPill: string;
  hotJobsCard: string;
  hotJobsCardBorder: string;
  hotJobsSalaryBox: string;
  hotJobsTagBorder: string;
  hotJobsTagBackground: string;
  hotJobsSecondaryButtonBackground: string;
  recommendedJobsSection: string;
  recommendedJobsHeaderPill: string;
  recommendedJobsCard: string;
  recommendedJobsCardBorder: string;
  recommendedJobsSalaryBox: string;
  recommendedJobsTagBorder: string;
  recommendedJobsTagBackground: string;
  recommendedJobsSecondaryButtonBackground: string;
  trendingJobsSection: string;
  trendingJobsHeaderPill: string;
  trendingJobsCard: string;
  trendingJobsBadge: string;
  trendingJobsBadgeText: string;
  trendingJobsTagBorder: string;
  trendingJobsTagBackground: string;
  trendingJobsSecondaryButtonBackground: string;
  border: string;
  text: string;
  textMuted: string;
  textSoft: string;
  primary: string;
  primaryStrong: string;
  primarySoft: string;
  overlay: string;
  success: string;
  danger: string;
  input: string;
};

type ThemeValue = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  colors: ThemeColors;
};

const lightColors: ThemeColors = {
  background: '#f8fafc',
  backgroundAlt: '#eff6ff',
  surface: '#ffffff',
  surfaceMuted: '#f8fafc',
  footerBackground: '#3b82f6',
  footerSurface: '#ffffff',
  footerBorder: '#60a5fa',
  footerText: '#ffffff',
  footerTextMuted: '#374151',
  footerTextSoft: '#dbeafe',
  hotJobsSection: '#ffffff',
  hotJobsHeaderPill: '#f5f8fe',
  hotJobsCard: '#f5f8fe',
  hotJobsCardBorder: '#93c5fd',
  hotJobsSalaryBox: '#dbeafe',
  hotJobsTagBorder: '#e5e7eb',
  hotJobsTagBackground: '#ffffff',
  hotJobsSecondaryButtonBackground: '#ffffff',
  recommendedJobsSection: '#ffffff',
  recommendedJobsHeaderPill: '#eff6ff',
  recommendedJobsCard: '#ffffff',
  recommendedJobsCardBorder: '#93c5fd',
  recommendedJobsSalaryBox: '#dbeafe',
  recommendedJobsTagBorder: '#e5e7eb',
  recommendedJobsTagBackground: '#ffffff',
  recommendedJobsSecondaryButtonBackground: '#ffffff',
  trendingJobsSection: '#ffffff',
  trendingJobsHeaderPill: '#eff6ff',
  trendingJobsCard: '#dbeafe',
  trendingJobsBadge: '#fee2e2',
  trendingJobsBadgeText: '#000000',
  trendingJobsTagBorder: '#60a5fa',
  trendingJobsTagBackground: '#ffffff',
  trendingJobsSecondaryButtonBackground: 'transparent',
  border: '#dbeafe',
  text: '#1f2937',
  textMuted: '#475569',
  textSoft: '#64748b',
  primary: '#2563eb',
  primaryStrong: '#1d4ed8',
  primarySoft: '#dbeafe',
  overlay: 'rgba(15,23,42,0.28)',
  success: '#10b981',
  danger: '#dc2626',
  input: '#ffffff',
};

const darkColors: ThemeColors = {
  background: '#020617',
  backgroundAlt: '#0f172a',
  surface: '#111827',
  surfaceMuted: '#1e293b',
  footerBackground: '#111827',
  footerSurface: '#1f2937',
  footerBorder: '#334155',
  footerText: '#f8fafc',
  footerTextMuted: '#cbd5e1',
  footerTextSoft: '#94a3b8',
  hotJobsSection: '#111827',
  hotJobsHeaderPill: '#1e3a8a',
  hotJobsCard: '#1e293b',
  hotJobsCardBorder: '#334155',
  hotJobsSalaryBox: '#0f172a',
  hotJobsTagBorder: '#475569',
  hotJobsTagBackground: '#111827',
  hotJobsSecondaryButtonBackground: '#111827',
  recommendedJobsSection: '#111827',
  recommendedJobsHeaderPill: '#1e3a8a',
  recommendedJobsCard: '#111827',
  recommendedJobsCardBorder: '#334155',
  recommendedJobsSalaryBox: '#0f172a',
  recommendedJobsTagBorder: '#475569',
  recommendedJobsTagBackground: '#111827',
  recommendedJobsSecondaryButtonBackground: '#111827',
  trendingJobsSection: '#111827',
  trendingJobsHeaderPill: '#1e3a8a',
  trendingJobsCard: '#1e293b',
  trendingJobsBadge: '#7f1d1d',
  trendingJobsBadgeText: '#fef2f2',
  trendingJobsTagBorder: '#475569',
  trendingJobsTagBackground: '#111827',
  trendingJobsSecondaryButtonBackground: 'transparent',
  border: '#334155',
  text: '#f8fafc',
  textMuted: '#cbd5e1',
  textSoft: '#94a3b8',
  primary: '#60a5fa',
  primaryStrong: '#3b82f6',
  primarySoft: '#1e3a8a',
  overlay: 'rgba(2,6,23,0.7)',
  success: '#34d399',
  danger: '#f87171',
  input: '#0f172a',
};

const AppThemeContext = React.createContext<ThemeValue | null>(null);

export function AppThemeProvider({
  children,
  isDarkMode,
  setIsDarkMode,
}: {
  children: React.ReactNode;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const colors = isDarkMode ? darkColors : lightColors;

  const value = React.useMemo(
    () => ({
      isDarkMode,
      setIsDarkMode,
      colors,
    }),
    [colors, isDarkMode, setIsDarkMode],
  );

  return <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>;
}

export function useAppTheme() {
  const value = React.useContext(AppThemeContext);

  if (!value) {
    throw new Error('useAppTheme must be used within AppThemeProvider.');
  }

  return value;
}
