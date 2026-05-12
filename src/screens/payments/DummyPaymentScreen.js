import { useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../../components/CustomButton';
import { clearPaymentHistory, submitDummyPayment } from '../../app/actions';
import { COLORS, layout } from '../../utils/theme';

const DummyPaymentScreen = () => {
  const dispatch = useDispatch();
  const { items, isSubmitting } = useSelector(s => s.payment);
  const [amount, setAmount] = useState('9.99');
  const [label, setLabel] = useState('Sandbox-style demo');

  const onPay = () => {
    const amountNum = Number.parseFloat(String(amount), 10) || 0;
    dispatch(
      submitDummyPayment({
        amount: amountNum,
        label,
      }),
    );
  };

  const onClear = () => {
    Alert.alert(
      'Clear history',
      'Remove all dummy payment rows from Redux?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => dispatch(clearPaymentHistory()) },
      ],
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.lead}>
        Dummy flow only — swap saga for PayPal PayMongo sandbox when your course requires a real gateway.
      </Text>
      <TextInput
        style={styles.input}
        value={label}
        onChangeText={setLabel}
        placeholder="Description"
        placeholderTextColor={COLORS.textMuted}
      />
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        placeholder="Amount"
        placeholderTextColor={COLORS.textMuted}
      />
      <CustomButton
        label={isSubmitting ? 'Processing…' : 'Pay (dummy)'}
        onPress={onPay}
        disabled={isSubmitting}
        containerStyle={styles.payBtn}
        textStyle={styles.payBtnText}
      />
      <CustomButton
        label="Clear stored rows"
        onPress={onClear}
        containerStyle={styles.clearBtn}
        textStyle={styles.clearBtnText}
      />
      <Text style={styles.listTitle}>Stored in Redux (retrieve / delete via actions)</Text>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No rows yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowMain}>{item.label}</Text>
            <Text style={styles.rowSub}>
              {item.amount} · {item.provider} · {item.createdAt}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: layout.screenPaddingX,
    backgroundColor: COLORS.background,
  },
  lead: {
    color: COLORS.textMuted,
    marginBottom: 16,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: layout.inputRadius,
    padding: 12,
    marginBottom: 12,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
  },
  payBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: layout.buttonRadius,
    marginBottom: 8,
  },
  payBtnText: { color: '#fff', fontWeight: '600' },
  clearBtn: {
    backgroundColor: COLORS.surface,
    borderRadius: layout.buttonRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  clearBtnText: { color: COLORS.danger, fontWeight: '600' },
  listTitle: {
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  empty: { color: COLORS.textMuted },
  row: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
  },
  rowMain: { color: COLORS.text, fontWeight: '600' },
  rowSub: { color: COLORS.textMuted, fontSize: 12, marginTop: 4 },
});

export default DummyPaymentScreen;
