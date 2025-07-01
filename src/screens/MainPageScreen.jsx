import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
  Animated,
  Pressable,
} from 'react-native';
import AiButton from '../components/AiButton';
import BalanceCard from '../components/BalanceCard';
import { LinearGradient } from 'expo-linear-gradient';

const MainPageScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [timer, setTimer] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [tapsLeft, setTapsLeft] = useState(5);

  const progressAnim = useRef(new Animated.Value(1)).current;

  const toggleSwitch = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    let interval = null;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  useEffect(() => {
    if (isTimerRunning) {
      progressAnim.setValue(1);
      Animated.timing(progressAnim, {
        toValue: 0,
        duration: 15000,
        useNativeDriver: false,
      }).start();
    }
  }, [isTimerRunning]);

  const startCountdown = () => {
    if (isTimerRunning || timer === 0) return;
    setTimer(15);
    setIsTimerRunning(true);
  };

  const handleTap = () => {
    if (tapsLeft > 0) {
      setTapsLeft(prev => prev - 1);
      if (!isTimerRunning) startCountdown();
    }
  };

  const progressBarWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

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

          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
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
            <TouchableOpacity onPress={()=>{
              navigation.navigate('ManageCardScreen')
            }}>
            <BalanceCard darkMode={isDarkMode} />
            </TouchableOpacity>

            <View style={styles.daySection}>
              <Text style={[styles.dayText, isDarkMode && styles.allText]}>Day 4</Text>

             <Pressable
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={handleTap}
              style={[styles.circularProgressWrapper, isPressed && styles.shadowOnPress]}
            >
              <ImageBackground
                source={require('../assets/taps.gif')}
                style={styles.circularProgress}
                resizeMode="cover"
              >
                <View style={styles.tapContent}>
                  <Text style={styles.tapsText}>TAPS</Text>
                  <Text style={styles.tapsText}>LEFT</Text>
                  <Text style={styles.tapsNumber}>{tapsLeft}</Text>
                </View>
              </ImageBackground>
            </Pressable>

              <View style={styles.progressBar}>
                {isDarkMode ? <Animated.View
                  style={[
                    styles.progressFill,
                    { width: progressBarWidth },
                  ]}
                >
                  <LinearGradient
                    colors={['#CF77FF', '#4F60FF', '#642BFF', '#5100B5', '#C256FD']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                  />
                </Animated.View> : <Animated.View
                  style={[
                    styles.progressFill,
                    { width: progressBarWidth },
                  ]}
                >
                  <LinearGradient
                    colors={['#ebd3f0', '#f2abc5', '#f2a7d2', '#dcc1ff', '#e8d5ff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                  />
                </Animated.View>}
              </View>

              <Text style={[styles.timerText, isDarkMode && styles.allText]}>
                00:{timer < 10 ? `0${timer}` : timer}
              </Text>
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
    paddingTop: 50,
  },
  shadowOnPress: {
    shadowColor: '#6C80FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 70,
    elevation: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    width: 65,
    height: 31,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  allText: {
    color: '#D9D9D9',
  },
  iconWrapper: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchIcon: {
    width: 17,
    height: 17,
  },
  switchThumb: {
    position: 'absolute',
    left: 3,
    width: 25,
    height: 25,
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 21,
    paddingTop: 30,
    paddingBottom: 50,
  },
  daySection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#666',
    marginBottom: 30,
  },
  circularProgress: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    elevation: 8,
  },
  tapsText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
  },
  tapsNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
    marginLeft: 5, 
  },
  progressBar: {
    width: 250,
    height: 15,
    backgroundColor: '#FFFFFFCC',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  timerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#666',
  },
});

export default MainPageScreen;
