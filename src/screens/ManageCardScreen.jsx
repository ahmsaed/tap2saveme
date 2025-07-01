import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AiButton from '../components/AiButton';
import BalanceCard from '../components/BalanceCard';
import { LinearGradient } from 'expo-linear-gradient';

const ManageCardScreen = ({ navigation }) => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => {
    setIsDarkMode(prevMode => !prevMode);
  };


  const handleGoBack = () => {
    navigation.navigate('MainPageScreen');
  };

  const handleGoCard = () => {
    navigation.navigate('AddCardScreen')
  }

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
            <BalanceCard
            darkMode={isDarkMode}/>
            <BalanceCard 
            badgeColor="white"
            badgeTextColor='#B79EEE'
            badgeBordorColor="#B79EEE"
            text="Make Primary"
            balance="33,044"
            name="Mitchell Starc"
            darkMode={isDarkMode}
            style={{padding:10}}/>
            <TouchableOpacity style={styles.buttonWrapper} onPress={()=>{
              handleGoCard()
            }}>
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
            <Text style={styles.removeButtonText}>Remove Card</Text>
        </View>
      </View>  
        <AiButton />
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
  buttonWrapper:{
    top: 5
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
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
    justifyContent: 'start',
    paddingHorizontal: 21,
    paddingBottom: 20,
    paddingTop: 10 
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#FFFFFF33',
    borderRadius: 21,
    marginBottom: 20,
    border: 2,
    borderColor: '#ffffff',
    maxHeight: '100%',
  },
  subtitle: {
    fontSize: 15,
    color: '#666667',
    textAlign: 'center',
    marginBottom: 25,
  },
  label: {
    fontSize: 15,
    color: '#333334',
    marginBottom: 6,
    fontWeight: '500',
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
  removeButtonText: {
    fontSize: 16,
    fontWeight: '00',
    color: '#FF6B6E',
    alignSelf: 'center',
    top: 20,
  },
});

export default ManageCardScreen;