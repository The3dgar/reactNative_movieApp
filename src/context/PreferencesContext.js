import { createContext } from "react";

export const PreferenceContext = createContext({
  theme: "",
  toggleTheme: () => {},
});