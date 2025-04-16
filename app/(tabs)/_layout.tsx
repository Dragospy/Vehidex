import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        tabBarStyle: {
        position: Platform.select({
          ios: 'absolute', // Use a transparent background on iOS to show the blur effect
          default: 'absolute',
        }),
        backgroundColor: "white"
      },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="race"
        options={{
          title: 'Race',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="car-sport-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="cog" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="carDisplay"
        options={{
          href: null,
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="qr-code" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
