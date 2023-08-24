import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "mastermind",
          headerStyle: { backgroundColor: "#000", borderBottomWidth: 1 },
          headerTitleStyle: {
            color: "white",
          },
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="home"
                color={color === "rgb(0, 122, 255)" ? "white" : "gray"}
                size={size}
              />
            );
          },
          tabBarActiveBackgroundColor: "black",
          tabBarInactiveBackgroundColor: "black",
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "mastermind",
          headerStyle: { backgroundColor: "#000", borderBottomWidth: 1 },
          headerTitleStyle: {
            color: "white",
          },
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="person"
                color={color === "rgb(0, 122, 255)" ? "white" : "gray"}
                size={size}
              />
            );
          },
          tabBarActiveBackgroundColor: "black",
          tabBarInactiveBackgroundColor: "black",
          tabBarLabel: () => null,
        }}
      />
    </Tabs>
  );
};
