import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import {
  Provider as PaperProvider,
  DarkTheme as DarkThemePaper,
  DefaultTheme as DefaultThemePaper,
} from "react-native-paper";
import { Navigation } from "./src/navigation/Navigation";
import { StatusBar } from "expo-status-bar";
import { PreferenceContext } from "./src/context/PreferencesContext";

export default function App() {
  DefaultThemePaper.colors.primary = "#1ae1f2";
  DarkThemePaper.colors.primary = "#1ae1f2";
  DarkThemePaper.colors.accent = "#1ae1f2";

  DarkTheme.colors.background = "#192734";
  DarkTheme.colors.card = "#15212b";

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const preference = useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme]
  );

  return (
    <PreferenceContext.Provider value={preference}>
      <PaperProvider
        theme={theme === "dark" ? DarkThemePaper : DefaultThemePaper}
      >
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
        <NavigationContainer
          theme={theme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    </PreferenceContext.Provider>
  );
}
