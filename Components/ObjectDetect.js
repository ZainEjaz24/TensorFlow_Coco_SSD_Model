// import React, { useEffect, useRef, useState } from "react";
// import { Dimensions, StyleSheet, Text, View } from "react-native";
// import { Camera } from "expo-camera";
// import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
// import * as tf from "@tensorflow/tfjs";
// import * as cocoSsd from "@tensorflow-models/coco-ssd";

// const TensorCamera = cameraWithTensors(Camera);

// const { width, height } = Dimensions.get("window");

// export default function App() {
//   const [model, setModel] = useState(null);
//   const [predictions, setPredictions] = useState([]);
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const { status } = await Camera.requestCameraPermissionsAsync();
//         if (status !== "granted") {
//           console.log("Camera permission not granted");
//           return;
//         }
//         await tf.ready();
//         console.log("TensorFlow is ready");
//         console.log("Coco-SSD Model is Loading...");
//         const loadedModel = await cocoSsd.load();
//         console.log("COCO-SSD model loaded:", loadedModel);
//         setModel(loadedModel);
//       } catch (error) {
//         console.error("Error loading COCO-SSD model:", error);
//       }
//     })();
//   }, []);

//   const handleCameraStream = async (images) => {
//     const loop = async () => {
//       const nextImageTensor = images.next().value;

//       if (!model || !nextImageTensor)
//         throw new Error("No model or image tensor");

//       try {
//         const predictions = await model.detect(nextImageTensor);
//         console.log("Predictions:", predictions);
//         setPredictions(predictions);
//       } catch (error) {
//         console.error("Error detecting objects:", error);
//       }

//       requestAnimationFrame(loop);
//     };
//     loop();
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.cameraContainer}>
//         <TensorCamera
//           ref={cameraRef}
//           style={styles.camera}
//           type={Camera.Constants.Type.back}
//           cameraTextureHeight={height}
//           cameraTextureWidth={width}
//           resizeHeight={100}
//           resizeWidth={152}
//           resizeDepth={3}
//           onReady={(images) => handleCameraStream(images)}
//           autorender={true}
//           useCustomShadersToResize={false}
//         />
//       </View>

//       <View style={styles.objectContainer}>
//         {predictions.map((object, index) => {
//           const leftPos = Math.round(object.bbox[0]);
//           const topPos = Math.round(object.bbox[1]);
//           const rectWidth = Math.round(object.bbox[2]);
//           const rectHeight = Math.round(object.bbox[3]);
//           console.log(
//             `Object ${index} - Left: ${leftPos}, Top: ${topPos}, Width: ${rectWidth}, Height: ${rectHeight}`
//           );

//           if (rectWidth > 0 && rectHeight > 0) {
//             return (
//               <View key={index} style={styles.objectLabelContainer}>
//                 <Text style={styles.objectLabel}>{object.class}</Text>
//               </View>
//             );
//           } else {
//             console.log("Width or height is zero or negative");
//           }
//         })}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     flexDirection: "row",
//   },
//   cameraContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   camera: {
//     width: "100%",
//     height: "100%",
//   },
//   objectContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   objectLabelContainer: {
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//     borderRadius: 5,
//     padding: 5,
//     marginBottom: 10,
//   },
//   objectLabel: {
//     color: "black",
//     fontSize: 16,
//   },
// });

import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

const TensorCamera = cameraWithTensors(Camera);

const { width, height } = Dimensions.get("window");

export default function App() {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== "granted") {
          console.log("Camera permission not granted");
          return;
        }
        await tf.ready();
        console.log("TensorFlow is ready");
        console.log("Coco-SSD Model is Loading...");
        const loadedModel = await cocoSsd.load();
        console.log("COCO-SSD model loaded:", loadedModel);
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading COCO-SSD model:", error);
      }
    })();
  }, []);

  const handleCameraStream = async (images) => {
    const loop = async () => {
      const nextImageTensor = images.next().value;

      if (!model || !nextImageTensor)
        throw new Error("No model or image tensor");

      try {
        const predictions = await model.detect(nextImageTensor);
        console.log("Predictions:", predictions);
        setPredictions(predictions);
      } catch (error) {
        console.error("Error detecting objects:", error);
      }

      requestAnimationFrame(loop);
    };
    loop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <TensorCamera
          ref={cameraRef}
          style={styles.camera}
          type={Camera.Constants.Type.back}
          cameraTextureHeight={height}
          cameraTextureWidth={width}
          resizeHeight={100}
          resizeWidth={152}
          resizeDepth={3}
          onReady={(images) => handleCameraStream(images)}
          autorender={true}
          useCustomShadersToResize={false}
        />
      </View>

      <View style={styles.objectContainer}>
        <Text style={styles.ObjectHeading}>
          Object on the Live Camera Screen
        </Text>
        {predictions.map((object, index) => (
          <Text key={index} style={styles.objectLabel}>
            {object.class}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  cameraContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  objectContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
  },
  objectLabel: {
    color: "black",
    fontSize: 20,
    marginBottom: 5,
    textTransform: "capitalize",
  },
  ObjectHeading: {
    color: "red",
    fontSize: 22,
    fontWeight: "bold",
    margin: 5,
  },
});
