import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Search() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

  const clearInput = () => {
    setSearchText("");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.innerContainer}>
        <TouchableHighlight style={styles.addContainer} onPress={handleBack}>
          <Entypo name="chevron-left" size={30} color="#fff" />
        </TouchableHighlight>
        <View style={styles.inputContainer}>
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search here..."
            style={styles.searchInput}
            cursorColor={"#CCCCCC"}
            placeholderTextColor={"#CCCCCC"}
          />
          {searchText.length > 0 && (
            <Pressable style={styles.clearButton} onPress={clearInput}>
              <MaterialIcons name="close" size={20} color="#fff" />
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#252525",
    flex: 1,
  },
  innerContainer: {
    height: "100%",
    width: "95%",
    alignSelf: "center",
  },
  addContainer: {
    height: 50,
    width: 50,
    backgroundColor: "#3B3B3B",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: "#CCCCCC",
    borderRadius: 44,
    color: "#FFFFFF",
    backgroundColor: "#3B3B3B",
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: "PlusJakartaSansRegular",
  },
  clearButton: {
    position: "absolute",
    right: 15,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
