import { View, Text, StyleSheet, ScrollView, Image, Pressable, FlatList, TextInput, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';
import CarCard from '@/lib/components/main/CarCard';
import SearchBar from '@/lib/components/main/SearchBar';

const cars: car[]= [
  {
    id: "adada",
    name: 'KFC',
    photo: 'https://banner2.cleanpng.com/20181001/bqb/kisspng-colonel-sanders-kfc-fried-chicken-restaurant-kfc-clipart-lebanon-tripoli-free-clipart-on-dumi-1713928125086.webp',
    acceleration: 50,
    bhp: 50,
    torque: 50,
  },
];


export default function HomeScreen() {
  //const [cars, setCars] = useState<car[]>([]);
  const [searchString, setSearchString] = useState("");
  const displayList = cars.filter((car) => (('').toLowerCase()).includes(searchString.toLowerCase()));
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SearchBar setSearchString={setSearchString}/>
        <View style={styles.section}>
          <SafeAreaProvider>
            <SafeAreaView style={styles.list}>
              <FlatList
                data={displayList}
                renderItem={({item}) => 
                  <CarCard {...item}/>
                }
                keyExtractor={item => item.id}
              />
            </SafeAreaView>
          </SafeAreaProvider>
        </View>
      </SafeAreaView> 
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',

    height: "100%",
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginTop: 70,

    padding: 20,

    flex: 1,

    height: "100%",
  },
  list: {
    height: "93%",
  },
  sectionTitle: {
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: "600",
    color: '#49454F',
    marginBottom: 40,
    textAlign: "center",
  },
});