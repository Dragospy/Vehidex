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
import H2 from '@/lib/components/main/Text/H2';

export default function CarDisplayScreen() {
  const [loading, setLoading] = useState(true);

  const passedCar = useLocalSearchParams<{
    car: string;
  }>();

  const car = JSON.parse(passedCar.car);

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={[styles.header, Platform.OS === 'android' && styles.headerAndroid]}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#1E1E1E" />
            </Pressable>
            <H1>{car?.name}</H1>
            <View style={styles.spacer}></View>
          </View>
          <View style={styles.mainContent}>
            <View>
              <Image
                source={{ uri: car.photo }}
                style={[styles.mainImage, Platform.OS === "android" && styles.mainImageAndroid]}
                resizeMode="contain"
              />
            </View>
            <View style={styles.column}>

              <View style={[styles.row, {alignItems: "flex-start", padding: 10, flexWrap: 'wrap'}]}>
                  <View>
                    <View style={[styles.row, styles.rowStartAlign]}>
                      <H2>{car.acceleration}</H2>
                      <H3>secs</H3>
                    </View>
                    <P style={styles.textGray}>Acceleration 0-60</P>
                  </View>
                  <View>
                    <View style={[styles.row, styles.rowStartAlign]}>
                      <H2>{car.bhp}</H2>
                      <H3>bhp</H3>
                    </View>
                    <P style={styles.textGray}>Horse Power</P>
                  </View>
                  <View>
                    <View style={[styles.row, styles.rowStartAlign]}>
                      <H2>{car.torque}</H2>
                      <H3>N/M</H3>
                    </View>
                    <P style={styles.textGray}>Torque</P>
                  </View>
                </View>
              </View>
              <View style={styles.column}>
                <H1>Images</H1>
                <FlatList
                  data={car.images}
                  renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.flatListImage} resizeMode="contain" />
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