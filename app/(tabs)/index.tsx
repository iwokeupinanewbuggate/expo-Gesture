import { googlefetch } from "@/utils/google-fetch";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Value from "@/components/Value";
import { StatusBar } from "expo-status-bar";
import RingProgress from "@/components/RingProgress";
import { AntDesign } from "@expo/vector-icons";
import useHealthData from "@/hooks/useHealthData";
export default function HomeScreen() {
  useEffect(() => {
    googlefetch();
  });
  const { steps, distance, flights } = useHealthData();

  console.log(`Steps: ${steps} | Distance: ${distance}m | Flights: ${flights}`);

  const [date, setDate] = useState(new Date());

  const changeDate = (numDays: number) => {
    const currentDate = new Date(date); // Create a copy of the current date
    // Update the date by adding/subtracting the number of days
    currentDate.setDate(currentDate.getDate() + numDays);

    setDate(currentDate); // Update the state variable
  };
  return (
    <View>
      <Text style={{ color: "white", padding: 100 }}>Laufey</Text>
      <View style={styles.container}>
        <RingProgress progress={0.8} />
        <View style={styles.values}>
          <Value label="Steps" value="1219" />
          <Value label="Distance" value="0,75 km" />
          <Value label="Flights Climbed" value="12" />
        </View>
        <StatusBar style="auto" />
      </View>
      <View style={styles.container}>
        <View>
          <AntDesign
            onPress={() => changeDate(-1)}
            name="left"
            size={20}
            color="#C3FF53"
          />
          <Text>{date.toDateString()}</Text>

          <AntDesign
            onPress={() => changeDate(1)}
            name="right"
            size={20}
            color="#C3FF53"
          />
        </View>
        ...
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    padding: 12,
  },
  values: {
    flexDirection: "row",
    gap: 25,
    flexWrap: "wrap",
  },
});
