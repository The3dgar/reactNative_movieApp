import { useContext } from "react";
import { PreferenceContext } from "../context/PreferencesContext";

export const userPreference = () => useContext(PreferenceContext)