import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { Movie } from "../screens/Movie";
import { Popular } from "../screens/Popular";
import { News } from "../screens/News";
import { Search } from "../screens/Search";
import { IconButton } from "react-native-paper";

const Stack = createStackNavigator();

export const StackNavigation = ({ navigation }) => {
  const buttonLeft = (screen) => {
    switch (screen) {
      case "search":
      case "movie":
        return <IconButton icon="arrow-left" onPress={navigation.goBack} />;

      default:
        return <IconButton icon="menu" onPress={navigation.openDrawer} />;
    }
  };

  const buttonRight = () => (
    <IconButton icon="magnify" onPress={() => navigation.navigate("search")} />
  );

  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: "Movie App",
          headerLeft: buttonLeft,
          headerRight: buttonRight,
        }}
      />
      <Stack.Screen
        name="movie"
        component={Movie}
        options={{
          title: "",
          headerLeft: () => buttonLeft("movie"),
          headerRight: buttonRight,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="popular"
        component={Popular}
        options={{
          title: "Populares",
          headerLeft: buttonLeft,
          headerRight: buttonRight,
        }}
      />
      <Stack.Screen
        name="news"
        component={News}
        options={{
          title: "Estrenos",
          headerLeft: buttonLeft,
          headerRight: buttonRight,
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          headerShown:false
        }}
      />
    </Stack.Navigator>
  );
};
