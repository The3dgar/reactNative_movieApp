import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Rating } from "react-native-ratings";
import { Title, Text, Button } from "react-native-paper";

import { getPopularMovieApi } from "../api/movies";
import { BASE_PATH_IMG } from "../utils/utils";
import { userPreference } from "../hooks/usePreferences";

import noImage from "../../assets/png/default-image.png";
import StarDark from "../../assets/png/starDark.png";
import StarLight from "../../assets/png/starLight.png";

export const Popular = ({ navigation }) => {
  const { theme } = userPreference();
  const [movies, setMovies] = useState([]);
  const [showBtnMore, setShowBtnMore] = useState(true);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    getPopularMovieApi(pages).then((resp) => {
      pages < resp.total_pages
        ? setMovies([...movies, ...resp.results])
        : setShowBtnMore(false);
    });
  }, [pages]);

  !movies.length && null;

  return (
    <ScrollView>
      {movies.map((m, i) => (
        <Movie key={i} movie={m} theme={theme} navigation={navigation} />
      ))}
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

const Movie = ({ movie, theme, navigation }) => {
  const {
    id,
    poster_path,
    title,
    release_date,
    vote_count,
    vote_average,
  } = movie;

  const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;
  const reverseDate = (date) => date.split("-").reverse().join("-");

  const goMovie = () => {
    navigation.navigate("movie", { id });
  };

  return (
    <TouchableOpacity onPress={goMovie}>
      <View style={styles.movie}>
        <View style={styles.left}>
          <Image
            style={styles.image}
            source={poster_path ? { uri: imageUrl } : noImage}
          />
        </View>
        <View style={styles.right}>
          <Title>{title}</Title>
          <Text>{reverseDate(release_date)}</Text>
          <MovieRating
            theme={theme}
            voteCount={vote_count}
            voteAverage={vote_average}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MovieRating = ({ theme, voteCount, voteAverage }) => {
  const media = voteAverage / 2;

  return (
    <View style={styles.viewRatings}>
      <Rating
        type="custom"
        ratingImage={theme === "dark" ? StarDark : StarLight}
        ratingColor="#ffc205"
        ratingBackgroundColor={theme === "dark" ? "#192734" : "#f0f0f0"}
        startingValue={media}
        imageSize={20}
        style={{ marginRight: 15 }}
      />
      <Text style={{ fontSize: 16, marginRight: 5 }}>{media}</Text>
      <Text style={{ fontSize: 12, color: "#8697a5" }}>{voteCount} votos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  movie: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    marginRight: 20,
  },
  image: {
    width: 100,
    height: 150,
  },
  viewRatings: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  loadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  loadMore: {
    backgroundColor: "transparent",
  },
});
