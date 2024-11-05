import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Style';

export default function Register({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Email Address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {/* Error message example */}
        <Text style={{ color: 'red', textAlign: 'center' }}>{/* Password confirmation error here */}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
