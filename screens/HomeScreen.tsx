import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";

import FlashCard from "../components/FlashCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }: any) {

  const [cards, setCards] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadCards();
    });

    return unsubscribe;
  }, [navigation]);

  async function loadCards() {
    const data = await AsyncStorage.getItem("cards");

    if (data) {
      setCards(JSON.parse(data));
    } else {
      setCards([]);
    }
  }

  function nextCard() {
    if (index < cards.length - 1)
      setIndex(index + 1);
  }

  function previousCard() {
    if (index > 0)
      setIndex(index - 1);
  }

  async function deleteCard() {

    Alert.alert(
      "Delete",
      "Delete this flashcard?",
      [
        { text: "Cancel" },

        {
          text: "Delete",

          onPress: async () => {

            const updated = cards.filter(
              (_, i) => i !== index
            );

            setCards(updated);

            await AsyncStorage.setItem(
              "cards",
              JSON.stringify(updated)
            );

            if (index > 0)
              setIndex(index - 1);
          }
        }
      ]
    );
  }

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Flashcard Quiz
      </Text>

      {cards.length == 0 ? (

        <Text>No Flashcards</Text>

      ) : (

        <FlashCard
          question={cards[index].question}
          answer={cards[index].answer}
        />

      )}

      <View style={styles.row}>

        <TouchableOpacity
          style={styles.button}
          onPress={previousCard}
        >
          <Text style={styles.text}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={nextCard}
        >
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.navigate("Add Card")}
      >
        <Text style={styles.text}>
          Add Card
        </Text>
      </TouchableOpacity>

      {cards.length > 0 && (

        <>
          <TouchableOpacity
            style={styles.edit}
            onPress={() =>
              navigation.navigate("Edit Card", {
                card: cards[index],
                index
              })
            }
          >
            <Text style={styles.text}>
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.delete}
            onPress={deleteCard}
          >
            <Text style={styles.text}>
              Delete
            </Text>
          </TouchableOpacity>
        </>

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    width: "45%"
  },

  add: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 8,
    marginTop: 20
  },

  edit: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 8,
    marginTop: 15
  },

  delete: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 8,
    marginTop: 15
  },

  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  }

});