import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  FlatList,
  StatusBar,
  Button,
  SafeAreaView,
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import {DataProps} from '../types/types';

const Home: React.FC = ({navigation, route}) => {
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round((dimensions.height * 9) / 16);
  const imageWidth = Math.round((dimensions.width * 9) / 16);

  useEffect(() => {
    async function init() {}
    init();
  }, []);

  return (
    <View>
      <Text>iniciando</Text>
    </View>
  );
};

export default Home;
