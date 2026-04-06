import React from 'react';
import {
  Animated,
  Image,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Footer from './src/components/Footer';
import HeroSection from './src/components/HeroSection';
import HotJobs from './src/components/HotJobs';
import DashboardScreen from './src/components/DashboardScreen';
import MobileBottomNav, { MobileNavItem } from './src/components/MobileBottomNav';
import OtpVerificationScreen from './src/components/OtpVerificationScreen';
import PlaceholderScreen from './src/components/PlaceholderScreen';
import PopularCompanies from './src/components/PopularCompanies';
import PopularIndustries from './src/components/PopularIndustries';
import RecommendedJobs from './src/components/RecommendedJobs';
import SignInScreen from './src/components/SignInScreen';
import SignUpScreen from './src/components/SignUpScreen';
import TrendingJobs from './src/components/TrendingJobs';
import { useLandingData } from './src/hooks/useLandingData';
import { AppThemeProvider, useAppTheme } from './src/theme/appTheme';
import { LandingMode } from './src/types/landing';

const LOGO_URI =
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/e92944fb26febc6d339e47de35b602261d131016.png';
const LOGO_DARK_URI = 'https://bhcjobs.com/images/logo_night_mode.png';
const MENU_URI =
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_2_20.png';
const PROFILE_URI =
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/8d0732a0c74f68d1bfc176687f012cfa304278b7.png';
const MOBILE_NAV_ITEMS = [
  {
    key: 'history',
    label: 'History',
    icon: 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_17_922.png',
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_17_928.png',
  },
  {
    key: 'jobs',
    label: 'Jobs',
    icon: 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_17_933.png',
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_17_938.png',
  },
  {
    key: 'search',
    label: 'Search',
    icon: 'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_17_943.png',
  },
] as const;
const SIDEBAR_WIDTH = 304;
const DESKTOP_BREAKPOINT = 900;
const DESKTOP_NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'jobs', label: 'Jobs' },
  { key: 'profile', label: 'Profile' },
  { key: 'history', label: 'History' },
  { key: 'search', label: 'Search' },
  { key: 'settings', label: 'Settings' },
] as const;

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  Otp: undefined;
  MainApp: undefined;
};

type DesktopSection = (typeof DESKTOP_NAV_ITEMS)[number]['key'];

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ onOpenLogin }: { onOpenLogin: () => void }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 640;
  const { isDarkMode, setIsDarkMode, colors } = useAppTheme();
  const [landingMode, setLandingMode] = React.useState<LandingMode>('demo');
  const { data, isLoading, error } = useLandingData(landingMode);
  const isLiveLoading = landingMode === 'live' && isLoading;
  const homeLogoUri = isDarkMode ? LOGO_DARK_URI : LOGO_URI;

  const mobileItems: MobileNavItem[] = MOBILE_NAV_ITEMS.map(item => ({
    ...item,
    active: item.key === 'search',
    onPress: () => {
      if (item.key !== 'search') {
        onOpenLogin();
      }
    },
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.surface}
      />
      <View pointerEvents="box-none" style={[styles.modeOverlay, isMobile && styles.modeOverlayMobile]}>
        <View style={styles.modeFloatingGroup}>
          <View style={styles.modeStatus}>
            {isLoading ? <ActivityIndicator size="small" color="#2563eb" /> : null}
            <Text style={styles.modeStatusText}>
              {landingMode === 'demo'
                ? 'Mock landing data'
                : error
                  ? 'Live failed, showing fallback'
                  : 'Live API landing data'}
            </Text>
          </View>
          <View style={styles.modeSwitch}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setLandingMode('demo')}
              style={[styles.modeChip, landingMode === 'demo' && styles.modeChipActive]}>
              <Text style={[styles.modeChipText, landingMode === 'demo' && styles.modeChipTextActive]}>
                Demo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setLandingMode('live')}
              style={[styles.modeChip, landingMode === 'live' && styles.modeChipActive]}>
              <Text style={[styles.modeChipText, landingMode === 'live' && styles.modeChipTextActive]}>
                Live
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.flexFill}>
        <ScrollView
          bounces={false}
          style={{ backgroundColor: colors.background }}
          contentContainerStyle={[styles.scrollContent, isMobile && styles.mobileScrollContent]}
          showsVerticalScrollIndicator={false}>
          <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <View style={[styles.headerShadow, { backgroundColor: colors.surface }]}>
              <View style={[styles.header, { backgroundColor: colors.surface }]}>
                <View style={styles.logoWrap}>
                  <Image source={{ uri: homeLogoUri }} style={styles.logo} resizeMode="cover" />
                </View>

                <View style={[styles.nav, isMobile && styles.navMobile]}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={[styles.navPill, isMobile && styles.navPillMobile]}>
                    <Text style={[styles.navPillText, { color: colors.primary }]}>Jobs</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={onOpenLogin}
                    style={[styles.navPill, isMobile && styles.navPillMobile]}>
                    <Text style={[styles.navPillText, { color: colors.primary }]}>Sign In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setIsDarkMode(value => !value)}
                    style={[styles.menuButton, isMobile && styles.menuButtonMobile]}>
                    <Image
                      source={{ uri: MENU_URI }}
                      style={[styles.themeToggleIcon, { tintColor: colors.primary }]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <HeroSection />
            <TrendingJobs job={data.trendingJob} isLoading={isLiveLoading} />
            <PopularIndustries industries={data.industries} isLoading={isLiveLoading} />
            <RecommendedJobs jobs={data.jobs} isLoading={isLiveLoading} />
            <PopularCompanies companies={data.companies} isLoading={isLiveLoading} />
            <HotJobs jobs={data.hotJobs} isLoading={isLiveLoading} />
            <Footer />
          </View>
        </ScrollView>
        {isMobile ? <MobileBottomNav items={mobileItems} /> : null}
      </View>
    </SafeAreaView>
  );
}

function DesktopContent({ section }: { section: DesktopSection }) {
  if (section === 'dashboard') {
    return <DashboardScreen />;
  }

  const copy: Record<Exclude<DesktopSection, 'dashboard'>, { title: string; description: string }> = {
    jobs: {
      title: 'Jobs',
      description: 'Your jobs section is ready for the next API-backed implementation.',
    },
    profile: {
      title: 'Profile',
      description: 'Profile details and editing can be added here when the profile API is ready.',
    },
    history: {
      title: 'History',
      description: 'Application history and status tracking can be surfaced in this section.',
    },
    search: {
      title: 'Search',
      description: 'Search can serve as the desktop discovery entry point alongside the landing page.',
    },
    settings: {
      title: 'Settings',
      description: 'Account settings and preferences can live here in the authenticated app.',
    },
  };

  const content = copy[section];

  return <PlaceholderScreen title={content.title} description={content.description} />;
}

function MainAppNavigator({ onSignOut }: { onSignOut: () => void }) {
  const { width } = useWindowDimensions();
  const isMobile = width < DESKTOP_BREAKPOINT;
  const { isDarkMode, setIsDarkMode, colors } = useAppTheme();
  const [activeSection, setActiveSection] = React.useState<DesktopSection>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const sidebarProgress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(sidebarProgress, {
      toValue: isSidebarOpen ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [isSidebarOpen, sidebarProgress]);

  React.useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  const sidebarTranslateX = sidebarProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-SIDEBAR_WIDTH, 0],
  });

  const overlayOpacity = sidebarProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const shellBackground = colors.backgroundAlt;
  const headerBackground = colors.surface;
  const headerBorder = colors.border;
  const panelBackground = colors.surface;
  const panelBorder = colors.border;
  const titleColor = colors.text;
  const subTextColor = colors.textSoft;
  const themeButtonBackground = isDarkMode ? colors.primaryStrong : colors.surfaceMuted;
  const themeButtonBorder = colors.primary;
  const themeButtonText = isDarkMode ? '#eff6ff' : colors.primary;
  const contentBackground = colors.backgroundAlt;
  const logoUri = isDarkMode ? LOGO_DARK_URI : LOGO_URI;
  const mobileNavItems: MobileNavItem[] = MOBILE_NAV_ITEMS.map(item => ({
    ...item,
    active: item.key === activeSection,
    onPress: () => setActiveSection(item.key as DesktopSection),
  }));

  const sidebarContent = (
    <>
      <View style={styles.sidebarHeader}>
        <View>
          <Text style={[styles.sidebarEyebrow, { color: subTextColor }]}>Workspace</Text>
          <Text style={[styles.sidebarTitle, { color: titleColor }]}>XLike Console</Text>
        </View>
        {isMobile ? (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setIsSidebarOpen(false)}
            style={styles.sidebarCloseButton}>
            <Text style={styles.sidebarCloseText}>Close</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.sidebarNav}>
        {DESKTOP_NAV_ITEMS.map(item => {
          const active = item.key === activeSection;
          return (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.9}
              onPress={() => {
                setActiveSection(item.key);
                if (isMobile) {
                  setIsSidebarOpen(false);
                }
              }}
              style={[
                styles.sidebarItem,
                isDarkMode && styles.sidebarItemDark,
                active && styles.sidebarItemActive,
              ]}>
              <Text
                style={[
                  styles.sidebarItemText,
                  isDarkMode && styles.sidebarItemTextDark,
                  active && styles.sidebarItemTextActive,
                ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onSignOut}
        style={[styles.sidebarSignOutButton, isDarkMode && styles.sidebarSignOutButtonDark]}>
        <Text style={[styles.sidebarSignOutText, isDarkMode && styles.sidebarSignOutTextDark]}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </>
  );

  if (!isMobile) {
    return (
      <View style={[styles.desktopLayout, { backgroundColor: shellBackground }]}>
        <View
          style={[
            styles.desktopSidebar,
            { backgroundColor: panelBackground, borderRightColor: panelBorder },
          ]}>
          {sidebarContent}
        </View>
        <View style={styles.desktopMain}>
          <View
            style={[
              styles.desktopHeader,
              { backgroundColor: headerBackground, borderBottomColor: headerBorder },
            ]}>
            <View style={styles.authHeaderLeft}>
              <View style={styles.authLogoWrap}>
                <Image source={{ uri: logoUri }} style={styles.authLogo} resizeMode="contain" />
              </View>
            </View>
            <View style={styles.authHeaderRight}>
              <TouchableOpacity activeOpacity={0.85} style={styles.headerIconButton} onPress={onSignOut}>
                <Image source={{ uri: PROFILE_URI }} style={styles.profileIconImage} resizeMode="cover" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setIsDarkMode(value => !value)}
                style={[
                  styles.themeToggleButton,
                  {
                    backgroundColor: themeButtonBackground,
                    borderColor: themeButtonBorder,
                  },
                ]}>
                <Image
                  source={{ uri: MENU_URI }}
                  style={[styles.themeToggleIcon, { tintColor: themeButtonText }]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.desktopContent, { backgroundColor: contentBackground }]}>
            <DesktopContent section={activeSection} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.mobileShell, { backgroundColor: shellBackground }]}>
      <View
        style={[
          styles.mobileHeader,
          { backgroundColor: headerBackground, borderBottomColor: headerBorder },
        ]}>
        <View style={styles.authHeaderLeft}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setIsSidebarOpen(true)}
            style={styles.headerIconButton}>
            <View style={styles.headerIconInner}>
              <View style={styles.headerMenuGlyph}>
                <View style={styles.headerMenuLine} />
                <View style={styles.headerMenuLine} />
                <View style={styles.headerMenuLine} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.authLogoWrap}>
            <Image source={{ uri: logoUri }} style={styles.authLogo} resizeMode="contain" />
          </View>
        </View>
        <View style={styles.authHeaderRight}>
          <TouchableOpacity activeOpacity={0.85} onPress={onSignOut} style={styles.headerIconButton}>
            <Image source={{ uri: PROFILE_URI }} style={styles.profileIconImage} resizeMode="cover" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setIsDarkMode(value => !value)}
            style={[
              styles.themeToggleButton,
              {
                backgroundColor: themeButtonBackground,
                borderColor: themeButtonBorder,
              },
            ]}>
            <Image
              source={{ uri: MENU_URI }}
              style={[styles.themeToggleIcon, { tintColor: themeButtonText }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.mobileContent, { backgroundColor: contentBackground }]}>
        <DesktopContent section={activeSection} />
      </View>

      <MobileBottomNav items={mobileNavItems} />

      <Animated.View
        pointerEvents={isSidebarOpen ? 'auto' : 'none'}
        style={[styles.sidebarOverlay, { opacity: overlayOpacity }]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsSidebarOpen(false)}
          style={styles.sidebarOverlayTouch}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.sidebarPanel,
          {
            backgroundColor: panelBackground,
            borderRightColor: panelBorder,
            transform: [{ translateX: sidebarTranslateX }],
          },
        ]}>
        {sidebarContent}
      </Animated.View>
    </View>
  );
}

export default function App() {
  const [otpContext, setOtpContext] = React.useState<{ phone: string; otp?: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <AppThemeProvider isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <>
              <Stack.Screen name="Home">
                {({ navigation }) => <HomeScreen onOpenLogin={() => navigation.navigate('Login')} />}
              </Stack.Screen>
              <Stack.Screen name="Login">
                {({ navigation }) => (
                  <SignInScreen
                    onBackToJobs={() => navigation.navigate('Home')}
                    onOpenSignUp={() => navigation.navigate('SignUp')}
                    onLoginSuccess={() => setIsAuthenticated(true)}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="SignUp">
                {({ navigation }) => (
                  <SignUpScreen
                    onBackToSignIn={() => navigation.navigate('Home')}
                    onRegistered={payload => {
                      setOtpContext(payload);
                      navigation.navigate('Otp');
                    }}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Otp">
                {({ navigation }) => (
                  <OtpVerificationScreen
                    phone={otpContext?.phone ?? ''}
                    initialOtp={otpContext?.otp}
                    onBack={() => navigation.goBack()}
                    onVerified={() => {
                      setIsAuthenticated(true);
                      setOtpContext(null);
                    }}
                  />
                )}
              </Stack.Screen>
            </>
          ) : (
            <Stack.Screen name="MainApp">
              {() => <MainAppNavigator onSignOut={() => setIsAuthenticated(false)} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  mobileScrollContent: {
    paddingBottom: 0,
  },
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  flexFill: {
    flex: 1,
  },
  modeOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    zIndex: 30,
    alignItems: 'center',
    rowGap: 8,
  },
  modeFloatingGroup: {
    alignItems: 'center',
    rowGap: 8,
  },
  modeOverlayMobile: {
    bottom: 84,
    paddingHorizontal: 16,
  },
  modeSwitch: {
    flexDirection: 'row',
    borderRadius: 999,
    backgroundColor: 'rgba(15,23,42,0.88)',
    padding: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },
  modeChip: {
    minWidth: 66,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeChipActive: {
    backgroundColor: '#ffffff',
  },
  modeChipText: {
    color: '#cbd5e1',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  modeChipTextActive: {
    color: '#0f172a',
  },
  modeStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    maxWidth: 220,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  modeStatusText: {
    flexShrink: 1,
    color: '#334155',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  headerShadow: {
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 15,
    elevation: 6,
    zIndex: 10,
  },
  header: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  logoWrap: {
    height: 24,
    width: 121,
    overflow: 'hidden',
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  navMobile: {
    columnGap: 8,
  },
  navPill: {
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  navPillMobile: {
    paddingHorizontal: 12,
  },
  navPillText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#3b82f6',
  },
  menuButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  menuButtonMobile: {
    width: 30,
    height: 30,
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
  desktopLayout: {
    flex: 1,
    backgroundColor: '#eff6ff',
    flexDirection: 'row',
  },
  desktopSidebar: {
    width: SIDEBAR_WIDTH,
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#dbeafe',
  },
  desktopMain: {
    flex: 1,
    backgroundColor: '#eff6ff',
  },
  desktopContent: {
    flex: 1,
  },
  desktopHeader: {
    height: 72,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dbeafe',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mobileShell: {
    flex: 1,
    backgroundColor: '#eff6ff',
  },
  mobileContent: {
    flex: 1,
  },
  mobileHeader: {
    height: 72,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dbeafe',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  authHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  headerIconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconInner: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerMenuIcon: {
    width: 20,
    height: 20,
  },
  headerMenuGlyph: {
    width: 18,
    rowGap: 3,
  },
  headerMenuLine: {
    height: 2,
    borderRadius: 999,
    backgroundColor: '#334155',
  },
  authLogoWrap: {
    width: 122,
    height: 30,
    justifyContent: 'center',
  },
  authLogo: {
    width: '100%',
    height: '100%',
  },
  profileIconImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  themeToggleButton: {
    width: 38,
    height: 32,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeToggleIcon: {
    width: 18,
    height: 18,
  },
  sidebarOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,23,42,0.28)',
  },
  sidebarOverlayTouch: {
    flex: 1,
  },
  sidebarPanel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: SIDEBAR_WIDTH,
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#dbeafe',
    shadowColor: '#0f172a',
    shadowOffset: { width: 12, height: 0 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 18,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  sidebarEyebrow: {
    color: '#64748b',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sidebarTitle: {
    marginTop: 6,
    color: '#0f172a',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
  },
  sidebarCloseButton: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#eff6ff',
  },
  sidebarCloseText: {
    color: '#2563eb',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  sidebarNav: {
    flex: 1,
    rowGap: 8,
  },
  sidebarItem: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#f8fafc',
  },
  sidebarItemDark: {
    backgroundColor: '#1e293b',
  },
  sidebarItemActive: {
    backgroundColor: '#2563eb',
  },
  sidebarItemText: {
    color: '#334155',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  sidebarItemTextDark: {
    color: '#cbd5e1',
  },
  sidebarItemTextActive: {
    color: '#ffffff',
  },
  sidebarSignOutButton: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#dbeafe',
  },
  sidebarSignOutButtonDark: {
    backgroundColor: '#1e3a8a',
  },
  sidebarSignOutText: {
    color: '#1d4ed8',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  sidebarSignOutTextDark: {
    color: '#bfdbfe',
  },
});
