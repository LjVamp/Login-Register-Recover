import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Style';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        {/* Error message example */}
        <Text style={{ color: 'red', textAlign: 'center' }}>{/* Email error here */}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {/* Error message example */}
        <Text style={{ color: 'red', textAlign: 'center' }}>{/* Password error here */}</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Recover')}>
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
