import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import {DataProps} from '../types/types';

interface Props {
  imageHeight: number;
  page: number;
  len: number;
  handleFetchMore: (arg: number, arg2: string) => void;
  stateSelected: string;
}

function Pagination({
  imageHeight,
  page,
  len,
  handleFetchMore,
  stateSelected,
}: Props) {
  return (
    <View style={styles.paginationView}>
      {Array.from({length: Number(len)}, (_, index) => (
        <TouchableOpacity
          key={index.toString()}
          onPress={() => handleFetchMore(index + 1, stateSelected)}
          style={page - 1 === index ? styles.buttonActive : styles.button}>
          <Text style={page - 1 === index ? styles.textActive : styles.text}>
            {index + 1}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginBottom: -10,
    flex: 1,
  },
  paginationView: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    flexWrap: 'wrap',
  },
  buttonActive: {
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
  },
  textActive: {
    color: '#fff',
  },
  text: {
    color: '#000',
  },
});

export default Pagination;
