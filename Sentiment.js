import React, { useState } from 'react';
import { Text, TextInput, View , Pressable} from 'react-native';

const SentimentAnalysis = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [confidence, setConfidence] = useState(null);

  const analyzeText = async () => {
    const url="https://epelmbrm61.execute-api.us-east-1.amazonaws.com/dev/sentiment"
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ txt: text }) 
    };


    try {
      const response = await fetch(url, options)
      .then( res=>res.json())
      .then((result)=> {
        setSentiment(result.sentiment);
        setConfidence(result.confidence);
      })

      
    } catch (error) {
      console.error(error);
      // Handle errors gracefully
    }
  };

  return (
    <View>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        onChangeText={setText}
        value={text}
        multiline
        placeholder="Enter your text here"
      />
      <Pressable
        style={{
          backgroundColor: '#007bff',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={analyzeText}
      >
        <Text style={{fontSize:40}}>Analyze</Text>
      </Pressable>
      {sentiment && confidence && (
        <Text style={{fontSize:40}}>Sentiment: {sentiment} (Confidence: {confidence})</Text>
      )}
    </View>
  );
};

export default SentimentAnalysis;
