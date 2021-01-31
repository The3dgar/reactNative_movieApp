import React, { useState } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Drawer, Switch, TouchableRipple, Text } from "react-native-paper";
import { userPreference } from "../hooks/usePreferences";
import { StyleSheet, View } from "react-native";

const screensLabels = [
  { screen: "home", label: "Inicio" },
  { screen: "news", label: "Estrenos" },
  { screen: "popular", label: "Populares" },
];

export const DrawerContent = ({ navigation }) => {
  const [active, setActive] = useState("home");
  const { theme, toggleTheme } = userPreference();

  const handleChange = (screen) => {
    navigation.navigate(screen);
    setActive(screen);
  };

  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        {screensLabels.map((s, i) => (
          <Drawer.Item
            key={i}
            label={s.label}
            onPress={() => handleChange(s.screen)}
            active={active === s.screen}
          />
        ))}
        {/* 
        <Drawer.Item
          label="Populares"
          active={active === "popular"}
          onPress={() => handleChange("popular")}
        /> */}
      </Drawer.Section>
      <Drawer.Section title="Opciones">
        <TouchableRipple>
          <View style={styles.preferences}>
            <Text>Tema Oscuro</Text>
            <Switch value={theme === "dark"} onValueChange={toggleTheme} />
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  preferences: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
