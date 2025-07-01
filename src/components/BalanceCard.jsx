import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const BalanceCard = ({badgeColor= '#B79EEE', badgeTextColor= 'white', badgeBordorColor= "#B79EEE", text="Manage", balance= "5,750.20", name="Adam Gilchrist", darkMode=true, style }) => {
  return (
    <View style={[styles.balanceCard, style]}>
      <View style={styles.balanceHeader}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Image
          source={require('../assets/mastercard.png')}
          style={styles.mastercardLogo}
          resizeMode="contain"
        />
      </View>

      <View style={[styles.manageBadge, {backgroundColor: badgeColor,  borderColor: badgeBordorColor}]}>
        <Text style={[styles.manageText, {color: badgeTextColor}]}>{text}</Text>
      </View>

      <View style={styles.balanceRow}>
        <Text style={[styles.balanceAmount, darkMode && styles.balText]}>${balance}</Text>
      </View>

      <View style={styles.cardInfoRow}>
        <View>
          <Text style={[styles.cardName, darkMode && styles.balText]}>{name}</Text>
          <Text style={[styles.cardNumber, darkMode && styles.balText]}>5282 3456 7890 1289</Text>
        </View>
        <Text style={[styles.cardExpiry, darkMode && styles.balText]}>09/25</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: '#FFFFFF33',
    borderRadius: 21,
    padding: 20,
    marginBottom: 20,
    position: 'relative',
  },
balanceHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 0,
  position: 'relative',
},
balText:{
  color: '#FFFFFF'
},
  balanceLabel: {
    fontSize: 14,
    color: '#9192AA',
    flex: 1,
    flexWrap: 'nowrap',
  },
  mastercardLogo: {
    width: 40,
    height: 60,
  },
  allText:{
    color: '#D9D9D9'
  },
  manageBadge: {
    position: 'absolute',
    top: -10,
    right: 30,
    backgroundColor: '#B79EEE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
    borderWidth: 1,
  },
  manageText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '500',
    color: '#333',
  },
  cardInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 14,
    color: '#666',
  },
  cardNumber: {
    fontSize: 14,
    color: '#666',
  },
  cardExpiry: {
    fontSize: 14,
    color: '#666',
  },
});

export default BalanceCard;