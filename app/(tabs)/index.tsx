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
  const [loading, setLoading] = useState(true);

  const getCars = async () => {
    setLoading(true);
    try {
      
      let { data: fetchedCars, error } = await supabase.from('cars').select('*')


      if (error) {
        console.error('Error fetching Cars:', error.message);
        return;
      }

      if (fetchedCars && fetchedCars.length > 0) {
        setCars(fetchedCars.map(car => ({
          id: car.id,
          name: car.name,
          photo: car.photo,
          acceleration: car.acceleration,
          bhp: car.bhp,
          torque: car.torque,
          images: [], // Add a default empty array for images
        })));
      }
    } catch (error) {
      console.error('Error fetching Cars:');
    }

    setLoading(false);
  };

  async function onRefresh(){
    setLoading(true);
    setSearchString("");
    getCars();
  }

  useEffect(() => {
    getCars();
  }, []);


  const [searchString, setSearchString] = useState("");
  const displayList = cars.filter((car) => ((car.name).toLowerCase()).includes(searchString.toLowerCase()));
  return(
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <SearchBar setSearchString={setSearchString}/>
          <View style={[styles.section, (Platform.OS == 'android')? {top: "10%"}: null]}>
            <SafeAreaProvider>
              <SafeAreaView style={styles.list}>
                {displayList.length > 0  || loading? (
                  <FlatList
                    data={displayList}
                    renderItem={({item}) => 
                      <CarCard {...item}/>
                    }
                    keyExtractor={item => (item.id).toString()}
                    onRefresh={() => onRefresh()}
                    refreshing={loading}
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
    top: "2%",

    padding: "2%",

    flex: 1
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

function onRefresh() {
  throw new Error('Function not implemented.');
}
