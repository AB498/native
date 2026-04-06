import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { verifyPhoneOtp } from '../services/authApi';
import { useAppTheme } from '../theme/appTheme';

type Props = {
  phone: string;
  initialOtp?: string;
  onBack: () => void;
  onVerified: () => void;
};

function AuthBackground() {
  const { colors } = useAppTheme();

  return (
    <>
      <View style={styles.backdropTop}>
        <Svg
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
          viewBox="0 0 100 100"
          preserveAspectRatio="none">
          <Defs>
            <LinearGradient id="otpBgGradient" x1="0%" y1="10%" x2="100%" y2="35%">
              <Stop offset="0%" stopColor="#6ea0f0" />
              <Stop offset="52%" stopColor="#b8cee8" />
              <Stop offset="100%" stopColor="#edf8ff" />
            </LinearGradient>
          </Defs>
          <Rect width="100" height="100" fill="url(#otpBgGradient)" />
        </Svg>
      </View>
      <View style={[styles.backdropBottom, { backgroundColor: colors.background }]} />
    </>
  );
}

function ShieldIcon() {
  return (
    <Svg width={54} height={54} viewBox="0 0 54 54">
      <Path
        d="M27 4.5 42 11v12c0 10.4-6.3 19.8-15 24.5C18.3 42.8 12 33.4 12 23V11l15-6.5Z"
        stroke="#316fea"
        strokeWidth={3}
        fill="none"
        strokeLinejoin="round"
      />
      <Path
        d="m21.8 27.4 3.8 3.7 7.2-8"
        stroke="#316fea"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function formatCountdown(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default function OtpVerificationScreen({
  phone,
  initialOtp,
  onBack,
  onVerified,
}: Props) {
  const { width } = useWindowDimensions();
  const { isDarkMode, colors } = useAppTheme();
  const cardWidth = Math.min(Math.max(width - 40, 320), 560);
  const [digits, setDigits] = React.useState(['', '', '', '']);
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [countdown, setCountdown] = React.useState(4 * 60 + 48);
  const inputsRef = React.useRef<Array<TextInput | null>>([]);

  React.useEffect(() => {
    if (initialOtp && /^\d{4}$/.test(initialOtp)) {
      setDigits(initialOtp.split(''));
    }
  }, [initialOtp]);

  React.useEffect(() => {
    if (countdown <= 0) {
      return undefined;
    }

    const timer = setInterval(() => {
      setCountdown(current => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const otpValue = digits.join('');

  const handleChangeDigit = React.useCallback(
    (index: number, value: string) => {
      const nextChar = value.replace(/\D/g, '').slice(-1);

      setDigits(current => {
        const next = [...current];
        next[index] = nextChar;
        return next;
      });

      if (error) {
        setError('');
      }

      if (nextChar && index < 3) {
        inputsRef.current[index + 1]?.focus();
      }
    },
    [error],
  );

  const handleKeyPress = React.useCallback(
    (index: number, key: string) => {
      if (key === 'Backspace' && !digits[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    },
    [digits],
  );

  const handleSubmit = React.useCallback(async () => {
    if (!/^\d{4}$/.test(otpValue)) {
      setError('Enter the 4-digit OTP code.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const message = await verifyPhoneOtp({
        phone,
        otp: otpValue,
      });

      Alert.alert('Verification successful', message, [
        {
          text: 'Go to Sign In',
          onPress: onVerified,
        },
      ]);
    } catch (submissionError) {
      const message =
        submissionError instanceof Error ? submissionError.message : 'Unable to verify OTP right now.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [onVerified, otpValue, phone]);

  const handleResend = React.useCallback(() => {
    setCountdown(4 * 60 + 48);
    setError('');
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.surface} />
      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <AuthBackground />
        <View style={[styles.card, { width: cardWidth, backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>OTP Verification</Text>
          <View style={styles.iconWrap}>
            <ShieldIcon />
          </View>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            We&apos;ve sent a 4-digit OTP to <Text style={[styles.phoneText, { color: colors.primary }]}>{phone}</Text>
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>Kindly enter it below to continue.</Text>

          <Text style={[styles.timerText, { color: colors.danger }]}>OTP will expire in {formatCountdown(countdown)}</Text>

          <View style={styles.otpRow}>
            {digits.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => {
                  inputsRef.current[index] = ref;
                }}
                value={digit}
                onChangeText={value => handleChangeDigit(index, value)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                style={[styles.otpInput, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]}
              />
            ))}
          </View>

          <View style={styles.inlineRow}>
            <Text style={[styles.inlineText, { color: colors.textMuted }]}>Didn&apos;t get the code?</Text>
            <Pressable onPress={handleResend}>
              <Text style={[styles.resendText, { color: colors.primary }]}>Send again</Text>
            </Pressable>
          </View>

          {initialOtp ? <Text style={[styles.devOtpText, { color: colors.textSoft }]}>OTP: {initialOtp}</Text> : null}
          {error ? <Text style={[styles.errorText, { color: colors.danger }]}>{error}</Text> : null}

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleSubmit}
            disabled={isSubmitting}
              style={[styles.submitButton, { backgroundColor: colors.primaryStrong }, isSubmitting && styles.submitButtonDisabled]}>
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} onPress={onBack} style={styles.backButton}>
            <Text style={[styles.backButtonText, { color: colors.textMuted }]}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  screen: {
    flex: 1,
    backgroundColor: '#fbfdff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  backdropTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '52%',
  },
  backdropBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '48%',
    backgroundColor: '#ffffff',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 34,
    paddingVertical: 36,
    shadowColor: '#7d8ca6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 10,
    alignItems: 'center',
  },
  title: {
    color: '#2b3442',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '800',
    marginBottom: 18,
  },
  iconWrap: {
    marginBottom: 18,
  },
  subtitle: {
    color: '#4b5563',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  phoneText: {
    color: '#ff5f5f',
  },
  timerText: {
    marginTop: 26,
    color: '#316fea',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  otpRow: {
    flexDirection: 'row',
    columnGap: 12,
    marginTop: 14,
    marginBottom: 22,
  },
  otpInput: {
    width: 54,
    height: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cfd8e3',
    backgroundColor: '#ffffff',
    color: '#111827',
    fontSize: 24,
    fontWeight: '700',
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  inlineText: {
    color: '#4b5563',
    fontSize: 13,
    lineHeight: 20,
  },
  resendText: {
    color: '#9ca3af',
    fontSize: 13,
    lineHeight: 20,
  },
  devOtpText: {
    marginTop: 12,
    color: '#316fea',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
  },
  errorText: {
    marginTop: 12,
    color: '#dc2626',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  submitButton: {
    width: '100%',
    marginTop: 18,
    height: 54,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#316fea',
  },
  submitButtonDisabled: {
    opacity: 0.75,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  backButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    color: '#64748b',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
});
