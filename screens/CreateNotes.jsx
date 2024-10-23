import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function CreateNotes() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const deleteImage = () => {
    setImage(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#f4f4f4" />
        </TouchableOpacity>

        <View style={styles.inputsContainer}>
          <Text style={styles.title}>Title</Text>
          <TextInput
            placeholder="Add title"
            style={styles.input}
            cursorColor={"#272731"}
            multiline={true}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <Text style={styles.dec}>Description</Text>
          <TextInput
            placeholder="Add your description"
            style={styles.descInput}
            cursorColor={"#272731"}
            multiline={true}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />

          <TouchableOpacity style={styles.uploadPicture} onPress={pickImage}>
            {!image ? (
              <Entypo name="upload-to-cloud" size={30} color="black" />
            ) : (
              <ImageBackground source={{ uri: image }} style={styles.image}>
                <Pressable style={styles.deleteButton} onPress={deleteImage}>
                  <MaterialIcons name="delete" size={20} color="#fff" />
                </Pressable>
              </ImageBackground>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: "#fff" }}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  backContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#272731",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  inputsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    height: 48,
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#272731",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
  },
  descInput: {
    height: 48,
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#272731",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
  },
  dec: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  uploadPicture: {
    width: "100%",
    height: 150,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    borderRadius: 12,
    zIndex: 9999,
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    height: 35,
    width: 35,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 5,
    bottom: 5,
    zIndex: 99,
  },
  btn: {
    width: "100%",
    height: 48,
    backgroundColor: "#272731",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },
});
