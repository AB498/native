import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { registerJobSeeker } from '../services/authApi';
import { useAppTheme } from '../theme/appTheme';

function UserFieldIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Circle cx={12} cy={8} r={4.2} fill="#98a1af" />
      <Path d="M5 19c0-3.1 3.1-5.3 7-5.3s7 2.2 7 5.3v1H5v-1Z" fill="#98a1af" />
    </Svg>
  );
}

function PhoneFieldIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path
        d="M7.2 4.5c.7-.5 1.6-.3 2 .4l1.4 2.5c.4.7.2 1.6-.4 2l-1.1.8a1 1 0 0 0-.3 1.3c1 1.8 2.5 3.4 4.3 4.3a1 1 0 0 0 1.2-.2l1-.9c.6-.5 1.5-.5 2.1 0l2.3 1.7c.7.5.8 1.4.4 2.1l-.6 1c-.7 1.2-2 1.8-3.4 1.5-2.9-.7-5.7-2.5-8.1-4.9-2.4-2.4-4.1-5.2-4.9-8.1-.3-1.4.3-2.8 1.5-3.5l1-.5Z"
        fill="#98a1af"
      />
    </Svg>
  );
}

function PassportFieldIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Rect x={5} y={4} width={14} height={16} rx={2.5} fill="#98a1af" />
      <Rect x={8} y={7} width={8} height={1.6} rx={0.8} fill="#ffffff" />
      <Circle cx={12} cy={13} r={2.6} fill="#ffffff" />
      <Path d="M9.5 13h5M12 10.5v5" stroke="#98a1af" strokeWidth={0.9} />
    </Svg>
  );
}

function MailFieldIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Rect x={4} y={6} width={16} height={12} rx={2.2} fill="#98a1af" />
      <Path d="m6.5 8.5 5.5 4 5.5-4" stroke="#ffffff" strokeWidth={1.5} fill="none" />
    </Svg>
  );
}

function LockFieldIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path
        d="M7 10V8a5 5 0 1 1 10 0v2h1.2c.7 0 1.3.6 1.3 1.3v7.4c0 .7-.6 1.3-1.3 1.3H5.8c-.7 0-1.3-.6-1.3-1.3v-7.4c0-.7.6-1.3 1.3-1.3H7Zm2 0h6V8a3 3 0 1 0-6 0v2Z"
        fill="#98a1af"
      />
    </Svg>
  );
}

function EyeFieldIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path
        d="M12 6.5c5 0 8.8 4.2 9.7 5.3.4.5.4 1.1 0 1.6-.9 1.1-4.7 5.3-9.7 5.3S3.2 14.5 2.3 13.4a1.3 1.3 0 0 1 0-1.6C3.2 10.7 7 6.5 12 6.5Zm0 9.3a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0-2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
        fill="#98a1af"
      />
    </Svg>
  );
}

function EyeOffFieldIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path d="M3.5 4.5 20.5 19.5" stroke="#98a1af" strokeWidth={1.8} strokeLinecap="round" />
      <Path
        d="M10.8 6.7a9.9 9.9 0 0 1 1.2-.2c5 0 8.8 4.2 9.7 5.3.4.5.4 1.1 0 1.6-.4.5-1.5 1.8-3.2 3"
        stroke="#98a1af"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M14.6 14.9a3.5 3.5 0 0 1-4.8-4.8"
        stroke="#98a1af"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M7.7 16.7c-2.4-1.4-4.4-3.6-5.4-4.9a1.3 1.3 0 0 0 0 1.6C3.2 14.5 7 18.7 12 18.7c1.4 0 2.7-.3 3.8-.7"
        stroke="#98a1af"
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
        stroke="#3576ef"
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
      <View style={styles.backdropTop}>
        <Svg
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
          viewBox="0 0 100 100"
          preserveAspectRatio="none">
          <Defs>
            <LinearGradient id="signupBgGradient" x1="0%" y1="10%" x2="100%" y2="35%">
              <Stop offset="0%" stopColor="#6ea0f0" />
              <Stop offset="52%" stopColor="#b8cee8" />
              <Stop offset="100%" stopColor="#edf8ff" />
            </LinearGradient>
          </Defs>
          <Rect width="100" height="100" fill="url(#signupBgGradient)" />
        </Svg>
      </View>
      <View style={[styles.backdropBottom, { backgroundColor: colors.background }]} />
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  const { colors } = useAppTheme();
  return (
    <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>
      {children}
      <Text style={[styles.required, { color: colors.danger }]}> *</Text>
    </Text>
  );
}

function Field({
  icon,
  placeholder,
  trailing,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType,
}: {
  icon?: React.ReactNode;
  placeholder: string;
  trailing?: React.ReactNode;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'number-pad' | 'phone-pad';
}) {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.inputWrap, { backgroundColor: colors.input, borderColor: colors.border }]}>
      {icon ? <View style={styles.leftIconWrap}>{icon}</View> : null}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textSoft}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
        style={[styles.authInput, { color: colors.text }]}
      />
      {trailing ? <View style={styles.rightIconWrap}>{trailing}</View> : null}
    </View>
  );
}

type Props = {
  onBackToSignIn: () => void;
  onRegistered: (payload: { phone: string; otp?: string }) => void;
};

export default function SignUpScreen({ onBackToSignIn, onRegistered }: Props) {
  const { width } = useWindowDimensions();
  const { isDarkMode, colors } = useAppTheme();
  const cardWidth = Math.min(Math.max(width - 40, 300), 410);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [passportNo, setPassportNo] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const clearError = React.useCallback(() => {
    if (error) {
      setError('');
    }
  }, [error]);

  const handleRegister = React.useCallback(async () => {
    const normalizedPhone = phone.replace(/\s+/g, '');
    const normalizedEmail = email.trim();

    if (fullName.trim().length < 3) {
      setError('Enter your full name.');
      return;
    }

    if (!/^01\d{9}$/.test(normalizedPhone)) {
      setError('Enter a valid mobile number in the format 01XXXXXXXXX.');
      return;
    }

    if (!dateOfBirth.trim()) {
      setError('Enter your date of birth.');
      return;
    }

    if (passportNo.trim().length < 4) {
      setError('Enter a valid passport number.');
      return;
    }

    if (!gender.trim()) {
      setError('Enter your gender.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password and confirm password must match.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const result = await registerJobSeeker({
        name: fullName.trim(),
        phone: normalizedPhone,
        dateOfBirth: dateOfBirth.trim(),
        passportNo: passportNo.trim(),
        gender: gender.trim(),
        email: normalizedEmail,
        password,
      });

      onRegistered({ phone: normalizedPhone, otp: result.otp });
    } catch (submissionError) {
      const message =
        submissionError instanceof Error ? submissionError.message : 'Unable to create your account.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [confirmPassword, dateOfBirth, email, fullName, gender, onRegistered, passportNo, password, phone]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.surface} />
      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <AuthBackground />
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={[styles.card, { width: cardWidth, backgroundColor: colors.surface, borderColor: colors.border }]}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onBackToSignIn}
              style={styles.backArrowButton}>
              <BackArrowIcon />
            </TouchableOpacity>

            <Text style={[styles.title, { color: colors.text }]}>Create an account</Text>

            <View style={styles.fieldBlock}>
              <Label>Full Name</Label>
              <Field
                icon={<UserFieldIcon />}
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={text => {
                  clearError();
                  setFullName(text);
                }}
              />
            </View>

            <View style={styles.fieldBlock}>
              <Label>Mobile Number</Label>
              <Field
                icon={<PhoneFieldIcon />}
                placeholder="01XXXXXXXXX"
                value={phone}
                onChangeText={text => {
                  clearError();
                  setPhone(text);
                }}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.fieldBlock}>
              <Label>Date of Birth</Label>
              <Field
                placeholder="YYYY-MM-DD"
                value={dateOfBirth}
                onChangeText={text => {
                  clearError();
                  setDateOfBirth(text);
                }}
              />
            </View>

            <View style={styles.fieldBlock}>
              <Label>Passport No</Label>
              <Field
                icon={<PassportFieldIcon />}
                placeholder="Enter your passport number"
                value={passportNo}
                onChangeText={text => {
                  clearError();
                  setPassportNo(text);
                }}
              />
            </View>

            <View style={styles.fieldBlock}>
              <Label>Gender</Label>
              <Field
                icon={<UserFieldIcon />}
                placeholder="Male / Female / Other"
                value={gender}
                onChangeText={text => {
                  clearError();
                  setGender(text);
                }}
              />
            </View>

            <View style={styles.fieldBlock}>
              <Label>Email Address</Label>
              <Field
                icon={<MailFieldIcon />}
                placeholder="Enter your email address"
                value={email}
                onChangeText={text => {
                  clearError();
                  setEmail(text);
                }}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.fieldBlock}>
              <Label>Password</Label>
              <Field
                icon={<LockFieldIcon />}
                placeholder="Enter your new password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={text => {
                  clearError();
                  setPassword(text);
                }}
                trailing={
                  <Pressable onPress={() => setShowPassword(prev => !prev)}>
                    {showPassword ? <EyeOffFieldIcon /> : <EyeFieldIcon />}
                  </Pressable>
                }
              />
            </View>

            <View style={styles.fieldBlock}>
              <Label>Confirm Password</Label>
              <Field
                icon={<LockFieldIcon />}
                placeholder="Enter your new password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={text => {
                  clearError();
                  setConfirmPassword(text);
                }}
                trailing={
                  <Pressable onPress={() => setShowConfirmPassword(prev => !prev)}>
                    {showConfirmPassword ? <EyeOffFieldIcon /> : <EyeFieldIcon />}
                  </Pressable>
                }
              />
            </View>

            <View style={styles.agreementRow}>
              <View style={styles.checkbox}>
                <PathCheckbox />
              </View>
              <Text style={[styles.agreementText, { color: colors.textMuted }]}>
                By continuing, you agree to our <Text style={[styles.linkText, { color: colors.primary }]}>Terms of Service</Text>{' '}
                and <Text style={[styles.linkText, { color: colors.primary }]}>Privacy Policy</Text>
              </Text>
            </View>

            {error ? <Text style={[styles.feedbackError, { color: colors.danger }]}>{error}</Text> : null}

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleRegister}
              disabled={isSubmitting}
              style={[styles.signUpButton, { backgroundColor: colors.primaryStrong }, isSubmitting && styles.signUpButtonDisabled]}>
              {isSubmitting ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.signUpButtonText}>SIGN UP</Text>
              )}
            </TouchableOpacity>

            <View style={styles.orRow}>
              <View style={styles.orLine} />
              <Text style={[styles.orText, { color: colors.textSoft }]}>OR</Text>
              <View style={styles.orLine} />
            </View>

            <View style={styles.signInRow}>
              <Text style={[styles.signInPrefix, { color: colors.textMuted }]}>Already have an account?</Text>
              <TouchableOpacity activeOpacity={0.85} onPress={onBackToSignIn}>
                <Text style={[styles.signInText, { color: colors.primary }]}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function PathCheckbox() {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12">
      <Rect width={12} height={12} rx={2} fill="#316fea" />
      <Path d="M2.4 6.3 4.8 8.5 9.5 3.7" stroke="#ffffff" strokeWidth={1.7} fill="none" />
    </Svg>
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
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
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
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 18,
    shadowColor: '#7d8ca6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 10,
  },
  backArrowButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f9ff',
  },
  title: {
    marginBottom: 18,
    textAlign: 'center',
    color: '#3576ef',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  fieldBlock: {
    marginBottom: 12,
  },
  fieldLabel: {
    marginBottom: 7,
    color: '#4b5563',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  required: {
    color: '#ef4444',
  },
  inputWrap: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d8e3',
    borderRadius: 7,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  leftIconWrap: {
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  rightIconWrap: {
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  authInput: {
    flex: 1,
    height: '100%',
    color: '#111827',
    fontSize: 12,
  },
  agreementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 2,
    marginBottom: 16,
  },
  checkbox: {
    marginTop: 1,
    marginRight: 8,
  },
  agreementText: {
    flex: 1,
    color: '#4b5563',
    fontSize: 11,
    lineHeight: 16,
  },
  linkText: {
    color: '#316fea',
    textDecorationLine: 'underline',
  },
  signUpButton: {
    height: 36,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f7de9',
    shadowColor: '#3f7de9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  signUpButtonDisabled: {
    opacity: 0.75,
  },
  signUpButtonText: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '800',
  },
  feedbackError: {
    marginBottom: 10,
    color: '#dc2626',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 14,
    columnGap: 8,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#dce3ec',
  },
  orText: {
    color: '#6b7280',
    fontSize: 11,
    lineHeight: 16,
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 6,
  },
  signInPrefix: {
    color: '#4b5563',
    fontSize: 11,
    lineHeight: 16,
  },
  signInText: {
    color: '#316fea',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '700',
  },
});
