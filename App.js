import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Home from "./Components/Home";
import ImagePicker from "./Components/ImagePicker";
import ObjectDetect from "./Components/ObjectDetect";
import DatabaseScreen from "./Components/DatabaseScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ImagePicker" component={ImagePicker} />
        <Stack.Screen name="objectDetect" component={ObjectDetect} />
        <Stack.Screen name="databaseScreen" component={DatabaseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
