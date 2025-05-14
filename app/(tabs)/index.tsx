import { View, Text, StyleSheet, ScrollView, Image, Pressable, FlatList, TextInput, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useContext, useEffect, useState } from 'react';
import CarCard from '@/lib/components/CarCard';
import SearchBar from '@/lib/components/SearchBar';
import { supabase } from '@/utils/supabase';
import { vehicle } from '@/lib/types/vehicle';
import { useVehiclesContext } from '@/lib/contextHandlers/vehicles';


export default function HomeScreen() {
  const vehiclesContext = useVehiclesContext();
  
  if (!vehiclesContext) {
    throw new Error("useVehiclesContext must be used within a VehiclesProvider");
  }

  const { vehicles, refreshVehicles } = vehiclesContext;
  const [loading, setLoading] = useState(false);

  async function onRefresh(){
    setLoading(true);
    setSearchString("");
    refreshVehicles();
    setLoading(false);
  }


  const [searchString, setSearchString] = useState("");
  const displayList = vehicles?.filter((vehicle) => ((vehicle.name).toLowerCase()).includes(searchString.toLowerCase())) || [];
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

