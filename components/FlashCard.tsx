import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button
} from "react-native";

interface Props {
  question: string;
  answer: string;
}

export default function FlashCard({
  question,
  answer
}: Props) {

  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <View style={styles.card}>

      <Text style={styles.title}>
        {question}
      </Text>

      {showAnswer && (
        <Text style={styles.answer}>
          {answer}
        </Text>
      )}

      <Button
        title={showAnswer ? "Hide Answer" : "Show Answer"}
        onPress={() => setShowAnswer(!showAnswer)}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    margin: 15,
    elevation: 5
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },

  answer: {
    fontSize: 18,
    color: "green",
    marginBottom: 20
  }

});