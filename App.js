import React from "react";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default class App extends React.Component {
  state = { cameraPermissions: null, photo: null };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ cameraPermissions: status });
  }

  takePhoto = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      console.log(photo);
      this.setState({ photo });
    }
  };

  uploadImageGood = async () => {
    const formData = new FormData();
    formData.append("images", {
      name: "test.png",
      type: "image/png",
      uri: "https://facebook.github.io/react/logo-og.png"
    });
    await this.uploadImage(formData);
  };

  uploadImageBad = async () => {
    const { photo } = this.state;
    const formData = new FormData();
    formData.append("images", {
      name: "test.jpg",
      type: "image/jpeg",
      uri: photo.uri
    });
    await this.uploadImage(formData);
  };

  uploadImage = async formData => {
    try {
      const response = await fetch("https://www.google.com", {
        body: formData,
        method: "POST"
      });
      Alert.alert("yes", "worked");
      // console.log(response);
    } catch (e) {
      Alert.alert("no", "error");
      console.log(e);
    }
  };

  render() {
    const { photo, cameraPermissions } = this.state;
    if (!photo && cameraPermissions === "granted") {
      return (
        <Camera
          ref={ref => {
            this.camera = ref;
          }}
          style={{ flex: 1 }}
          type="back"
        >
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1,
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              onPress={this.takePhoto}
              style={{
                alignItems: "center",
                alignSelf: "flex-end",
                flex: 0.1
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      );
    }
    return (
      <View style={styles.container}>
        <View>
          <Text>
            This button will cause an error as it tries to upload a local file
          </Text>
          <Button
            onPress={this.uploadImageBad}
            title="Upload local photo"
            color="#841584"
            styles={{ flex: 1 }}
          />
          <Text>
            This button will not cause an error as it tries to upload a file
            from 'https://facebook.github.io/react/logo-og.png'
          </Text>
          <Button
            onPress={this.uploadImageGood}
            title="Upload remote photo"
            color="#841584"
            styles={{ flex: 1 }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
