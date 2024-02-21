import React from 'react';

const BarIndicator = ({ confidence, sentiment }) => {
  const barLength = confidence * 100; // Assume confidence is between 0 and 1
  const barColor = sentiment === 'positive' ? '#008000' : '#FF0000'; // Example colors

  return (
    <View style={{
      backgroundColor: '#ccc',
      borderRadius: 5,
      height: 10,
      width: barLength + '%', // Dynamically set width based on confidence
      backgroundColor: barColor, // Dynamically set color based on sentiment
    }} />
  );
};
