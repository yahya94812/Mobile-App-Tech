import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumberPress = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimalPress = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b === 0 ? NaN : a / b;
      default: return b;
    }
  };

  const handleOperatorPress = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const result = calculate(previousValue, inputValue, operator);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForNewValue(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (previousValue !== null && operator) {
      const result = calculate(previousValue, inputValue, operator);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForNewValue(true);
    }
  };

  const handlePlusMinus = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const Button = ({ text, onPress, style, textStyle }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.displayContainer}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Button text="C" onPress={clear} style={styles.functionButton} textStyle={styles.functionButtonText} />
        <Button text="+/-" onPress={handlePlusMinus} style={styles.functionButton} textStyle={styles.functionButtonText} />
        <Button text="%" onPress={() => setDisplay(String(parseFloat(display) / 100))} style={styles.functionButton} textStyle={styles.functionButtonText} />
        <Button text="÷" onPress={() => handleOperatorPress('÷')} style={styles.operatorButton} />
      </View>

      <View style={styles.buttonRow}>
        <Button text="7" onPress={() => handleNumberPress(7)} />
        <Button text="8" onPress={() => handleNumberPress(8)} />
        <Button text="9" onPress={() => handleNumberPress(9)} />
        <Button text="×" onPress={() => handleOperatorPress('×')} style={styles.operatorButton} />
      </View>

      <View style={styles.buttonRow}>
        <Button text="4" onPress={() => handleNumberPress(4)} />
        <Button text="5" onPress={() => handleNumberPress(5)} />
        <Button text="6" onPress={() => handleNumberPress(6)} />
        <Button text="-" onPress={() => handleOperatorPress('-')} style={styles.operatorButton} />
      </View>

      <View style={styles.buttonRow}>
        <Button text="1" onPress={() => handleNumberPress(1)} />
        <Button text="2" onPress={() => handleNumberPress(2)} />
        <Button text="3" onPress={() => handleNumberPress(3)} />
        <Button text="+" onPress={() => handleOperatorPress('+')} style={styles.operatorButton} />
      </View>

      <View style={styles.buttonRow}>
        <Button text="0" onPress={() => handleNumberPress(0)} style={styles.zeroButton} />
        <Button text="." onPress={handleDecimalPress} />
        <Button text="=" onPress={handleEquals} style={styles.operatorButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  displayContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'flex-end',
  },
  displayText: {
    color: '#fff',
    fontSize: 80,
    fontWeight: '300',
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  button: {
    flex: 1,
    height: 70,
    borderRadius: 35,
    marginHorizontal: 6,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zeroButton: {
    flex: 2.2,
    alignItems: 'flex-start',
    paddingLeft: 28,
  },
  operatorButton: {
    backgroundColor: '#FF9500',
  },
  functionButton: {
    backgroundColor: '#A5A5A5',
  },
  functionButtonText: {
    color: '#000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 32,
  },
});