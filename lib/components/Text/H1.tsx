import { PropsWithChildren } from 'react';
import {Text, StyleSheet, Platform} from 'react-native';


export default function H1({ children, style }: PropsWithChildren<{ style?: object }>) {
    return (
        <Text style = {[(Platform.OS == "ios")? styles.IOS: styles.Android, style]}>
          {children}
        </Text>
    );
  }

  const styles = StyleSheet.create({
    IOS:{
      fontSize: 24,
      fontFamily: "Inter",
      fontWeight: '700',
      color: '#49454F',
    },
    Android:{
      fontSize: 24,
      fontFamily: "Inter-Bold",
      color: '#49454F',
    }
  });