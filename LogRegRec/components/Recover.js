import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Style';

export default function Recover({ navigation }) {
  const [email, setEmail] = useState('');
  const [isReset, setIsReset] = useState(false); // Toggle between recover and reset

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBack}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>{isReset ? 'Reset Password' : 'Account Recovery'}</Text>
        
        {isReset ? (
          <>
            <Text>Enter new password for {email}</Text>
            <TextInput style={styles.input} placeholder="New Password" secureTextEntry />
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsReset(true)}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
