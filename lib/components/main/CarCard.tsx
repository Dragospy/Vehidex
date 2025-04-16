import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { router} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import H2 from './Text/H2';
import P from './Text/P';
import H3 from './Text/H3';

export default function CarCard(car: car) {
    return (
        <Pressable key={car.id} style={styles.carCard} onPress={() => {
          router.push({
            pathname: '/(tabs)/carDisplay',
            params: { car: JSON.stringify(car) }
          })}}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: car.photo }} style={styles.carPhoto} />
          </View>
          <View style={styles.carInfo}>
            <H3>{car.name}</H3>
            <View style = {styles.carProperties}>
              <P>0-60: {car.acceleration} S</P>
              <P>BHP: {car.bhp}</P>
              <P>Torque: {car.torque} N/M</P>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#1E1E1E" />
        </Pressable>
    );
  }

  const styles = StyleSheet.create({
    carCard: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      backgroundColor: '#ffffff',
  
      marginBottom:20,
  
      width:"100%",
  
      height: 100,
      
      alignSelf:"center",
    },
    imageContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      height: "50%",
      width: "30%"
    },
    carPhoto:{
      height: "100%",
      width: "100%"
    },
    carInfo:{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    carProperties:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });