import { PropsWithChildren } from 'react';
import {Text, StyleSheet, Platform} from 'react-native';


export default function H3({ children, style }: PropsWithChildren<{ style?: object }>) {
    return (
        <Text style = {[(Platform.OS == "ios")? styles.IOS: styles.Android, style]}>
          {children}
        </Text>
    );
  }

  const styles = StyleSheet.create({
    IOS:{
      fontSize: 16,
      fontFamily: "Inter",
      fontWeight: '600',
      color: '#1E1E1E',
    },
    Android:{
      fontSize: 16,
      fontFamily: "Inter-SemiBold",
      color: '#1E1E1E',
    }
  });