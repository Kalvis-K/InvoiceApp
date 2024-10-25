import React, { useState } from 'react';
import { View, Text, Button, ScrollView, Alert } from 'react-native';
import xml2js from 'react-native-xml2js';

const App = () => {
  const [data, setData] = useState([]);
  
  const getAPIData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api', {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' +  btoa('TEST:123123123'),
          'Content-Type': 'application/xml',
        },
      });

      const responseText = await response.text();
      console.log(responseText);

      xml2js.parseString(responseText, (err, result) => {
        if (err) {
          console.error('XML Parsing Error:', err);
          return;
        }

        const invoices = result?.IVVc?.Invoice || [];
        setData(invoices || []);
      });
      
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to server.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Rēķinu aplikācija</Text>
      <Button title="Nolasīt rēķinus" onPress={getAPIData} />

      <ScrollView style={{ marginTop: 20 }}>
        {data.length > 0 ? (
          data.map((invoice, index) => (
            <View key={index} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
              <Text>Rēķina numurs: {invoice.SerNr[0]}</Text>
              <Text>Klients: {invoice.ClientName[0]}</Text>
            </View>
          ))
        ) : (
          <Text>Nav pieejami rēķini.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default App;
