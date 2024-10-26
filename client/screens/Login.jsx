import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Show password state
  const navigation = useNavigation();

  const handleSendCode = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Email is required!",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.10.2:5000/api/users/register",
        { email }
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: response.data.message,
      });
      setEmailSent(true);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password is required!",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.10.2:5000/api/users/login",
        { email, password }
      );

      // Success toast
      Toast.show({
        type: "success",
        text1: "Success",
        text2: response.data.message,
      });

      // Store user ID (_id) in AsyncStorage
      await AsyncStorage.setItem("userId", response.data.userId);
      console.log("User ID: " + response.data.userId);

      // Navigate to Home
      navigation.navigate("Home");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: "100%", width: "100%", justifyContent: "center" }}>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="email"
            size={24}
            color="#CCCCCC"
            style={{ paddingRight: 10 }}
          />
          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            placeholderTextColor={"#CCCCCC"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {!emailSent ? (
          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={handleSendCode}
            disabled={loading}
          >
            <Text style={styles.loginText}>
              {loading ? "Loading..." : "Send Code"}
            </Text>
          </TouchableHighlight>
        ) : (
          <View>
            <View style={styles.passwordWrapper}>
              <MaterialIcons
                name="lock"
                size={24}
                color="#CCCCCC"
                style={{ paddingRight: 10 }}
              />
              <TextInput
                placeholder="Enter your password"
                style={styles.passwordInput}
                placeholderTextColor={"#CCCCCC"}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={{ padding: 10 }}
              >
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={24}
                  color="#CCCCCC"
                />
              </Pressable>
            </View>
            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginText}>
                {loading ? "Loading..." : "Login"}
              </Text>
            </TouchableHighlight>
          </View>
        )}
      </View>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252525",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  inputWrapper: {
    height: 50,
    width: "90%",
    backgroundColor: "#3B3B3B",
    borderRadius: 10,
    paddingLeft: 15,
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#CCCCCC",
  },
  passwordWrapper: {
    height: 50,
    width: "90%",
    backgroundColor: "#3B3B3B",
    borderRadius: 10,
    paddingLeft: 15,
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    color: "#CCCCCC",
  },
  buttonContainer: {
    height: 50,
    width: "90%",
    backgroundColor: "#252525",
    elevation: 10,
    shadowColor: "#FFFFFF",
    marginTop: "15%",
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
