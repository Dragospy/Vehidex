import { Pressable, View, StyleSheet, Text } from "react-native";

export default function Button({ title, onPress, onRelease, isActive }: { title: string; onPress?: () => void; onRelease?: () => void; isActive: Boolean; }) {
    return (
      <Pressable
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Press me"
        onPress={onPress}
        onPressOut={onRelease}
      >
        <View style={[styles.button,(isActive)? styles.activeButton : styles.inactiveButton]}>
          <Text style={[(isActive)? styles.activeButtonText : styles.inactiveButtonText]}>{title}</Text>
        </View>
      </Pressable>
    );
  }

const styles = StyleSheet.create({
    button: {
      shadowColor: '#171717',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      marginTop: 30,
      borderRadius: 12,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 10,
      paddingBottom: 10
    },
    inactiveButton:{
      backgroundColor: '#8d8d8d',
    },
    activeButton:{
      backgroundColor: '#464646',
    },
    inactiveButtonText:{
      fontSize: 16,
      fontFamily: "Inter",
      fontWeight: '600',
      color: '#464646',
      textAlign: "center",
    },
    activeButtonText:{
      fontSize: 16,
      fontFamily: "Inter",
      fontWeight: '600',
      color: '#ffffff',
      textAlign: "center",
    },
  });