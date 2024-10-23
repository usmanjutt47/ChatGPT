import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image,
  Text,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const titles = [
  "Stylish Handbag",
  "Elegant Watch",
  "Luxury Sunglasses",
  "Leather Wallet",
  "Sports Shoes",
  "Stylish Backpack",
  "Wristband Fitness Tracker",
];

const descriptions = [
  "This is a stylish handbag that suits all occasions.",
  "An elegant watch to keep you on time and in style.",
  "Protect your eyes with these luxury sunglasses.",
  "A classic leather wallet for all your essentials.",
  "Comfortable sports shoes for your active lifestyle.",
  "A stylish backpack for everyday use.",
  "Track your fitness goals effortlessly.",
];

const generateRandomData = () => {
  const data = Array.from({ length: 1 }, (_, index) => ({
    id: index.toString(),
    title: titles[Math.floor(Math.random() * titles.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    image: `https://picsum.photos/200/300?random=${index + 1}`,
  }));
  return data;
};

export default function Home() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [data] = useState(generateRandomData());

  const clearSearch = () => {
    setSearchText("");
  };

  const renderItem = ({ item }) => (
    // const navigation = useNavigation();
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate("Details", {
          title: item.title,
          description: item.description,
          image: item.image,
        });
      }}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <Icon name="search" size={22} color="#272731" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Search your notes"
            value={searchText}
            onChangeText={setSearchText}
            cursorColor="#272731"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Icon name="close-circle" size={22} color="#272731" />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />

        <TouchableOpacity
          style={styles.addContainer}
          onPress={() => navigation.navigate("CreateNotes")}
        >
          <AntDesign name="plus" size={24} color="#f4f4f4" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  innerContainer: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
  },
  addContainer: {
    backgroundColor: "#272731",
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "3%",
    right: 0,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#272731",
    borderRadius: 12,
    height: 48,
    width: "100%",
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
  listContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});
