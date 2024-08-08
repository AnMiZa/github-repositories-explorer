import { View, TouchableOpacity, ActivityIndicator, Text, StyleSheet } from 'react-native';

type ButtonProps = {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
};

export function Button({ label, onPress, isLoading = false, isDisabled = false }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, isDisabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={isLoading || isDisabled}>
      {!isLoading ? <Text style={styles.buttonLabel}>{label}</Text> : <ActivityIndicator />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 6,
    backgroundColor: '#0b5474',
    width: '100%',
    marginVertical: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
  },
});
