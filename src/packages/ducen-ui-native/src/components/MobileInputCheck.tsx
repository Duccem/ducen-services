import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-btr';

export function MobileInputCheck({ placeholder, onChange }) {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
    onChange && onChange(!checked);
  };
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <View style={styles.check}>
          <CheckBox color={'#9747FF'} checked={checked} onPress={handleChange} />
        </View>
        <Text onPress={handleChange} style={styles.label}>{placeholder}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginLeft: '5%',
  },
  input: {
    width: '90%',
    flexDirection: 'row',
    gap: 10,
  },
  check: {
    width: 20,
  },
  label: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
  }
});
