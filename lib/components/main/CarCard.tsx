import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { router} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import H2 from './Text/H2';
import P from './Text/P';
import H3 from './Text/H3';
import { car } from '@/lib/types/car';

export default function CarCard(car: car) {
    return (
        <Pressable key={car.id} style={styles.carCard} onPress={() => {
          router.push({
            pathname: '/(tabs)/carDisplay',
            params: { car: JSON.stringify(car) }
          })}}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: car.photo }} style={styles.Photo} resizeMode="contain"/>
          </View>
          <View style={styles.Info}>
            <H3 style={styles.title}>{car.name}</H3>
            <View style = {styles.Properties}>
              <P style = {styles.PropertiesText} >0-60: {car.acceleration} S</P>
              <P style = {styles.PropertiesText} >BHP: {car.bhp}</P>
              <P style = {styles.PropertiesText} >Torque: {car.torque} N/M</P>
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

      backgroundColor: '#f8f7f7',

      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 2,
      elevation: 2,
  
      width:"95%",
      borderRadius: 12,
      marginBottom: "5%",
      marginTop: "1%",
  
      height: 60,
      
      alignSelf:"center",
    },
    imageContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      height: "100%",
      width: "30%"
    },
    Photo:{
      height: "100%",
      width: "100%"
    },
    title:{
      marginBottom: 5,
    },
    Info:{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "55%",
    },
    Properties:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    PropertiesText:{
      fontFamily: "Inter",
      fontSize: 10,
      fontWeight: "500",
      color: '#49454F',
    }
  });