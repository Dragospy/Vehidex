import { View, Text, StyleSheet, ScrollView, Image, Pressable, FlatList, TextInput, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import CarCard from '@/lib/components/main/CarCard';
import SearchBar from '@/lib/components/main/SearchBar';
import { supabase } from '@/utils/supabase';

/*const cars: car[]= [
  {
    id: "adada",
    name: 'KFC',
    photo: 'https://banner2.cleanpng.com/20181001/bqb/kisspng-colonel-sanders-kfc-fried-chicken-restaurant-kfc-clipart-lebanon-tripoli-free-clipart-on-dumi-1713928125086.webp',
    acceleration: 50,
    bhp: 50,
    torque: 50,
  },
];*/


export default function HomeScreen() {
  const [cars, setCars] = useState<car[]>([]);
  useEffect(() => {
    const getCars = async () => {
      try {
        const { data: Cars, error } = await supabase.from('cars').select();

        if (error) {
          console.error('Error fetching Cars:', error.message);
          return;
        }

        if (Cars && Cars.length > 0) {
          setCars(Cars);
        }
      } catch (error) {
        console.error('Error fetching Cars:');
      }
    };

    getCars();
  }, []);
  const [searchString, setSearchString] = useState("");
  const displayList = cars.filter((car) => ((car.name).toLowerCase()).includes(searchString.toLowerCase()));
  return(
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <SearchBar setSearchString={setSearchString}/>
          <View style={[styles.section, (Platform.OS == 'android')? {top: "5%"}: null]}>
            <SafeAreaProvider>
              <SafeAreaView style={styles.list}>
                {displayList.length > 0 ? (
                  <FlatList
                    data={displayList}
                    renderItem={({item}) => 
                      <CarCard {...item}/>
                    }
                    keyExtractor={item => (item.id).toString()}
                  />
                ) : (
                  <Text style = {styles.noResults}>No Results Found</Text>
                )}
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

    padding: 20,

    flex: 1,

    height: "100%",
  },
  list: {
    height: "100%",
  },
  sectionTitle: {
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: "600",
    color: '#49454F',
    textAlign: "center",
  },
  noResults:{
    alignSelf: 'center',
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: "600",
    color: '#49454F',
  }
});