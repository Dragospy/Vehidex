import { View, Text, StyleSheet, ScrollView, Image, Pressable, FlatList, TextInput, SafeAreaView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import H1 from '@/lib/components/Text/H1';
import P from '@/lib/components/Text/P';
import H3 from '@/lib/components/Text/H3';
import H2 from '@/lib/components/Text/H2';
import Carousel from '@/lib/components/Carousel';
import Button from '@/lib/components/Button';

export default function CarDisplayScreen() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  async function playSound() {
    const { sound: newSound } = await Audio.Sound.createAsync(
      require('../../lib/assets/sound.mp3') // Place your sound file in the assets folder
    );

    setSound(newSound);
    await newSound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Cleanup
        }
      : undefined;
  }, [sound]);

  const passedVehicle = useLocalSearchParams<{
    vehicle: string;
  }>();

  const vehicle = JSON.parse(passedVehicle.vehicle);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View style={[styles.header, Platform.OS === 'android' && styles.headerAndroid]}>
          <Pressable onPress={() => {
            sound?.stopAsync();
            sound?.unloadAsync();
            router.back();
            }} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#1E1E1E" />
          </Pressable>
          <H1>{vehicle?.name}</H1>
          <View style={styles.spacer}></View>
        </View>

        <View style={styles.mainContent}>

          <View>
            <Image
              source={{ uri: vehicle.photo }}
              style={[styles.mainImage, Platform.OS === "android" && styles.mainImageAndroid]}
              resizeMode="contain"
            />
          </View>

          <View style={styles.column}>
            <View style={[styles.row, {alignItems: "center", padding: 10, flexWrap: 'wrap'}]}>
                <VehicleProperty value = {vehicle.acceleration} unit = {"secs"} name = {"Acceleration 0-60"}/>
                <VehicleProperty value = {vehicle.bhp} unit = {"bhp"} name = {"Horse Power"}/>
                <VehicleProperty value = {vehicle.torque} unit = {"N/M"} name = {"Max Torque"}/>
            </View>
            <View style={[styles.row, {justifyContent:"space-around",alignItems: "flex-start", padding: 10, flexWrap: 'wrap'}]}>
              <VehicleProperty value = {vehicle.topSpeed} unit = {"MPH"} name = {"Top Speed"}/>
              <VehicleProperty value = {vehicle.displacement} unit = {"cm³"} name = {"Displacement"}/>
            </View>
          </View>

          <View style={[styles.column, {marginTop: 15}]}>
            <H1>Images</H1>
            <Carousel items={vehicle.images} />
          </View>

          <Button isActive = {true} title="Play Sound" onPress={async () => playSound()}/>

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function VehicleProperty({value, unit, name}: {value: any, unit: string, name:string}){
  return(
    <View>
      <View style={[styles.row, styles.rowStartAlign]}>
        <H2 style={{color: "black"}}>{value}</H2>
        <H3>{unit}</H3>
      </View>
      <P style={styles.textGray}>{name}</P>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "5%",
    backgroundColor: '#fff',
  },
  headerAndroid: {
    top: "6%",
  },
  backButton: {
    marginLeft: "5%",
  },
  spacer: {
    width: "10%",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "85%",
    width: "90%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  rowStartAlign: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    gap: 2,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  columnStartAlign: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 20,
  },
  mainImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  mainImageAndroid: {
    marginTop: "15%",
  },
  textGray: {
    color: "#777777",
  },
  flatListImage: {
    width: 300,
    height: 200,
    borderRadius: 12,
  },
});