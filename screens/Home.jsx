import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Home() {
  const navigation = useNavigation();
  const handleCreate = () => {
    navigation.navigate("CreateNotes");
  };
  const handleSearch = () => {
    navigation.navigate("Search");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <View style={styles.headerInnerContainer}>
            <Text style={styles.text}>Notes</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableHighlight
                style={styles.searchContainer}
                onPress={handleSearch}
              >
                <AntDesign name="search1" size={24} color="#fff" />
              </TouchableHighlight>
              <TouchableHighlight style={styles.searchContainer}>
                <MaterialIcons name="logout" size={24} color="#fff" />
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={styles.noNotesContainer}>
          <Image
            source={require("../assets/images/no.png")}
            style={styles.image}
          />
          <Text style={styles.noNotesText}>Create your first note !</Text>
        </View>
        <TouchableHighlight style={styles.addContainer} onPress={handleCreate}>
          <AntDesign name="plus" size={28} color="#fff" />
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252525",
  },
  innerContainer: {
    height: "100%",
    width: "95%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
  },
  text: {
    fontSize: 43,
    color: "#fff",
    fontFamily: "PlusJakartaSansBold",
  },
  headerInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  searchContainer: {
    height: 50,
    width: 50,
    backgroundColor: "#3B3B3B",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  noNotesContainer: {
    justifyContent: "center",
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    height: 286,
    width: 350,
    maxWidth: 350,
    maxHeight: 286,
  },
  noNotesText: {
    fontFamily: "PlusJakartaSansMedium",
    color: "#fff",
    fontSize: 20,
  },
  addContainer: {
    height: 70,
    width: 70,
    backgroundColor: "#252525",
    position: "absolute",
    bottom: "5%",
    right: 5,
    maxHeight: 70,
    maxWidth: 70,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
