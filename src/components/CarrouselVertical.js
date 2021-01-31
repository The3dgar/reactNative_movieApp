import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Text, Title } from "react-native-paper";
import { BASE_PATH_IMG } from "../utils/utils";
import { getGenreMovieApi } from "../api/movies";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = Math.round(width * 0.7);

export const CarrouselVertical = (props) => {
  const { data, navigation } = props;

  return (
    <Carousel
      layout={"default"}
      data={data}
      renderItem={(item) => <RenderItem data={item} navigation={navigation}/>}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
    />
  );
};

const RenderItem = ({ data, navigation}) => {
  const { title, poster_path, genre_ids, id } = data.item;
  const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenreMovieApi(genre_ids).then((resp) => setGenres(resp));
  }, []);

  const onNavigation = () => {
    navigation.navigate("movie", {id})
  }

  return (
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <Title style={styles.title}>{title}</Title>
        <View style={styles.genres}>
          {genres.map(
            (g, i) =>
              i < 3 && (
                <Text key={i} style={styles.genre}>
                  {g} {i < 2 && i !== genres.length - 1 && ", "}
                </Text>
              )
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  image: {
    width: "100%",
    height: 450,
    borderRadius: 20,
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10,
    alignSelf: "center",
  },
  genres: {
    flexDirection: "row",
    marginHorizontal: 10,
    // backgroundColor: "red",
  },
  genre: {
    fontSize: 12,
    color: "#8967a5",
  },
});
