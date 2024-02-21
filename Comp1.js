import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';

const  Comp=()=> {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');

  const analyzeSentiment = async () => {
    const end_pt="https://epelmbrm61.execute-api.us-east-1.amazonaws.com/dev/sentiment"
    try {
      const response = await axios.post(end_pt, { "text":text });
      // Assuming the response contains the sentiment analysis in a field named sentiment
      setSentiment(response.data.sentiment);
    } catch (error) {
      console.log(error);
    }
  };
  let sentimentColor = 'grey';
  switch (sentiment) {
    case 'POSITIVE':
      sentimentColor = 'green';
      break;
    case 'NEGATIVE':
      sentimentColor = 'red';
      break;
    case 'NEUTRAL':
      sentimentColor = 'blue';
      break;
    // Add more cases as needed
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Type your text here..."
        multiline
        numberOfLines={4}
        onChangeText={setText}
        value={text}
      />
      <Button title="Analyze" onPress={analyzeSentiment} />
      {sentiment && 
      <Text style={[styles.sentimentText, { backgroundColor: sentimentColor }]}>
      Sentiment: {sentiment}
    </Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textInput: {
    height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  sentimentText: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    // Default background color
    backgroundColor: 'grey',
  },
});
export default  Comp; 