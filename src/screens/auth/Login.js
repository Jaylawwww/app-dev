import { useState, useEffect } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { IMG, ROUTES } from '../../utils';
import { authLogin } from '../../app/actions';

const COLORS = {
  background: '#F5F3EF',
  surface: '#FFFFFF',
  primary: '#1E3A5F',
  primaryLight: '#2E4A6F',
  accent: '#2D6A4F',
  text: '#1A1A1A',
  textMuted: '#5C5C5C',
  border: '#E5E2DC',
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.isLoading && auth.isError && auth.error) {
      Alert.alert('Login failed', auth.error);
    }
  }, [auth.isLoading, auth.isError, auth.error]);

  const handleLogin = () => {
    if (!username.trim() || !password) {
      Alert.alert(
        'Invalid credentials',
        'Please enter your username and password.',
      );
      return;
    }
    dispatch(authLogin({ username: username.trim(), password }));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.inner}>
        <View style={styles.logoWrap}>
          <Image
            source={IMG.LOGO}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue to Oracion</Text>

          <CustomTextInput
            label="Username"
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
            containerStyle={styles.inputWrap}
            textStyle={styles.input}
          />
          <CustomTextInput
            label="Password"
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            containerStyle={styles.inputWrap}
            textStyle={styles.input}
          />

          <CustomButton
            label="Sign in"
            containerStyle={styles.primaryButton}
            textStyle={styles.primaryButtonText}
            onPress={handleLogin}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.REGISTER)}
            activeOpacity={0.7}
          >
            <Text style={styles.footerLink}>Create account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrap: {
    marginBottom: 32,
  },
  logo: {
    width: 200,
    height: 72,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
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
    borderRadius: 10,
    color: COLORS.text,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginTop: 8,
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

export default Login;
