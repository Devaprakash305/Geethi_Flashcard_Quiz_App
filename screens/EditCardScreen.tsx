import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditCardScreen({ route, navigation }: any) {

  const { card, index } = route.params;

  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);

  async function updateCard() {

    const data = await AsyncStorage.getItem("cards");
    const cards = data ? JSON.parse(data) : [];

    cards[index] = {
      ...card,
      question,
      answer
    };

    await AsyncStorage.setItem(
      "cards",
      JSON.stringify(cards)
    );

    navigation.goBack();
  }

  return (

    <View style={styles.container}>

      <TextInput
        style={styles.input}
        value={question}
        onChangeText={setQuestion}
        placeholder="Question"
      />

      <TextInput
        style={styles.input}
        value={answer}
        onChangeText={setAnswer}
        placeholder="Answer"
      />

      <Button
        title="Update Card"
        onPress={updateCard}
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
    borderRadius: 10,
    marginBottom: 20
  }

});