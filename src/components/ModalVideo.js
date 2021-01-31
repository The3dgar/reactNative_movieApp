import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Modal, IconButton, Title } from "react-native-paper";
import YouTube from "react-native-youtube";
import { getVideoMovieApi } from "../api/movies";
import { YOU_API_KEY } from "../utils/utils";
// import * as WebBrowser from "expo-web-browser";
import WebView from "react-native-webview";

export const ModalVideo = ({ show, setShow, idMovie }) => {
  const [video, setVideo] = useState(null);
  useEffect(() => {
    getVideoMovieApi(idMovie).then((resp) => {
      const { results } = resp;
      const { key } = results.find((v) => v.site === "YouTube");
      key && setVideo(key);
    });
  }, []);
  
  !video && null;

  return (
    <Modal visible={show} contentContainerStyle={styles.modal}>
      {Platform.OS === "ios" ? (
        <YouTube videoId={video} style={styles.video} apiKey={YOU_API_KEY} />
      ) : (
        <WebView
          style={{ width: 500 }}
          source={{
            uri: `https://youtube.com/embed/${video}?controls=0&showinfo=0`,
          }}
        />
      )}

      <IconButton
        icon="close"
        onPress={() => setShow(false)}
        style={styles.close}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#000",
    height: "120%",
    alignItems: "center",
  },
  close: {
    backgroundColor: "#1ea1f2",
    width: 50,
    height: 50,
    borderRadius: 100,
    position: "absolute",
    bottom: 100,
  },
  video: {
    alignSelf: "stretch",
    height: 300,
  },
});
