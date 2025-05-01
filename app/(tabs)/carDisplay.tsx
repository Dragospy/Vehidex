import { View, Text, StyleSheet, ScrollView, Image, Pressable, FlatList, TextInput, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import CarCard from '@/lib/components/main/CarCard';
import SearchBar from '@/lib/components/main/SearchBar';
import { router, useLocalSearchParams } from 'expo-router';
import H1 from '@/lib/components/main/Text/H1';
import P from '@/lib/components/main/Text/P';
import H3 from '@/lib/components/main/Text/H3';

export default function CarDisplayScreen() {
  const [loading, setLoading] = useState(true);

  const passedCar = useLocalSearchParams<{
    car: string;
  }>();

  const car = {
    id: JSON.parse(passedCar.car).id,
    name: JSON.parse(passedCar.car).name,
    photo: JSON.parse(passedCar.car).photo,
    acceleration: parseInt(JSON.parse(passedCar.car).acceleration),
    bhp: JSON.parse(passedCar.car).bhp,
    torque: JSON.parse(passedCar.car).torque,
    images: JSON.parse(passedCar.car).images
  };
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
        <View style={[styles.header, (Platform.OS == 'android')? {top: "6%"}: null]}>
          <Pressable onPress={() => router.back()} style={{marginLeft: "5%"}}>
            <Ionicons name="chevron-back" size={24} color="#1E1E1E" />
          </Pressable>
          <H1>{car?.name}</H1>
          <View style={{width: "10%"}}></View>
        </View>
        <View style={styles.mainContent}>
          <View>
            <Image source={{ uri: car.photo }} style={[styles.mainImage, (Platform.OS == "android"? {marginTop: "15%"}: null)]} resizeMode="contain"/>
          </View>
          <View style={styles.column}>
            <H1>Specifications</H1>
            <View style={styles.row}>
              <P>0-60: {car.acceleration} S</P>
              <P>BHP: {car.bhp}</P>
              <P>Torque: {car.torque} N/M</P>
            </View>
          </View>
          <View style={styles.column}>
            <H1>Images</H1>
            <FlatList
              data={car.images}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={{ width: 300, height: 200, borderRadius: 12 }} resizeMode="contain"/>
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',

    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",

    height: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
    height: "100%",
    width: "90%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  column:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  mainImage: { 
    width: "100%",
    height: 200, 
    borderRadius: 12
  },
});