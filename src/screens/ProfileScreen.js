import { Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { IMG, COLORS, layout } from '../utils';

const ProfileScreen = () => {
  const session = useSelector(s => s.auth.data);
  const user = session?.user;
  const tokenPreview = session?.token
    ? `${String(session.token).slice(0, 6)}…`
    : '—';

  return (
    <View style={styles.wrap}>
      <Image source={IMG.LOGO} style={styles.logo} />
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.meta}>User (from API via Redux):</Text>
      <Text style={styles.value}>
        {user?.username || user?.email || JSON.stringify(user || {})}
      </Text>
      <Text style={styles.metaSpaced}>Token preview:</Text>
      <Text style={styles.value}>{tokenPreview}</Text>
      <Text style={styles.hint}>
        Session is saved and cleared through Redux actions only; AsyncStorage is used only inside the persist config.
      </Text>
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
  logo: { width: 280, height: 100, marginBottom: 12 },
  title: { fontSize: 26, fontWeight: '700', color: COLORS.text },
  meta: { fontSize: 14, color: COLORS.textMuted, alignSelf: 'stretch' },
  metaSpaced: {
    fontSize: 14,
    color: COLORS.textMuted,
    alignSelf: 'stretch',
    marginTop: 16,
  },
  value: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
    alignSelf: 'stretch',
    marginTop: 4,
  },
  hint: {
    marginTop: 24,
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});

export default ProfileScreen;
