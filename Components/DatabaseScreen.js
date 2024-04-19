import {
  View,
  Text,
  Pressable,
  Alert,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { uploadStyle } from "./ScreenStyles";
import * as ImagePicker from "expo-image-picker";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase";
import { ActivityIndicator } from "react-native";

export default function DatabaseScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  useEffect(() => {
    fetchUploadedImages(); // Fetch images on component mount
  }, []);

  // Function to fetch uploaded images from Firebase Storage
  const fetchUploadedImages = async () => {
    try {
      // List all items in the 'images' directory
      const listResult = await listAll(ref(storage, "images"));
      // Get download URLs for each image
      const urls = await Promise.all(
        listResult.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { url, name: itemRef.name };
        })
      );
      // Set the URLs and names in state
      setImages(urls);
    } catch (error) {
      console.log("Error fetching images:", error);
    }
  };

  // Function to handle selecting an image from device gallery
  const selectImageHandler = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 1,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error in selecting image");
    }
  };

  // Function to upload selected image to Firebase Storage
  const uploadFirebaseHandler = async () => {
    setUploading(true);
    try {
      // Extract filename from image URI
      const filename = selectedImage.split("/").pop();
      // Fetch blob data of the selected image
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      // Create reference to 'images/filename' in Firebase Storage
      const reference = ref(storage, `images/${filename}`);
      // Upload blob data to Firebase Storage
      await uploadBytes(reference, blob);
      setSelectedImage(null);
      setUploading(false);
      Alert.alert("File Uploaded");
      fetchUploadedImages(); // Refresh the list of images after upload
    } catch (error) {
      setUploading(false);
      console.log(error);
      alert("Error Uploading File");
    }
  };

  // Function to delete an image from Firebase Storage
  const deleteImage = async (name) => {
    try {
      // Create reference to the image to be deleted
      await deleteObject(ref(storage, `images/${name}`));
      fetchUploadedImages(); // Refresh the list of images after deletion
      setModalVisible(false); // Close the modal after deletion
    } catch (error) {
      console.log("Error deleting image:", error);
      alert("Error deleting image");
    }
  };

  // Function to open the modal and display the selected image
  const openImageModal = (url) => {
    setSelectedImageUrl(url);
    setModalVisible(true);
  };

  return (
    <View style={uploadStyle.uploadView}>
      {/* Header */}
      <Text
        style={{
          marginTop: 30,
          color: "#000",
          fontWeight: 600,
          fontSize: 20,
        }}
      >
        Firebase Gallery
      </Text>

      {/* Render the uploaded images */}
      {images.length > 0 && (
        <FlatList
          data={images}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openImageModal(item.url)}>
              <View style={{ position: "relative" }}>
                {/* Display the image */}
                <Image
                  source={{ uri: item.url }}
                  style={{ width: 150, height: 150, margin: 5 }}
                />
                {/* Button to delete the image */}
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Delete Image",
                      "Are you sure you want to delete this image?",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        {
                          text: "Yes",
                          onPress: () => deleteImage(item.name),
                        },
                      ]
                    )
                  }
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    backgroundColor: "red",
                    borderRadius: 20,
                    padding: 5,
                    zIndex: 1,
                  }}
                >
                  <Text style={{ color: "white" }}>X</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
          horizontal
        />
      )}

      {/* Display selected image before upload */}
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 300, height: 300, marginBottom: 20 }}
        />
      )}

      {/* Button to select image from device gallery */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: "blue",
        }}
      >
        Upload image to firebase
      </Text>
      <Pressable
        onPress={selectImageHandler}
        style={uploadStyle.uploadPressable}
      >
        <Text
          style={{ color: "#fff", fontWeight: 600, fontSize: 18, marginTop: 0 }}
        >
          Select Image
        </Text>
      </Pressable>

      {/* Button to upload selected image to Firebase */}
      {selectedImage && (
        <Pressable
          onPress={uploadFirebaseHandler}
          style={uploadStyle.uploadPressable}
        >
          {uploading ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              Upload to Firebase
            </Text>
          )}
        </Pressable>
      )}

      {/* Modal to display selected image */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Image
              source={{ uri: selectedImageUrl }}
              style={{ width: 300, height: 300 }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
