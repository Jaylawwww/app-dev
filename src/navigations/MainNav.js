import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../utils';
import { PAYMENTS_ENABLED } from '../config/features';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DummyPaymentScreen from '../screens/payments/DummyPaymentScreen';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.HOME}>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      {PAYMENTS_ENABLED ? (
        <Stack.Screen
          name={ROUTES.PAYMENTS_DUMMY}
          component={DummyPaymentScreen}
          options={{ title: 'Payments (dummy)' }}
        />
      ) : null}
    </Stack.Navigator>
  );
};

export default MainNavigation;
