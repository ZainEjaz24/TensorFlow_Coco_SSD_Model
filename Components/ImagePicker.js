import { View, Text, Image, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { imgStyles } from "./HomeStyle";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export default function ImagePicker({ route }) {
  const { uri } = route.params;
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    setUploading(true);

    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = uri.split("/").pop();
      const reference = ref(storage, `images/${filename}`);
      const result = await uploadBytes(reference, blob);
      const url = await getDownloadURL(result.ref);
      setUploading(false);
      Alert.alert("File Uploaded");
    } catch (error) {
      setUploading(false);
      console.log(error);
      alert("error");
    }
  };

  return (
    <View style={imgStyles.container}>
      <Image source={{ uri }} style={imgStyles.image} />
      <Pressable onPress={handleUpload} style={imgStyles.pressable}>
        <Text style={imgStyles.pressableText}>
          {uploading ? "Uploading File..." : "Upload to Firebase"}
        </Text>
      </Pressable>
    </View>
  );
}
