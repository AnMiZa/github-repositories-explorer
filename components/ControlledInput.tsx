import { TextInput, View, StyleSheet } from 'react-native';
import { Control, Controller, FieldValues, UseControllerProps } from 'react-hook-form';

type ControlledInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: string;
  placeholder: string;

  additionalClassnames?: string;
  isPasswordInput?: boolean;
} & UseControllerProps<T>;

export function ControlledInput<T extends FieldValues>({
  control,
  name,
  placeholder,
}: ControlledInputProps<T>) {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
        <View style={styles.input}>
          <View>
            <TextInput
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder={placeholder}
              autoCapitalize="none"
            />
          </View>
        </View>
      )}
      name={name}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    paddingHorizontal: 12,
    width: '100%',
    borderColor: 'rgba(11,84,116,0.30)',
    backgroundColor: 'rgba(11,84,116,0.16)',
  },
});
