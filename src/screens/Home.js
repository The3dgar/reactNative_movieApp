import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import { Title } from "react-native-paper";
import { CarrouselVertical } from "../components/CarrouselVertical";
import {
  getAllGenresApi,
  getNewsMoviesApi,
  getMoviesByGenreApi,
} from "../api/movies";
import { CarrouselMulti } from "../components/CarrouselMulti";

const defaultGenre = 28;

export const Home = ({ navigation, route }) => {
  const [newsMovies, setNewsMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [genreSelected, setGenreSelected] = useState(defaultGenre);
  const [genreMovies, setGenreMovies] = useState(null);

  useEffect(() => {
    getNewsMoviesApi().then((resp) => {
      const { results } = resp;
      setNewsMovies(results);
    });
  }, []);

  useEffect(() => {
    getAllGenresApi().then((resp) => {
      setGenresList(resp);
    });
  }, []);

  useEffect(() => {
    getMoviesByGenreApi(genreSelected).then((resp) => {
      setGenreMovies(resp);
    });
  }, [genreSelected]);

  const onChangeGenre = (newGenreId) => {
    setGenreSelected(newGenreId);
  };


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newsMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>Nuevas peliculas!</Title>
          <CarrouselVertical data={newsMovies} navigation={navigation} />
        </View>
      )}

      <View style={styles.genres}>
        <Title style={styles.genreTitle}>Películas por genero</Title>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.genreList}
        >
          {genresList.map((g) => (
            <Text
              key={g.id}
              style={[
                styles.genre,
                { color: g.id !== genreSelected ? "#8697a5" : "#fff" },
              ]}
              onPress={() => onChangeGenre(g.id)}
            >
              {g.name}
            </Text>
          ))}
        </ScrollView>
        {genreMovies && (
          <CarrouselMulti data={genreMovies} navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: "bold",
    fontSize: 22,
  },
  genres: {
    marginTop: 20,
    marginBottom: 50,
  },
  genreTitle: {
    marginHorizontal: 20,
    fontWeight: "bold",
    fontSize: 22,
  },
  genreList: {
    marginTop: 5,
    marginBottom: 15,
    padding: 10,
    paddingHorizontal: 20,
    marginRight: 20,
  },
  genre: {
    marginRight: 20,
    fontSize: 16,
  },
});
