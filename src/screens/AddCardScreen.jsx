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
  ImageBackground
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AiButton from '../components/AiButton';
import Toast from 'react-native-toast-message';

const AddCardScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleContinue = () => {
    if (!name || !expDate || !cvv|| !cardNumber ) {
      Toast.show({
            type: 'error',
            text1: "Please fill all required fields",
            visibilityTime : '3000',
            position: 'bottom'
          })
      return;
    }

    console.log('Form submitted:', { name,});
  };

  const handleGoBack = () => {
    navigation.navigate('ManageCardScreen');
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
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleGoBack}
            activeOpacity={0.8}
          >
            {isDarkMode ?
            <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
            : <Ionicons name="arrow-back" size={26} color="#333334" />}
          </TouchableOpacity>

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

            <View style={styles.inputContainer}>
              <Text style={[styles.label, isDarkMode && styles.allText]}>Card Number</Text>
              <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                placeholder="Enter Card Number"
                placeholderTextColor="#A1A0A0"
                value={cardNumber}
                onChangeText={setCardNumber}
              />
            </View>

              <View style={styles.inputContainer}>
              <Text style={[styles.label, isDarkMode && styles.allText]}>Name on Card</Text>
              <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                placeholder="Enter Name on Card"
                placeholderTextColor="#A1A0A0"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.twoInputContainer}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, isDarkMode && styles.allText]}>Exp Date</Text>
              <TextInput
                style={[styles.expInput, isDarkMode && styles.expInputDark]}
                placeholder="Exp Date"
                placeholderTextColor="#A1A0A0"
                value={expDate}
                onChangeText={setExpDate}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, isDarkMode && styles.allText]}>CVV</Text>
              <TextInput
                style={[styles.cvvInput, isDarkMode && styles.cvvInputDark]}
                placeholder="Enter CVV"
                placeholderTextColor="#A1A0A0"
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
            </View>

           <TouchableOpacity style={styles.buttonWrapper} onPress={handleContinue}>
  {
    isDarkMode ? (
      <View style={[styles.continueButton, { backgroundColor: '#FFFFFF' }]}>
        <Text style={[styles.continueButtonText, {color:'#5939C2'}]}>+Add Card</Text>
      </View>
    ) : (
      <LinearGradient
        colors={['#DCE8FF', '#ECF0FF', '#FFFEFE', '#DBE8FF', '#E4E4FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.continueButton}
      >
        <Text style={styles.continueButtonText}>+Add Card</Text>
      </LinearGradient>
    )
  }
</TouchableOpacity>

          </View>
        </View>
        <AiButton/>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 21,
    backgroundColor: 'transparent',
    paddingTop: 50,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  allText:{
    color: '#D9D9D9'
  },
  cvvInputDark:{
    color: '#FFFFFF'
  },
  expInputDark: {
    color: '#FFFFFF'
  },
  inputDark: {
    color: '#FFFFFF'
  },
  backArrow: {
    fontSize: 100,
    color: '#333334',
    fontWeight: 'bold',
  },
  iconWrapper: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, 
    outlineStyle: 'none'
  },
  switchIcon: {
    width: 17,
    height: 17,
  },
  twoInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
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
    paddingTop: 30 
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingVertical: 40,
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
  expInput: {
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 17,
    fontSize: 15,
    width: 130,
    color: '#333334',
    borderColor: '#E1E0E0',
    outlineStyle: 'none',
  },
  cvvInput: {
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 17,
    fontSize: 15,
    width: 130,
    color: '#333334',
    borderColor: '#E1E0E0',
    outlineStyle: 'none',
  },
  buttonWrapper: {
    width: 300,
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

export default AddCardScreen;