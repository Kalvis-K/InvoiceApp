import axios from 'axios';
import { parseString } from 'react-native-xml2js';
import { Alert } from 'react-native';
import { API_URL, API_USERNAME, API_PASSWORD } from '@env';

export const getAPIData = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': 'Basic ' + btoa(API_USERNAME + ':' + API_PASSWORD),
        'Content-Type': 'application/xml',
      },
    });
    
    return new Promise((resolve, reject) => {
      parseString(response.data, (err, result) => {
        if (err) {
          Alert.alert('Error', 'Failed to parse XML');
          reject(err);
        } else {
          const invoices = result?.data?.IVVc || [];
          resolve(invoices);
        }
      });
    });

  } catch (error) {
    Alert.alert('Error', 'Failed to connect to server.');
    throw error;
  }
};
