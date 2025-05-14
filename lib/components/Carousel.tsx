import { StyleSheet, Image, FlatList, ViewToken, View} from 'react-native';
import { useRef, useState } from 'react';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function Carousel({ items }: { items: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50,
    };

    const onViewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: ViewToken[] }) => {
          if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index ?? 0);
          }
        }
      ).current; // This is a ref to the function, so it doesn't get recreated on every render

    return (
        <View style={{height: 225, width: "100%"}}>
            <FlatList
                style={{ width: "100%" }}
                data={items}
                renderItem={({ item, index }) => (
                    <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />
            <View style={styles.indicatorContainer}>
                {items.map((_, index) => (
                    <View
                        key={index}
                        style={[
                        styles.dot,
                        currentIndex === index && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
  }

  const styles = StyleSheet.create({
    image: {
        width: 0.9*windowWidth,
        height: 200,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
      },
      activeDot: {
        backgroundColor: '#333',
      },
  });