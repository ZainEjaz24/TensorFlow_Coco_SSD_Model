import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import loginStyle from "./LoginStyle";
import { useNavigation } from "@react-navigation/native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase";

export default function Signup() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [Cpass, setCPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const auth = firebaseAuth;

  const handleSignup = async () => {
    if (name === "" || email === "" || pass === "" || Cpass === "") {
      setError("Inputs can't be empty");
      return;
    }

    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/])(?=.*[A-Z]).{8,}$/;
    const isValidPassword = passwordRegex.test(pass);

    if (!isValidPassword) {
      setError(
        "Password must be of 8 characters,with alteast one special character and on capital letter"
      );
      setPass("");
      return;
    }

    if (pass !== Cpass) {
      setError("Password not matching");
      setPass("");
      setCPass("");
      return;
    } else {
      setLoading(true);

      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          pass
        );
        console.log(response);
        alert("success");
      } catch (err) {
        if (err.message === "Firebase: Error (auth/email-already-in-use).") {
          setError("email already exist");
          setEmail("");
          return;
        }
        if (err.message === "Firebase: Error (auth/invalid-email).") {
          setError("email not valid");
          setEmail("");
          return;
        }
        setError(err.message);
        setEmail("");
        setPass("");
        setName("");
        setCPass("");
      } finally {
        setLoading(false);
        setEmail("");
        setPass("");
        setName("");
        setCPass("");
      }
    }
  };

  const switchAccountHandler = () => {
    navigation.navigate("Signin");
  };
  return (
    <ImageBackground
      style={{ flex: 1, width: "100%" }}
      source={require("../assets/backgroundImg.jpg")}
    >
      <KeyboardAvoidingView behavior="padding" style={loginStyle.signupView}>
        <Text style={{ color: "#fff", fontSize: 32, fontWeight: 600 }}>
          Signup
        </Text>

        <View style={loginStyle.overlay}>
          <TextInput
            style={loginStyle.inputs}
            onFocus={() => setError("")}
            placeholder="name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={loginStyle.inputs}
            onFocus={() => setError("")}
            placeholder="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={loginStyle.inputs}
            onFocus={() => setError("")}
            placeholder="password"
            value={pass}
            onChangeText={(text) => setPass(text)}
          />
          <TextInput
            style={loginStyle.inputs}
            onFocus={() => setError("")}
            placeholder="confirm password"
            value={Cpass}
            onChangeText={(text) => setCPass(text)}
          />

          {loading ? (
            <ActivityIndicator size={32} color="#fff" />
          ) : (
            <Pressable
              onFocus={() => setError("")}
              onPress={handleSignup}
              style={loginStyle.signupBtn}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>Signup</Text>
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
            <Text style={{ fontSize: 16, color: "#ffffff", fontWeight: 700 }}>
              Aready have an account?{" "}
            </Text>
            <Pressable
              onPress={switchAccountHandler}
              style={loginStyle.switchBtn}
            >
              <Text style={{ color: "#fff", fontSize: 14 }}>Signin</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
