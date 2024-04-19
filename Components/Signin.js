import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import loginStyle from "./LoginStyle";
import { firebaseAuth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Signin({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const auth = firebaseAuth;

  const loginHandler = async () => {
    if (email === "" || pass === "") {
      setError("Inputs can't be empty");
      return;
    } else {
      setLoading(true);
      try {
        const response = await signInWithEmailAndPassword(auth, email, pass);
        setLoading(false);
        setEmail("");
        setPass("");
        navigation.navigate("Home");
      } catch (error) {
        setError("Invalide credentials");
        setEmail("");
        setPass("");
      }
    }
  };

  const switchAccountHandler = () => {
    navigation.navigate("Signup");
  };
  return (
    <ImageBackground
      style={{ flex: 1, width: "100%" }}
      source={require("../assets/backgroundImg.jpg")}
    >
      <KeyboardAvoidingView behavior="padding" style={loginStyle.signupView}>
        <Text style={{ color: "#fff", fontSize: 32, fontWeight: 600 }}>
          Signin
        </Text>

        <View style={loginStyle.overlay}>
          <TextInput
            style={loginStyle.inputs}
            onFocus={() => setError("")}
            placeholder="email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={loginStyle.inputs}
            onFocus={() => setError("")}
            placeholder="password"
            secureTextEntry={true}
            value={pass}
            onChangeText={(text) => setPass(text)}
          />

          {loading ? (
            <ActivityIndicator size={32} color="white" />
          ) : (
            <Pressable onPress={loginHandler} style={loginStyle.signupBtn}>
              <Text style={{ color: "#fff", fontSize: 18 }}>Signin</Text>
            </Pressable>
          )}

          {error !== "" && (
            <View
              style={{
                backgroundColor: "white",
                padding: 4,
                borderRadius: 5,
                marginHorizontal: 10,
              }}
            >
              <Text style={{ color: "red", fontSize: 14, fontWeight: 600 }}>
                {error}
              </Text>
            </View>
          )}

          <View style={loginStyle.switchAccount}>
            <Text style={{ fontSize: 16, color: "#fff", fontWeight: 800 }}>
              Don't have an account?{" "}
            </Text>
            <Pressable
              onPress={switchAccountHandler}
              style={loginStyle.switchBtn}
            >
              <Text style={{ color: "#fff", fontSize: 14 }}>Signup</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
