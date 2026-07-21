import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import AddCardScreen from "./screens/AddCardScreen";
import EditCardScreen from "./screens/EditCardScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Add Card"
          component={AddCardScreen}
        />

        <Stack.Screen
          name="Edit Card"
          component={EditCardScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}