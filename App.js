import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import styles from './styles';
import { getAPIData } from './api';

const App = () => {
  const [data, setData] = useState([]);
  
  const handleFetchInvoices = async () => {
    try {
      const invoices = await getAPIData();
      setData(invoices);
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rēķinu aplikācija</Text>
      <Button title="Nolasīt rēķinus" onPress={handleFetchInvoices} style={styles.button}/>

      <ScrollView style={styles.scrollView}>
        {data.length > 0 ? (
          data.map((invoice, index) => (
            <View key={index} style={styles.invoiceContainer}>
              <Text>Rēķina numurs: {invoice.SerNr[0]}</Text>
              <Text>Klients: {invoice.Addr0[0]}</Text>
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
