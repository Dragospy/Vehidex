import { PropsWithChildren } from 'react';
import {Text, StyleSheet} from 'react-native';

export default function H3({ children }: PropsWithChildren) {
    return (
        <Text style = {styles.textStyle}>
          {children}
        </Text>
    );
  }

  const styles = StyleSheet.create({
    textStyle:{
      fontSize: 16,
      fontFamily: "Inter",
      fontWeight: '500',
      color: '#000000',
    }
  });