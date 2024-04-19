import { StyleSheet } from "react-native";

const homeStyle = StyleSheet.create({
  container: {
    flex: 0,
    width: "100%",
    height: "100%",
  },
  cameraRation: {
    flex: 1,
    aspectRatio: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 2,
  },
  captureButton: {
    backgroundColor: "silver",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 2,
    width: 50,
    marginRight: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const imgStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  pressable: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: "center",
  },
  pressableText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

const objectStyle = StyleSheet.create({});

export { imgStyles, homeStyle, objectStyle };
