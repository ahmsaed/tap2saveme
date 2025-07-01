import React, { useEffect, useState } from 'react';
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
import HolographicButton from '../components/HolographicButton';
import { API_KEY, AGENT_ID } from '@env';
import { useConversation } from '@elevenlabs/react';


const StartupScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    startSession,
    endSession,
  } = useConversation({
    onConnect: () => console.log('Connected to Voice Agent'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Agent says:', message),
    onError: (err) => {
      console.error('Voice Agent Error:', err);
      Alert.alert('Agent Error', 'Something went wrong while connecting.');
    },
  });

  const toggleSwitch = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleVoiceAgent = async () => {
    try {
      setIsLoading(true);
      await navigator.mediaDevices.getUserMedia({ audio: true }); 
      await startSession({ agentId: AGENT_ID });
    } catch (err) {
      console.error('Mic or session error:', err);
      console.log(AGENT_ID)
      Alert.alert('Error', 'Could not start voice agent.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      endSession();
    };
  }, []);

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
          <StatusBar
            barStyle="dark-content"
            backgroundColor={isDarkMode ? '#020432' : 'transparent'}
            translucent
          />

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
              <HolographicButton onPress={handleVoiceAgent} loading={isLoading} />
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
    paddingVertical: 250,
    backgroundColor: '#FFFFFF33',
    borderRadius: 21,
    marginBottom: 0,
    border: 2,
    borderColor: '#ffffff',
    maxHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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

export default StartupScreen;