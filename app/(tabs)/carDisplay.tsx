import { View, Text, StyleSheet, ScrollView, Image, Pressable, FlatList, TextInput, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';
import CarCard from '@/lib/components/main/CarCard';
import SearchBar from '@/lib/components/main/SearchBar';

export default function CarDisplayScreen() {
  return (
      <View style={styles.container}>

      </View> 
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
  brandList:{
    flex: 1,
    height: "100%"
  },
});