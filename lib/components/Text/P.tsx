import { PropsWithChildren } from 'react';
import {Text, StyleSheet, Platform} from 'react-native';

export default function P({ children, style }: PropsWithChildren<{ style?: object }>) {
    return (
        <Text style = {[(Platform.OS == "ios")? styles.IOS: styles.Android, style]}>
          {children}
        </Text>
    );
  }

  const styles = StyleSheet.create({
    IOS:{
      fontSize: 12,
      fontFamily: "Inter",
      fontWeight: '500',
      color: '#000000',
    },
    Android:{
      fontSize: 12,
      fontFamily: "Inter-Medium",
      color: '#000000',
    }
  });