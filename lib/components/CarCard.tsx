import { View, StyleSheet, Image, Pressable } from 'react-native';
import { router} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { vehicle } from '@/lib/types/vehicle';
import H3 from './Text/H3';
import P from './Text/P';


export default function CarCard(vehicle: vehicle) {
    return (
        <Pressable key={vehicle.id} style={styles.carCard} onPress={() => {
          router.push({
            pathname: '/(tabs)/carDisplay',
            params: { vehicle: JSON.stringify(vehicle) }
          })}}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: vehicle.photo }} style={styles.Photo} resizeMode="contain"/>
          </View>
          <View style={styles.Info}>
            <H3 style={styles.title}>{vehicle.name}</H3>
            <View style = {styles.Properties}>
              <P style = {styles.PropertiesText} >0-60: {vehicle.acceleration} S</P>
              <P style = {styles.PropertiesText} >BHP: {vehicle.bhp}</P>
              <P style = {styles.PropertiesText} >Torque: {vehicle.torque} N/M</P>
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