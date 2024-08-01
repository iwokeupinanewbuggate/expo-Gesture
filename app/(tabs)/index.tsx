import { googlefetch } from "@/utils/google-fetch";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  useEffect(() => {
    googlefetch();
  });

  return (
    <View>
      <Text style={{ color: "white", padding: 100 }}>Laufey</Text>
    </View>
  );
}
