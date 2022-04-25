import React, {useState, useRef} from 'react';
import { Animated, PanResponder, View, Image, StyleSheet,Text } from 'react-native';


const style = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "silver"
  },  
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  moviePoster_posterStyle: {
    resizeMode: "cover"
  }
});

const App = () => {

  const pan = useRef(new Animated.ValueXY()).current;
  
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

    return (
      <View style={style.mainView}
        onStartShouldSetResponderCapture={() => {return false}}>
        <Text style={style.titleText}>Drag this image!</Text>
        <Animated.View
          style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }]
          }}
          {...panResponder.panHandlers}
        >
          <Image
              style={style.moviePoster_posterStyle}
              source={require("./assets/iconWeb.png")}
          />
        </Animated.View>
      </View>
    )


};

export default App;