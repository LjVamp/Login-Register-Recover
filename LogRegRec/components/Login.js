import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../Styles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) || {};
    if (email === '' || password === '') {
      setError("Email and password can't be empty.");
    } else if (!storedUsers[email]) {
      setError("Email doesn't exist.");
    } else if (storedUsers[email].password !== password) {
      setError('Incorrect password.');
    } else {
      setError('');
      await AsyncStorage.setItem('currentUser', email);
      navigation.navigate('Profile', { email }); // Pass email to Profile
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.title}>LOGIN</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError('');
          }}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Password"
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={(text) => {
              setPassword(text);
              setError('');
            }}
          />
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            onPress={() => setShowPassword(!showPassword)}
            style={styles.icon}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Recover')}>
          <Text style={styles.link}>Forget Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
