import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { useAppTheme } from '../theme/appTheme';

const SEARCH_URI =
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/fig2code_raster_2_45.png';

function HeroGradient() {
  return (
    <Svg
      pointerEvents="none"
      style={StyleSheet.absoluteFill}
      viewBox="0 0 100 100"
      preserveAspectRatio="none">
      <Defs>
        <LinearGradient id="heroBgGradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <Stop offset="0%" stopColor="#2563eb" stopOpacity="0.9" />
          <Stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
        </LinearGradient>
      </Defs>
      <Rect width="100" height="100" fill="url(#heroBgGradient)" />
    </Svg>
  );
}

function buildWavePath(phase: number) {
  const width = 6806;
  const height = 87;
  const baseline = 18;
  const amplitude = 8;
  const cycles = 2.4;
  const sampleCount = 100;
  const step = width / sampleCount;

  let path = '';

  for (let i = 0; i <= sampleCount; i += 1) {
    const x = i * step;
    const progress = x / width;
    const y =
      baseline + Math.sin(progress * Math.PI * 2 * cycles + phase) * amplitude;

    path += `${i === 0 ? 'M' : ' L'}${x} ${y}`;
  }

  return `${path} V${height} H0 Z`;
}

function HeroDividerSvg({ phase, fill }: { phase: number; fill: string }) {
  return (
    <View pointerEvents="none" style={styles.heroDivider}>
      <Svg width="100%" height="100%" viewBox="0 0 3806 87" preserveAspectRatio="none">
        <Path d={buildWavePath(phase)} fill={fill} />
      </Svg>
    </View>
  );
}

export default function HeroSection() {
  const { width } = useWindowDimensions();
  const { isDarkMode, colors } = useAppTheme();
  const isWide = width >= 640;
  const [wavePhase, setWavePhase] = React.useState(0);

  React.useEffect(() => {
    let frameId = 0;

    const animate = () => {
      setWavePhase(prev => (prev + 0.2) % (Math.PI * 2));
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <View style={styles.hero}>
      <HeroGradient />
      <View style={styles.heroContent}>
        <Text style={[styles.heroTitle, isWide && styles.heroTitleWide]}>
          #1 Platform for Saudi Jobs
        </Text>
        <Text style={[styles.heroSubtitle, isWide && styles.heroSubtitleWide]}>
          Apply for jobs in Saudi Arabia with verified employers. We connect
          {isWide ? '\n' : ' '}
          Bangladeshi workforce with high-demand Saudi Jobs.
        </Text>

        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search Job"
            placeholderTextColor={isDarkMode ? '#64748b' : '#9ca3af'}
            style={[styles.searchInput, { color: colors.text }]}
          />
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.searchButton, { backgroundColor: colors.primary }]}>
            <Image
              source={{ uri: SEARCH_URI }}
              style={styles.searchIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View pointerEvents="none" style={styles.heroWaveWrap}>
        <HeroDividerSvg phase={wavePhase} fill={colors.surface} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    position: 'relative',
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingTop: 64,
    paddingBottom: 140,
    minHeight: 430,
    justifyContent: 'center',
  },
  heroContent: {
    position: 'relative',
    width: '100%',
    maxWidth: 896,
    alignSelf: 'center',
    alignItems: 'center',
  },
  heroWaveWrap: {
    position: 'absolute',
    right: -16,
    bottom: -1,
    left: -16,
    height: 86,
  },
  heroDivider: {
    flex: 1,
  },
  heroTitle: {
    marginBottom: 24,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
  },
  heroTitleWide: {
    fontSize: 48,
    lineHeight: 56,
  },
  heroSubtitle: {
    marginBottom: 40,
    textAlign: 'center',
    color: '#dbeafe',
    fontSize: 18,
    lineHeight: 28,
  },
  heroSubtitleWide: {
    fontSize: 20,
    lineHeight: 30,
  },
  searchBar: {
    width: '100%',
    maxWidth: 672,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: '#ffffff',
    padding: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 6,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#111827',
    fontSize: 18,
  },
  searchButton: {
    width: 48,
    height: 48,
    flexShrink: 0,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
});
