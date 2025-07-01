import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-toast-message';


const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

const handleContinue = async () => {
  if (!firstName || !lastName || !email || !password) {
    Toast.show({
      type: 'error',
      text1: "Please fill all required fields",
      visibilityTime : '3000',
      position: 'bottom'
    })
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    Toast.show({
      type: 'success',
      text1: 'User created successfully!',
      visibilityTime : '3000',
      position: 'bottom'
    })
    navigation.replace('LoginScreen');
    
  } catch (error) {
    console.error('Signup error:', error);
    Toast.show({
      type: 'error',
      text1: error.message,
      visibilityTime : '3000',
      position: 'bottom'
    })
  }
};
  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? '#020432' : '#FFFFFF' }}>
    <ImageBackground 
       source={
        isDarkMode
        ? require('../assets/bg-gradient-dark.png')
        : require('../assets/bg-gradient.png')
      } 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" 
        backgroundColor={isDarkMode ? "#020432" : "transparent"}
        translucent />
      <View style={styles.topRight}>
  <TouchableOpacity
   style={[
     styles.switchContainer,
     {
       backgroundColor: isDarkMode ? '#808ACA' : 'rgba(255, 255, 255, 0.9)',
     },
   ]}
   onPress={toggleSwitch}
   activeOpacity={0.8}
 >
 
             <View style={[styles.iconWrapper, !isDarkMode && { marginLeft: 'auto' }]}>
               <Image
                 source={
                   isDarkMode
                     ? require('../assets/moon-switch.png')
                     : require('../assets/sun-switch.png')
                 }
                 style={styles.switchIcon}
                 resizeMode="contain"
               />
             </View>
 <View
   style={[
     styles.switchThumb,
     isDarkMode && styles.switchThumbActive,
     {
       backgroundColor: isDarkMode ? '#615F87' : '#FFFFFF',
     },
   ]}
 />
           </TouchableOpacity>
</View>

        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>
            <Text style={[styles.title, isDarkMode && styles.allText]}>Tap2Save</Text>
            <Text style={[styles.subtitle, isDarkMode && styles.allText]}>Welcome! Please Enter Signup Details</Text>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, isDarkMode && styles.allText]}>First Name</Text>
              <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                placeholder="Enter First Name"
                placeholderTextColor="#A1A0A0"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, isDarkMode && styles.allText]}>Last Name</Text>
              <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                placeholder="Enter Last Name"
                placeholderTextColor="#A1A0A0"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, isDarkMode && styles.allText]}>Email</Text>
              <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                placeholder="Enter Email"
                placeholderTextColor="#A1A0A0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, isDarkMode && styles.allText]}>Password</Text>
              <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                placeholder="Enter Password"
                placeholderTextColor="#A1A0A0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>

           <TouchableOpacity style={styles.buttonWrapper} onPress={handleContinue}>
             {
               isDarkMode ? (
                 <View style={[styles.continueButton, { backgroundColor: '#FFFFFF' }]}>
                   <Text style={[styles.continueButtonText, {color:'#5939C2'}]}>Signup</Text>
                 </View>
               ) : (
                 <LinearGradient
                   colors={['#DCE8FF', '#ECF0FF', '#FFFEFE', '#DBE8FF', '#E4E4FF']}
                   start={{ x: 0, y: 0 }}
                   end={{ x: 1, y: 0 }}
                   style={styles.continueButton}
                 >
                   <Text style={styles.continueButtonText}>Signup</Text>
                 </LinearGradient>
               )
             }
           </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', 
  },
  iconWrapper: {
  width: 25,
  height: 25,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2, 
  outlineStyle: 'none'
},
allText:{
  color: '#D9D9D9'
},
switchIcon: {
  width: 17,
  height: 17,
},
  topRight: {
    position: 'absolute',
    top: 50,
    right: 21,
    zIndex: 10,
  },
 switchContainer: {
  width: 65,
  height: 31,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: 16,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start', 
  paddingHorizontal: 6,
  position: 'relative',
   borderWidth: 2,
  borderColor: '#FFFFFF',
},

inputDark:{
  color: "#FFFFFF"
},
  switchActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  switchThumb: {
    position: 'absolute',
    left: 3,
    width: 25,
    height: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    shadowColor: '#001',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  switchThumbActive: {
    transform: [{ translateX: 32 }],
  },
  switchIconLeft: {
    width: 17,
    height: 17,
  },
  switchIconRight: {
    width: 17,
    height: 17,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 21,
    paddingBottom: 50,
    paddingTop: 80
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF33',
    borderRadius: 21,
    marginBottom: 20,
    border: 2,
    borderColor: '#ffffff',
    maxHeight: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333334',
    textAlign: 'center',
    marginBottom: 9,
  },
  subtitle: {
    fontSize: 15,
    color: '#666667',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: '#333334',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 17,
    fontSize: 15,
    color: '#333334',
    borderColor: '#E1E0E0',
    outlineStyle: 'none',
  },
  buttonWrapper: {
    width: 150,
    alignSelf: 'center',
    marginHorizontal: 0,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 5,
  },
  continueButton: {
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
});

export default SignupScreen;