import { View, StyleSheet, TextInput, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dispatch } from 'react';
import H1 from './Text/H1';


export default function SearchBar({setSearchString} : {setSearchString:(textContent:any)=> void} ){
    return (
        <View style={styles.searchBarHolder}>
          <View style = {styles.searchBarHeader}>
            <H1>Search For A Car</H1>
          </View>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={24} color="black" />
            <View style={styles.searchBarTextContainer} >
              <TextInput 
              style = {styles.searchBarText} 
              placeholderTextColor="#49454F" 
              placeholder='eg: Porsche 911'
              onChangeText={textContent => setSearchString(textContent)}
              >
              </TextInput>
            </View>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
  searchBarHeader:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "85%",
    marginBottom: "3%"
  },
  searchBarHolder:{
    alignItems: 'center',
    top: "5%"
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    width: '90%',
  },
  searchBarTextContainer:{
    alignItems:"flex-start",
    paddingLeft: "5%",
    width: "90%",
  },
  searchBarText:{
    color: '#49454F'
  }
});