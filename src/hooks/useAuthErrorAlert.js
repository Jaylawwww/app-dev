import { useEffect } from 'react';
import { Alert } from 'react-native';

/**
 * Surfaces auth API errors from Redux (single place — DRY vs duplicating in every screen).
 */
export function useAuthErrorAlert(authSlice) {
  useEffect(() => {
    if (!authSlice?.isLoading && authSlice?.isError && authSlice?.error) {
      Alert.alert('Login failed', String(authSlice.error));
    }
  }, [authSlice?.isLoading, authSlice?.isError, authSlice?.error]);
}
