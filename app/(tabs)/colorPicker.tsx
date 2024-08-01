import { useState, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View, Pressable } from "react-native";

const getRandomColor = (difference: number) => {
  const red = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const randomColor = `rgb(${red},${green},${blue})`;
  const differentColor = `rgb(${red},${
    green > 100 ? green - difference : green + difference
  },${blue})`;
  return {
    color: randomColor,
    differentColor: differentColor,
  };
};

const getRandomNum = () => {
  return Math.floor(Math.random() * 9) + 1;
};

export default function App() {
  const [level, setLevel] = useState(50);
  const [color, setColor] = useState(getRandomColor(level));
  const [score, setScore] = useState(0);
  const [num, setNum] = useState(Math.floor(Math.random() * 10));

  const isColorDifferent = (index: number) => {
    if (index + 1 === num) {
      setScore(score + 1);
      const difference = Math.floor(Math.random() * 10);
      if (difference == 0) {
        setNum(9);
      } else {
        setNum(difference);
      }
      setColor(getRandomColor(level));
    } else {
      setLevel(0);
      alert("Lose");
      setScore(0);
      setNum(0);
      setLevel(50);
      setColor(getRandomColor(50));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Score : </Text>
      <Text>{score}</Text>
      <View style={styles.gameContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
          return (
            <Pressable
              key={item}
              style={{
                ...styles.square,
                backgroundColor:
                  item == num ? color.color : color.differentColor,
              }}
              onPress={() => isColorDifferent(index)}
            >
              <Text>{item}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gameContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 310,
    height: 300,
    gap: 2,
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
