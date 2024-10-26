import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View,
  Modal,
  Text,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";

export default function CreateNotes() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    setModalVisible(true);
  };

  const confirmSave = async () => {
    try {
      const response = await axios.post("http://192.168.10.10:3000/api/notes", {
        title,
        description,
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableHighlight
              style={styles.addContainer}
              onPress={handleBack}
            >
              <Entypo name="chevron-left" size={30} color="#fff" />
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.addContainer}
              onPress={handleSave}
            >
              <MaterialIcons name="save" size={24} color="#fff" />
            </TouchableHighlight>
          </View>
          <TextInput
            placeholder="Title"
            style={styles.titleInput}
            cursorColor={"#9A9A9A"}
            placeholderTextColor={"#9a9a9a"}
            multiline={true}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Type something..."
            style={styles.titleDesc}
            cursorColor={"#9A9A9A"}
            placeholderTextColor={"#9a9a9a"}
            multiline={true}
            value={description}
            onChangeText={setDescription}
          />
        </ScrollView>
      </View>
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
                <MaterialIcons name="info" size={30} color="#606060" />
              </View>
              <Text style={styles.modalMessage}>Save changes ?</Text>
              <View style={styles.modalButtons}>
                <TouchableHighlight
                  onPress={() => setModalVisible(false)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Discard</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={confirmSave}
                  style={styles.saveButton}
                >
                  <Text style={styles.buttonText}>Save</Text>
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
  titleInput: {
    fontSize: 40,
    color: "#9A9A9A",
    fontFamily: "PlusJakartaSansSemiBold",
    marginTop: 30,
  },
  titleDesc: {
    fontSize: 23,
    color: "#9A9A9A",
    fontFamily: "PlusJakartaSansRegular",
    marginTop: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(4000, 4000, 4000, 0.1)",
  },
  modalContainer: {
    width: "85%",
    height: "25%",
    backgroundColor: "#252525",
    borderRadius: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
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
});
