import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableHighlight } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
        }}
      >
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
          />
        </View>

        {passwordVisible && (
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
              secureTextEntry={true}
            />
          </View>
        )}

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => setPasswordVisible(true)}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
      </View>
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
    color: "#CCCCCC",
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
  },
  passwordWrapper: {
    height: 50,
    width: "90%",
    color: "#CCCCCC",
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
