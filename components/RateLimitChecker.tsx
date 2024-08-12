import { useEffect, useState } from 'react';
import { getRateLimit } from '@/services/requests';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants';
import { errorToast } from '@/utils/toasts';
import i18n from '@/lang/i18n';

export function RateLimitChecker() {
  const [rateLimit, setRateLimit] = useState<{
    limit: number;
    remaining: number;
    reset: number;
    used: number;
  }>({ limit: 0, remaining: 0, reset: 0, used: 0 });
  const handleRefreshRateLimit = async () => {
    const response = await getRateLimit();
    setRateLimit(response.rate);
  };

  useEffect(() => {
    (async () => {
      try {
        await handleRefreshRateLimit();
      } catch (e) {
        errorToast(i18n.t('errorMessages.failedToFetch'));
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{i18n.t('searchRepositoriesScreen.remainingRateLimit')}</Text>
      <Text>
        {rateLimit.remaining}/{rateLimit.limit}
      </Text>
      <TouchableOpacity onPress={handleRefreshRateLimit} style={styles.refreshButton}>
        <Ionicons name="refresh" size={16} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  refreshButton: {
    backgroundColor: Colors.primaryOpacity,
    padding: 4,
    borderRadius: 6,
  },
});
