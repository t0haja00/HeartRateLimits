import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [age, setAge] = useState('');
  const [lowerLimit, setLowerLimit] = useState(0);
  const [upperLimit, setUpperLimit] = useState(0);

  // Function to handle age input change and calculate heart rate limits
  function change(text: string) {
    setAge(text);

    const trimmed = text.trim();
    const validNumber = /^\d+([.,]\d+)?$/.test(trimmed);

    // If the input is not a valid number or is just a decimal point, reset limits to 0
    if (!validNumber || trimmed === '.' || trimmed === ',') {
      setLowerLimit(0);
      setUpperLimit(0);
      return;
    }

    // Convert the input to a number, replacing comma with dot for decimal
    const ageValue = Number(trimmed.replace(',', '.'));
    const lower = (220 - ageValue) * 0.65;
    const upper = (220 - ageValue) * 0.85;

    setLowerLimit(lower);
    setUpperLimit(upper);
  }

  // Render the UI
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heart Rate Limit Calculator</Text>
      <Text style={styles.field}>Enter your age:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={text => change(text)}
        keyboardType='numeric'
        placeholder="Age"
      />
      <Text style={styles.field}>Lower Limit: {lowerLimit.toFixed(0)} bpm</Text>
      <Text style={styles.field}>Upper Limit: {upperLimit.toFixed(0)} bpm</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// Styles for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  field: {
    marginBottom: 10,
  },
  input: {
    width: 100,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
});
