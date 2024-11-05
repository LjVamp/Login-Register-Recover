import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, Switch, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function Profile({ navigation }) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('currentUser');
    Alert.alert('Logout', 'You have been logged out.');
    navigation.navigate('Login');
  };

  const dynamicStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appContainer}>
        {/* Profile Section */}
        <View style={[styles.profileContainer, dynamicStyles.container]}>
          {/* Header with Menu and Notification Icons */}
          <View style={styles.header}>
            <TouchableOpacity onPress={toggleSidebar} style={styles.menuIcon}>
              <Ionicons name="menu" size={30} color={isDarkMode ? "#fff" : "#333"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationIcon}>
              <Ionicons name="notifications" size={30} color={isDarkMode ? "#fff" : "#333"} />
            </TouchableOpacity>
          </View>

          {/* Avatar and Profile Details */}
          <Image source={require('../assets/ME.jpg')} style={styles.avatar} />
          <Text style={[styles.name, dynamicStyles.text]}>BANDIOLA, LEDY JOY D.</Text>
          <Text style={[styles.info, dynamicStyles.text]}>3rd Year, USTP CDO</Text>
          <Text style={[styles.info, dynamicStyles.text]}>bandiola.ledyjoy@gmail.com</Text>

          {/* Toggle for Light/Dark Mode */}
          <View style={styles.switchContainer}>
            <Text style={[styles.modeText, dynamicStyles.text]}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Sidebar */}
        {isSidebarVisible && (
          <View style={styles.sidebar}>
            <TouchableOpacity onPress={toggleSidebar} style={styles.closeIcon}>
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>

            {/* Sidebar Content */}
            <View style={styles.sidebarProfileContainer}>
              <Image source={require('../assets/ME.jpg')} style={styles.sidebarAvatar} />
              <Text style={styles.sidebarName}>BANDIOLA, LEDY JOY D.</Text>
              <Text style={styles.sidebarInfo}>Student</Text>
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>

            {/* Footer Text */}
            <View style={styles.sidebarFooter}>
              <Text style={styles.footerText}>© Bandiola, Ledy Joy D.</Text>
              <Text style={styles.footerText}>BSIT 3R7</Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

// Common Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
    position: 'relative',
  },
  profileContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  menuIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  notificationIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 150,
    marginBottom: 20,
    alignSelf: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  modeText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '70%',
    height: '100%',
    backgroundColor: '#4A4947',
    padding: 20,
    zIndex: 1000,
    justifyContent: 'space-between',
  },
  closeIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  sidebarProfileContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  sidebarAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  sidebarName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  sidebarInfo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  logoutButton: {
    alignSelf: 'center',
    backgroundColor: '#F0ECE5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 395,
  },
  logoutButtonText: {
    color: '#161A30',
    fontWeight: 'bold',
  },
  sidebarFooter: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '300',
  },
});

// Light Mode Styles
const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f4f8',
  },
  text: {
    color: '#333',
  },
});

// Dark Mode Styles
const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
  },
  text: {
    color: '#fff',
  },
});
