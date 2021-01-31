import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Title, Text, IconButton } from "react-native-paper";
import { Rating } from "react-native-ratings";

import { getMovieById } from "../api/movies";
import { BASE_PATH_IMG } from "../utils/utils";
import { ModalVideo } from "../components/ModalVideo";

import StarDark from "../../assets/png/starDark.png";
import StarLight from "../../assets/png/starLight.png";
import { userPreference } from "../hooks/usePreferences";

export const Movie = ({ route }) => {
  const { id } = route.params;
  const [movie, setMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    getMovieById(id).then((resp) => {
      setMovie(resp);
    });
  }, [id]);

  if (!movie)
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );

  const reverseDate = (date) => date.split("-").reverse().join("-");

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {movie && (
          <>
            <MovieImage poster_path={movie.poster_path} />
            <MovieTrailer setShowVideo={setShowVideo} />
            <MovieTitle movie={movie} />
            <MovieRating
              voteCount={movie.vote_count}
              voteAverage={movie.vote_average}
            />
            <Text style={styles.overview}>{movie.overview || ""}</Text>
            <Text style={[styles.overview, { marginBottom: 30 }]}>
              Fecha de lanzamiento: {reverseDate(movie.release_date || "")}
            </Text>
          </>
        )}
      </ScrollView>
      <ModalVideo show={showVideo} setShow={setShowVideo} idMovie={id} />
    </>
  );
};

const MovieImage = ({ poster_path }) => {
  const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;
  return (
    <View style={styles.viewPoster}>
      <Image style={styles.poster} source={{ uri: imageUrl }} />
    </View>
  );
};

const MovieTrailer = ({ setShowVideo }) => {
  return (
    <View style={styles.viewPlay}>
      <IconButton
        icon="play"
        color="#000"
        size={30}
        style={styles.play}
        onPress={() => setShowVideo(true)}
      />
    </View>
  );
};

const MovieTitle = ({ movie }) => {
  const { genres } = movie;

  return (
    <View style={styles.viewInfo}>
      <Title> {movie.title}</Title>
      <View style={styles.viewGenres}>
        {genres.map((g, i) => (
          <Text key={i} style={styles.genres}>
            {g.name}
          </Text>
        ))}
      </View>
    </View>
  );
};

const MovieRating = ({ voteCount, voteAverage }) => {
  const { theme } = userPreference();
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
  viewPoster: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  poster: {
    width: "100%",
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  viewPlay: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  play: {
    backgroundColor: "#fff",
    marginTop: -40,
    marginRight: 30,
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  viewInfo: {
    marginHorizontal: 30,
  },
  viewGenres: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  genres: {
    marginRight: 10,
    color: "#8697a5",
  },
  viewRatings: {
    marginHorizontal: 30,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  overview: {
    marginHorizontal: 30,
    marginTop: 20,
    textAlign: "justify",
    color: "#8697a5",
  },
});
