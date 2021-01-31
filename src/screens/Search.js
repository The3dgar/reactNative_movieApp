import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, Searchbar } from "react-native-paper";
import { searchMovieApi } from "../api/movies";
import { BASE_PATH_IMG } from "../utils/utils";
import noImage from "../../assets/png/default-image.png";

const { width } = Dimensions.get("window");

export const Search = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.length > 2) {
      searchMovieApi(search).then((resp) => {
        setMovies(resp.results);
      });
    } else {
      setMovies([]);
    }
  }, [search]);  

  return (
    <SafeAreaView style={styles.safeArea}>
      <Searchbar
        placeholder="Busca tu película"
        iconColor={Platform.OS === "ios" && "transparent"}
        icon="arrow-left"
        style={styles.input}
        onChangeText={(e) => setSearch(e)}
        value={search}
        onIconPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.container}>
          {movies.map((m, i) => (
            <Movie movie={m} key={i} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Movie = ({ movie, navigation }) => {
  const { id, poster_path, title } = movie;
  const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;
  const goMovie = () => navigation.navigate("movie", { id });
  return (
    <TouchableOpacity onPress={goMovie}>
      <View style={styles.movie}>
        {poster_path ? (
          <Image style={styles.image} source={{ uri: imageUrl }} />
        ) : (
          <Text style={{alignSelf: "center"}}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  input: {
    backgroundColor: "#192734",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
