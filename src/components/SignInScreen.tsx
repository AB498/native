import React from 'react';
import {
  Alert,
  ActivityIndicator,
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
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { loginJobSeeker } from '../services/authApi';
import { useAppTheme } from '../theme/appTheme';

function LoginBadgeIcon() {
  return (
    <Svg width={26} height={26} viewBox="0 0 26 26">
      <Circle cx={13} cy={13} r={13} fill="#e8f0ff" />
      <Circle cx={10.5} cy={9.5} r={4} fill="#3d7bf0" />
      <Path
        d="M4.5 18.5c0-3.2 2.7-5.5 6-5.5s6 2.3 6 5.5v.5h-12v-.5Z"
        fill="#3d7bf0"
      />
      <Path d="M17 10.5h4.2v2H17zM18.5 9h2v5h-2z" fill="#3d7bf0" />
      <Circle cx={19.5} cy={12.5} r={4} stroke="#3d7bf0" strokeWidth={1.2} fill="none" />
    </Svg>
  );
}

function PhoneFieldIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M7.2 4.5c.7-.5 1.6-.3 2 .4l1.4 2.5c.4.7.2 1.6-.4 2l-1.1.8a1 1 0 0 0-.3 1.3c1 1.8 2.5 3.4 4.3 4.3a1 1 0 0 0 1.2-.2l1-.9c.6-.5 1.5-.5 2.1 0l2.3 1.7c.7.5.8 1.4.4 2.1l-.6 1c-.7 1.2-2 1.8-3.4 1.5-2.9-.7-5.7-2.5-8.1-4.9-2.4-2.4-4.1-5.2-4.9-8.1-.3-1.4.3-2.8 1.5-3.5l1-.5Z"
        fill="#63a0ff"
      />
    </Svg>
  );
}

function LockFieldIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M7 10V8a5 5 0 1 1 10 0v2h1.2c.7 0 1.3.6 1.3 1.3v7.4c0 .7-.6 1.3-1.3 1.3H5.8c-.7 0-1.3-.6-1.3-1.3v-7.4c0-.7.6-1.3 1.3-1.3H7Zm2 0h6V8a3 3 0 1 0-6 0v2Z"
        fill="#63a0ff"
      />
    </Svg>
  );
}

function EyeFieldIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M12 6.5c5 0 8.8 4.2 9.7 5.3.4.5.4 1.1 0 1.6-.9 1.1-4.7 5.3-9.7 5.3S3.2 14.5 2.3 13.4a1.3 1.3 0 0 1 0-1.6C3.2 10.7 7 6.5 12 6.5Zm0 9.3a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0-2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
        fill="#63a0ff"
      />
    </Svg>
  );
}

function EyeOffFieldIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M3.5 4.5 20.5 19.5"
        stroke="#63a0ff"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        d="M10.8 6.7a9.9 9.9 0 0 1 1.2-.2c5 0 8.8 4.2 9.7 5.3.4.5.4 1.1 0 1.6-.4.5-1.5 1.8-3.2 3"
        stroke="#63a0ff"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M14.6 14.9a3.5 3.5 0 0 1-4.8-4.8"
        stroke="#63a0ff"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M7.7 16.7c-2.4-1.4-4.4-3.6-5.4-4.9a1.3 1.3 0 0 0 0 1.6C3.2 14.5 7 18.7 12 18.7c1.4 0 2.7-.3 3.8-.7"
        stroke="#63a0ff"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function BackArrowIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path
        d="M14.8 5.8 8.6 12l6.2 6.2"
        stroke="#3d7bf0"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function AuthBackground() {
  const { colors } = useAppTheme();

  return (
    <>
      <View style={styles.loginBackdropTop}>
        <Svg
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
          viewBox="0 0 100 100"
          preserveAspectRatio="none">
          <Defs>
            <LinearGradient id="authBgGradient" x1="0%" y1="10%" x2="100%" y2="35%">
              <Stop offset="0%" stopColor="#6ea0f0" />
              <Stop offset="52%" stopColor="#b8cee8" />
              <Stop offset="100%" stopColor="#edf8ff" />
            </LinearGradient>
          </Defs>
          <Rect width="100" height="100" fill="url(#authBgGradient)" />
        </Svg>
      </View>
      <View style={[styles.loginBackdropBottom, { backgroundColor: colors.background }]} />
    </>
  );
}

export default function SignInScreen({
  onBackToJobs,
  onOpenSignUp,
  onLoginSuccess,
}: {
  onBackToJobs: () => void;
  onOpenSignUp: () => void;
  onLoginSuccess: () => void;
}) {
  const { width } = useWindowDimensions();
  const { isDarkMode, colors } = useAppTheme();
  const cardWidth = Math.min(Math.max(width - 40, 300), 520);
  const [showPassword, setShowPassword] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleLogin = React.useCallback(async () => {
    const normalizedPhone = phone.replace(/\s+/g, '');

    if (!/^01\d{9}$/.test(normalizedPhone)) {
      setError('Enter a valid mobile number in the format 01XXXXXXXXX.');
      return;
    }

    if (password.trim().length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const message = await loginJobSeeker({
        phone: normalizedPhone,
        password,
      });
      Alert.alert('Login successful', message, [{ text: 'Continue', onPress: onLoginSuccess }]);
    } catch (submissionError) {
      const message =
        submissionError instanceof Error ? submissionError.message : 'Unable to sign in right now.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [onLoginSuccess, password, phone]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.surface} />
      <View style={[styles.loginScreen, { backgroundColor: colors.background }]}>
        <AuthBackground />

        <View style={[styles.loginCard, { width: cardWidth, backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onBackToJobs}
            style={styles.backArrowButton}>
            <BackArrowIcon />
          </TouchableOpacity>

          <View style={styles.loginHeader}>
            <View style={styles.loginIconBubble}>
              <LoginBadgeIcon />
            </View>
            <Text style={[styles.loginTitle, { color: colors.text }]}>Job Seeker Login</Text>
          </View>

          <View style={styles.loginFormBlock}>
            <Text style={[styles.loginLabel, { color: colors.textMuted }]}>Mobile Number</Text>
            <View style={[styles.inputWrap, { backgroundColor: colors.input, borderColor: colors.border }]}>
              <View style={styles.leftIconWrap}>
                <PhoneFieldIcon />
              </View>
              <TextInput
                keyboardType="phone-pad"
                placeholder="01XXXXXXXXX"
                placeholderTextColor={colors.textSoft}
                value={phone}
                onChangeText={text => {
                  setPhone(text);
                  if (error) {
                    setError('');
                  }
                }}
                autoCapitalize="none"
                style={[styles.authInput, { color: colors.text }]}
              />
            </View>
          </View>

          <View style={styles.loginFormBlock}>
            <Text style={[styles.loginLabel, { color: colors.textMuted }]}>Password</Text>
            <View style={[styles.inputWrap, { backgroundColor: colors.input, borderColor: colors.border }]}>
              <View style={styles.leftIconWrap}>
                <LockFieldIcon />
              </View>
              <TextInput
                secureTextEntry={!showPassword}
                placeholder="Enter your password"
                placeholderTextColor={colors.textSoft}
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  if (error) {
                    setError('');
                  }
                }}
                style={[styles.authInput, { color: colors.text }]}
              />
              <Pressable
                onPress={() => setShowPassword(prev => !prev)}
                style={styles.rightIconWrap}>
                {showPassword ? <EyeOffFieldIcon /> : <EyeFieldIcon />}
              </Pressable>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.forgotPasswordButton}>
            <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>Forgot Your Password?</Text>
          </TouchableOpacity>

          {error ? <Text style={[styles.feedbackError, { color: colors.danger }]}>{error}</Text> : null}

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleLogin}
            disabled={isSubmitting}
            style={[styles.signInButton, { backgroundColor: colors.primaryStrong }, isSubmitting && styles.signInButtonDisabled]}>
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.signInButtonText}>SIGN IN</Text>
            )}
          </TouchableOpacity>

          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={[styles.orText, { color: colors.textSoft }]}>OR</Text>
            <View style={styles.orLine} />
          </View>

          <View style={styles.createAccountRow}>
            <Text style={[styles.createAccountPrefix, { color: colors.textMuted }]}>New to BhcJobs.com?</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={onOpenSignUp}>
              <Text style={[styles.createAccountText, { color: colors.primary }]}>Create an account</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onBackToJobs}
            style={styles.backToJobsButton}>
            <Text style={[styles.backToJobsText, { color: colors.textMuted }]}>Back to jobs</Text>
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
  loginScreen: {
    flex: 1,
    backgroundColor: '#fbfdff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  loginBackdropTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '54%',
  },
  loginBackdropBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '46%',
    backgroundColor: '#ffffff',
  },
  loginCard: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 28,
    paddingTop: 52,
    paddingBottom: 22,
    shadowColor: '#7d8ca6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 10,
  },
  backArrowButton: {
    position: 'absolute',
    top: 14,
    left: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f9ff',
  },
  loginHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    columnGap: 10,
  },
  loginIconBubble: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f9ff',
  },
  loginTitle: {
    color: '#3d7bf0',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  loginFormBlock: {
    marginBottom: 16,
  },
  loginLabel: {
    marginBottom: 8,
    color: '#3d475a',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  inputWrap: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cad4e3',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
  },
  leftIconWrap: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  rightIconWrap: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  authInput: {
    flex: 1,
    height: '100%',
    color: '#1f2937',
    fontSize: 14,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 0,
    marginBottom: 18,
  },
  forgotPasswordText: {
    color: '#3d7bf0',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  signInButton: {
    height: 46,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f7de9',
    shadowColor: '#3f7de9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 6,
  },
  signInButtonDisabled: {
    opacity: 0.75,
  },
  signInButtonText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '800',
  },
  feedbackError: {
    marginBottom: 12,
    color: '#dc2626',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 18,
    columnGap: 10,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#d5dde8',
  },
  orText: {
    color: '#6b7280',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
  },
  createAccountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    columnGap: 8,
    rowGap: 6,
  },
  createAccountPrefix: {
    color: '#3f4754',
    fontSize: 12,
    lineHeight: 18,
  },
  createAccountText: {
    color: '#3d7bf0',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
  },
  backToJobsButton: {
    alignSelf: 'center',
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  backToJobsText: {
    color: '#5d6b7f',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
});
