import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';



const App = () => {

  return (
    <SafeAreaView >
      <StatusBar />
      <ScrollView>
        <View>
          <Text>Hello</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default App;
