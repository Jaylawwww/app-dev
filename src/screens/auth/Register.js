import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES, COLORS, layout } from '../../utils';
import { registerUser, registerReset } from '../../app/actions';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [accepted, setAccepted] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const registration = useSelector(s => s.registration);

  useEffect(() => {
    dispatch(registerReset());
  }, [dispatch]);

  useEffect(() => {
    if (!registration.isLoading && registration.error) {
      Alert.alert('Registration failed', String(registration.error));
    }
  }, [registration.isLoading, registration.error]);

  useEffect(() => {
    if (!registration.isLoading && registration.lastResponse) {
      Alert.alert('Success', 'You can sign in now.');
      navigation.navigate(ROUTES.LOGIN);
    }
  }, [registration.isLoading, registration.lastResponse, navigation]);

  const onRegister = () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert(
        'Missing fields',
        'Please fill in First Name and Last Name.',
      );
      return;
    }
    if (!birthdate.trim()) {
      Alert.alert(
        'Missing fields',
        'Please enter your birthdate (YYYY-MM-DD).',
      );
      return;
    }
    if (!accepted) {
      Alert.alert(
        'Terms and conditions',
        'You must accept the terms and conditions to register.',
      );
      return;
    }
    dispatch(
      registerUser({
        first_name: firstName.trim(),
        middle_name: middleName.trim(),
        last_name: lastName.trim(),
        birthdate: birthdate.trim(),
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>
              Join Oracion with your details below.
            </Text>

            <CustomTextInput
              label="First name"
              placeholder="Enter first name"
              value={firstName}
              onChangeText={setFirstName}
              containerStyle={styles.inputWrap}
              textStyle={styles.input}
            />
            <CustomTextInput
              label="Middle name (optional)"
              placeholder="Enter middle name"
              value={middleName}
              onChangeText={setMiddleName}
              containerStyle={styles.inputWrap}
              textStyle={styles.input}
            />
            <CustomTextInput
              label="Last name"
              placeholder="Enter last name"
              value={lastName}
              onChangeText={setLastName}
              containerStyle={styles.inputWrap}
              textStyle={styles.input}
            />
            <CustomTextInput
              label="Birthdate"
              placeholder="YYYY-MM-DD"
              value={birthdate}
              onChangeText={setBirthdate}
              containerStyle={styles.inputWrap}
              textStyle={styles.input}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.checkRow}
              onPress={() => setAccepted(!accepted)}
            >
              <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
                {accepted ? <Text style={styles.checkMark}>✓</Text> : null}
              </View>
              <Text style={styles.checkLabel}>
                I accept the Terms and Conditions
              </Text>
            </TouchableOpacity>

            <CustomButton
              label={registration.isLoading ? 'Submitting…' : 'Create account'}
              containerStyle={styles.primaryButton}
              textStyle={styles.primaryButtonText}
              onPress={onRegister}
              disabled={registration.isLoading}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.LOGIN)}
              activeOpacity={0.7}
            >
              <Text style={styles.footerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: layout.screenPaddingX,
    paddingVertical: 24,
    paddingBottom: 40,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: layout.cardRadius,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 24,
  },
  inputWrap: {
    marginBottom: 16,
  },
  input: {
    borderRadius: layout.inputRadius,
    color: COLORS.text,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 16,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.checkbox,
    borderColor: COLORS.checkbox,
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  checkLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: COLORS.text,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: layout.buttonRadius,
    overflow: 'hidden',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 15,
    color: COLORS.textMuted,
  },
  footerLink: {
    fontSize: 15,
    color: COLORS.accent,
    fontWeight: '600',
  },
});

export default Register;
