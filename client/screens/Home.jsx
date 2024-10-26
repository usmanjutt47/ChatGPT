import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  Modal,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../context/NotesContext";

export default function Home() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { notes, fetchUserNotes, error } = useNotes();

  useEffect(() => {
    const fetchStoredUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        fetchUserNotes(storedUserId); // Pass userId to fetchUserNotes
      }
    };

    fetchStoredUserId();
  }, []);

  const handleCreate = () => {
    navigation.navigate("CreateNotes");
  };

  const handleSearch = () => {
    navigation.navigate("Search");
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userId");
    navigation.navigate("Login");
  };

  if (error) {
    return <Text>Error loading notes...</Text>;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#252525" }]}>
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
              <TouchableHighlight
                style={styles.searchContainer}
                onPress={() => setModalVisible(true)}
              >
                <MaterialIcons name="logout" size={24} color="#fff" />
              </TouchableHighlight>
            </View>
          </View>
        </View>

        {notes && notes.length === 0 ? (
          <View style={styles.noNotesContainer}>
            <Image
              source={require("../assets/images/no.png")}
              style={styles.image}
            />
            <Text style={styles.noNotesText}>Create your first note!</Text>
          </View>
        ) : (
          <FlatList
            data={notes}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ScrollView
                contentContainerStyle={{ flex: 1 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <Pressable
                  style={[styles.noteCard, { backgroundColor: item.color }]}
                >
                  <Text style={styles.noteTitle}>{item.title}</Text>
                  <Text style={styles.noteContent}>{item.content}</Text>
                </Pressable>
              </ScrollView>
            )}
          />
        )}

        <TouchableHighlight style={styles.addContainer} onPress={handleCreate}>
          <AntDesign name="plus" size={28} color="#fff" />
        </TouchableHighlight>
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View
              style={{
                height: "90%",
                width: "90%",
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <View style={{ alignSelf: "center" }}>
                <MaterialIcons name="logout" size={24} color="#CFCFCF" />
              </View>
              <Text style={styles.modalMessage}>Logout from your account?</Text>
              <View style={styles.modalButtons}>
                <TouchableHighlight
                  onPress={() => setModalVisible(false)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={handleLogout}
                  style={styles.saveButton}
                >
                  <Text style={styles.buttonText}>Logout</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    height: "100%",
    width: "95%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    marginBottom: "15%",
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
    backgroundColor: "#3B3B3B",
    position: "absolute",
    bottom: "5%",
    right: 5,
    maxHeight: 70,
    maxWidth: 70,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "85%",
    height: "25%",
    backgroundColor: "#252525",
    borderRadius: 20,
    alignItems: "center",
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
    color: "#CFCFCF",
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    backgroundColor: "#ff0000",
    borderRadius: 5,
    height: 39,
    width: 112,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#30BE71",
    borderRadius: 5,
    height: 39,
    width: 112,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  notesContainer: {
    marginTop: 20,
  },
  noteCard: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 30,
    width: "100%",
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  noteContent: {
    fontSize: 16,
    color: "#000",
  },
});
