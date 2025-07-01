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

const ResultScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleGoBack = () => {
    navigation.navigate('MainPageScreen');
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
                <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={[styles.summaryTitle, isDarkMode && styles.titleText]}>Required</Text>
          <Text style={[styles.summaryValue, isDarkMode && styles.titleText]}>24</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, isDarkMode && styles.allText]}>Completed Taps</Text>
          <Text style={[styles.summaryData, isDarkMode && styles.titleText]}>17</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, isDarkMode && styles.allText]}>Money Saved</Text>
          <Text style={[styles.summaryData, isDarkMode && styles.titleText]}>$17</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, isDarkMode && styles.allText]}>Carryover Taps</Text>
          <Text style={[styles.summaryData, isDarkMode && styles.titleText]}>7</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryTotalLabel, isDarkMode && styles.allText]}>Total Saved</Text>
          <Text style={[styles.summaryTotalData, isDarkMode && styles.titleText]}>$54,789.00</Text>
        </View>
        
          </View>
          <TouchableOpacity style={styles.buttonWrapper}>
            {
              isDarkMode ? (
                <View style={[styles.continueButton, { backgroundColor: '#FFFFFF' }]}>
                  <Text style={[styles.continueButtonText, {color:'#5939C2'}]}>Okay</Text>
                </View>
              ) : (
                <LinearGradient
                  colors={['#DCE8FF', '#ECF0FF', '#FFFEFE', '#DBE8FF', '#E4E4FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.continueButton}
                >
                  <Text style={styles.continueButtonText}>Okay</Text>
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
  titleText:{
    color: '#FFFFFF',
  },
  allText: {
    color: '#D9D9D9',
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
    justifyContent: 'center',
    paddingHorizontal: 21,
    paddingBottom: 50,
    paddingTop: 30 
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingVertical: 100,
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
  summaryCard: {
  backgroundColor: '#FFFFFF33',
  borderRadius: 16,
  padding: 20,
  borderWidth: 1,
  borderColor: '#FFFFFF'
},

summaryHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 20,
},

summaryTitle: {
  fontSize: 26,
  fontWeight: '400',
  color: '#333',
},

summaryValue: {
  fontSize: 26,
  fontWeight: '400',
  color: '#333',
  alignItems: 'center',
},
continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
summaryRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 12,
},

summaryLabel: {
  fontSize: 14,
  color: '#444',
},

summaryData: {
  fontSize: 14,
  color: '#444',
  fontWeight: '500',
},

divider: {
  height: 1,
  backgroundColor: '#e8c0d3',
  marginVertical: 16,
},

summaryTotalLabel: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
},

summaryTotalData: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
},
 buttonWrapper: {
    width: 150,
    alignSelf: 'center',
    marginHorizontal: 0,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
  },
    continueButton: {
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default ResultScreen;