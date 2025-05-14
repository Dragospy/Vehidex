import H2 from '@/lib/components/Text/H2';
import H3 from '@/lib/components/Text/H3';
import P from '@/lib/components/Text/P';
import { vehicle } from '@/lib/types/vehicle';
import { useState } from 'react';
import { Image, StyleSheet, Platform, View, Pressable } from 'react-native';

export default function RaceScreen() {
  const [vehicle1, setVehicle1] = useState(null);
  const [vehicle2, setVehicle2] = useState(null);

  return (
    <View style = {styles.main}>
      <View style={styles.vehicleCards}>
        <VehicleCard vehicle={vehicle1} setVehicle={setVehicle1} />
        <VehicleCard vehicle={vehicle2} setVehicle={setVehicle2} />
      </View>
    </View>
  );
}

function VehicleCard({ vehicle, setVehicle } : { vehicle: vehicle | null, setVehicle:(vehicle:any)=> void}) {
  if (!vehicle){
    return(
      <Pressable style={styles.vehicleCard}>
        <H2>Select a vehicle</H2>
      </Pressable>
    );
  }
  else{
    return (
      <View key={vehicle.id} style={styles.vehicleCard}>
        <View>
          <Image source={{ uri: vehicle.photo }} resizeMode="contain"/>
        </View>
        <View >
          <H3>{vehicle.name}</H3>
          <View>
            <P>0-60: {vehicle.acceleration} S</P>
            <P>BHP: {vehicle.bhp}</P>
            <P>Torque: {vehicle.torque} N/M</P>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    display: 'flex',
    justifyContent:"center",
    height: "100%",
    width: "100%",
    backgroundColor: "white"
  },
  vehicleCards:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: "100%",
    height: "30%",
  },
  vehicleCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: '#f8f7f7',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,

    width:"40%",
    borderRadius: 12,
    marginBottom: "5%",
    marginTop: "1%",

    height: "100%",
    
    alignSelf:"center",
  },
});

