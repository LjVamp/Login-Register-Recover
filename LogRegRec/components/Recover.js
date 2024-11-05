import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../Styles';

export default function Recover({ navigation }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stage, setStage] = useState('recover'); // 'recover' or 'reset'
  const [error, setError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRecover = async () => {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || {};
    if (email === '') {
      setError("Email can't be empty.");
    } else if (!users[email]) {
      setError("Email doesn't exist.");
    } else {
      setError('');
      setStage('reset'); // Switch to reset stage
    }
  };

  const handleResetPassword = async () => {
    if (newPassword === '' || confirmPassword === '') {
      setError("Both fields are required.");
    } else if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      const users = JSON.parse(await AsyncStorage.getItem('users')) || {};
      if (users[email]) {
        users[email].password = newPassword;
        await AsyncStorage.setItem('users', JSON.stringify(users));
        Alert.alert("Reset Successfully", "Your password has been updated.");
        navigation.navigate('Login'); // Navigate to login after reset
      } else {
        setError("User not found.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        {stage === 'recover' ? (
          <>
            <Text style={styles.title}>ACCOUNT RECOVERY</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleRecover}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Back</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>RESET PASSWORD</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Text style={{ textAlign: 'center', marginBottom: 20 }}>Enter new password for {email}</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={{ flex: 1 }}
                placeholder="New Password"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <MaterialIcons
                name={showNewPassword ? "visibility" : "visibility-off"}
                size={24}
                onPress={() => setShowNewPassword(!showNewPassword)}
                style={styles.icon}
              />
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                style={{ flex: 1 }}
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <MaterialIcons
                name={showConfirmPassword ? "visibility" : "visibility-off"}
                size={24}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.icon}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Go back to Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
