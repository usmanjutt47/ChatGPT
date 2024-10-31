import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
  ImageBackground,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Detail = ({ route }) => {
  const navigation = useNavigation();
  const { title, description, image } = route.params;
  const [uploadImage, setUploadImage] = useState(null);
  const [setTitle] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUploadImage(result.assets[0].uri);
    }
  };

  const deleteImage = () => {
    setUploadImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="#f4f4f4" />
      </TouchableOpacity>
      <TouchableOpacity onPress={pickImage}>
        {!uploadImage ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <ImageBackground source={{ uri: image }} style={styles.image}>
            <Pressable style={styles.deleteButton} onPress={deleteImage}>
              <MaterialIcons name="delete" size={20} color="#fff" />
            </Pressable>
          </ImageBackground>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Add title"
        style={[styles.input, { marginTop: 20 }]}
        cursorColor={"#272731"}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Add title"
        style={[styles.input, { marginTop: 10 }]}
        cursorColor={"#272731"}
        value={description}
        onChangeText={setDescription}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    width: "95%",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
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
  uploadPicture: {
    width: "100%",
    height: 150,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  uploadImage: {
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
  input: {
    height: 48,
    width: "100%",
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#272731",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
  },
});

export default Detail;
