import { View, Text, Pressable, Alert, Platform, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { homeStyle } from "./HomeStyle";

// Import your camera icon image
import cameraIcon from "../assets/camera.png";

export default function Home() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [imagePermission, setImagePermission] = useState(null);
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);

  const permissionFunction = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(cameraPermission.status === "granted");

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    setImagePermission(imagePermission.status === "granted");

    const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
    setMediaLibraryPermission(mediaLibraryPermission.status === "granted");

    if (
      imagePermission.status !== "granted" &&
      cameraPermission.status !== "granted" &&
      mediaLibraryPermission.status !== "granted"
    ) {
      Alert.alert("Permission for media access needed.");
    }
  };

  useEffect(() => {
    permissionFunction();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      await saveImageToGallery(data.uri);
    }
  };

  const saveImageToGallery = async (uri) => {
    if (mediaLibraryPermission) {
      try {
        const asset = await MediaLibrary.createAssetAsync(uri);
        if (Platform.OS === "android") {
          MediaLibrary.createAlbumAsync("expooo", asset, false)
            .then(() => {
              Alert.alert("Image Saved to Gallery!!");
            })
            .catch((e) => {
              Alert.alert("Can't Save Image", e);
            });
        } else {
          MediaLibrary.createAlbumAsync("Expoo", [asset], false)
            .then(() => {
              Alert.alert("Image Saved!!");
            })
            .catch(() => {
              Alert.alert("Error Saving File", e);
            });
        }
      } catch (error) {
        Alert.alert(error);
      }
    } else {
      Alert.alert("Permission Required");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      presentationStyle: 0,
    });
    console.log("result assets", result.assets);
    console.log("result", result.assets[0].uri);
    // console.log(result);  // its causes WARN Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead
    if (!result.canceled) {
      navigation.navigate("ImagePicker", { uri: result.assets[0].uri });
    }
  };

  const classifierhandler = async () => {
    navigation.navigate("objectDetect");
  };
  const seeDatabase = async () => {
    navigation.navigate("databaseScreen");
  };
  const logoutHandler = async () => {
    navigation.navigate("Signin");
  };

  return (
    <View style={homeStyle.container}>
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={homeStyle.title}>Welcome to App!</Text>
        <Pressable onPress={logoutHandler} style={homeStyle.button}>
          <Text style={homeStyle.buttonText}>Log Out! </Text>
        </Pressable>
      </View>
      <View style={homeStyle.cameraContainer}>
        {isFocused && (
          <Camera
            ref={(ref) => setCamera(ref)}
            style={homeStyle.cameraRation}
            type={type}
            ratio={"1:1"}
          />
        )}
        <View
          style={{
            paddingTop: 5,
            flexDirection: "row",
            justifyContent: "space-evenly",
            position: "absolute",
            left: 170,
            bottom: 10,
          }}
        >
          <Pressable onPress={takePicture} style={homeStyle.captureButton}>
            <Image source={cameraIcon} style={{ width: 30, height: 30 }} />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          padding: 5,
        }}
      >
        <Pressable onPress={pickImage} style={homeStyle.button}>
          <Text style={homeStyle.buttonText}>Gallery</Text>
        </Pressable>
        <Pressable onPress={seeDatabase} style={homeStyle.button}>
          <Text style={homeStyle.buttonText}>Database</Text>
        </Pressable>
        <Pressable onPress={classifierhandler} style={homeStyle.button}>
          <Text style={homeStyle.buttonText}>AI MODEL</Text>
        </Pressable>
      </View>
    </View>
  );
}
