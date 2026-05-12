import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { IMG, ROUTES, COLORS, layout } from '../utils';
import { authLogout } from '../app/actions';
import { PAYMENTS_ENABLED } from '../config/features';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.wrap}>
      <Image source={IMG.LOGO} style={styles.logo} />
      <Text style={styles.title}>Home</Text>
      <Text style={styles.caption}>
        Auth stack hands off to this main stack after the login API fills Redux session state.
      </Text>

      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => navigation.navigate(ROUTES.PROFILE)}
      >
        <Text style={styles.btnPrimaryText}>Profile</Text>
      </TouchableOpacity>

      {PAYMENTS_ENABLED ? (
        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => navigation.navigate(ROUTES.PAYMENTS_DUMMY)}
        >
          <Text style={styles.btnSecondaryText}>Payments (dummy)</Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        style={styles.btnDanger}
        onPress={() => dispatch(authLogout())}
      >
        <Text style={styles.btnDangerText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: layout.screenPaddingX,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logo: { width: 280, height: 90, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  caption: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  btnPrimary: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: layout.buttonRadius,
    marginTop: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  btnSecondary: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: layout.buttonRadius,
    marginTop: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  btnSecondaryText: { color: COLORS.primary, fontSize: 16, fontWeight: '600' },
  btnDanger: {
    backgroundColor: COLORS.danger,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: layout.buttonRadius,
    marginTop: 16,
    minWidth: 200,
    alignItems: 'center',
  },
  btnDangerText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default HomeScreen;
