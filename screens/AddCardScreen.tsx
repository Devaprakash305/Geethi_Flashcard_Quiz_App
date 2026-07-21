import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddCardScreen({ navigation }: any) {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function saveCard() {

    const data = await AsyncStorage.getItem("cards");

    const cards = data ? JSON.parse(data) : [];

    cards.push({
      id: Date.now(),
      question,
      answer
    });

    await AsyncStorage.setItem(
      "cards",
      JSON.stringify(cards)
    );

    navigation.goBack();
  }

  return (

    <View style={styles.container}>

      <TextInput
        placeholder="Question"
        style={styles.input}
        value={question}
        onChangeText={setQuestion}
      />

      <TextInput
        placeholder="Answer"
        style={styles.input}
        value={answer}
        onChangeText={setAnswer}
      />

      <Button
        title="Save Card"
        onPress={saveCard}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginBottom: 20,
    borderRadius: 8
  }

});