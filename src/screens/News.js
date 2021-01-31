import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, Text } from "react-native-paper";

import { userPreference } from "../hooks/usePreferences";
import { getNewsMoviesApi } from "../api/movies";
import { BASE_PATH_IMG } from "../utils/utils";
import noImage from "../../assets/png/default-image.png";

const { width } = Dimensions.get("window");

export const News = ({ navigation }) => {
  const { theme } = userPreference();
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(1);
  const [showBtnMore, setShowBtnMore] = useState(true);

  useEffect(() => {
    getNewsMoviesApi(pages).then((resp) => {
      pages < resp.total_pages
        ? setMovies([...movies, ...resp.results])
        : setShowBtnMore(false);
    });
  }, [pages]);

  !movies.length && null;

  return (
    <ScrollView>
      <View style={styles.container}>
        {movies.map((m, i) => (
          <Movie key={i} movie={m} navigation={navigation} />
        ))}
      </View>
      {showBtnMore && (
        <Button
          mode="contained"
          contentStyle={styles.loadMoreContainer}
          style={styles.loadMore}
          labelStyle={{ color: theme === "dark" ? "#fff" : "#000" }}
          onPress={() => setPages(pages + 1)}
        >
          Cargar más ...
        </Button>
      )}
    </ScrollView>
  );
};

const Movie = ({ movie, navigation }) => {
  const { id, poster_path, title } = movie;
  const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;

  const goMovie = () => navigation.navigate("movie", { id });

  return (
    <TouchableOpacity onPress={goMovie}>
      <View style={styles.movie}>
        <Image
          style={styles.image}
          source={poster_path ? { uri: imageUrl } : noImage}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  loadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  loadMore: {
    backgroundColor: "transparent",
  },
});
