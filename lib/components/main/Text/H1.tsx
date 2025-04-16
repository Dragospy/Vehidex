import { PropsWithChildren } from 'react';
import {Text, StyleSheet} from 'react-native';

export default function H1({ children }: PropsWithChildren) {
    return (
        <Text style = {styles.textStyle}>
          {children}
        </Text>
    );
  }

  const styles = StyleSheet.create({
    textStyle:{
      fontSize: 24,
      fontFamily: "Inter",
      fontWeight: '700',
      color: '#49454F',
    }
  });