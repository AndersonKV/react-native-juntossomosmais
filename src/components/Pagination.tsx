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
  arrPerson: DataProps[];
  imageHeight: number;
  page: number;
  len: number;
  handleFetchMore: (value: number) => void;
}

function Pagination({
  arrPerson,
  imageHeight,
  page,
  len,
  handleFetchMore,
}: Props) {
  return (
    <View style={{...styles.gridView}}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={arrPerson}
        numColumns={2}
        style={{borderColor: '#d3d3d3', borderRightWidth: 5}}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            style={{
              borderWidth: 1,
              alignItems: 'center',
              borderColor: '#d3d3d3',
              backgroundColor: '#fff',
              flex: 1,
              paddingVertical: 10,
              marginVertical: 5,
              marginHorizontal: 5,
            }}>
            <Image
              style={{
                width: 80,
                height: 80,
                borderWidth: 1,
                borderRadius: 50,
                alignItems: 'center',
              }}
              resizeMode={'contain'}
              source={{
                uri: `${item.picture.large}`,
              }}
            />
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {item.name.first}
              </Text>
              <Text>{item.location.street}</Text>
              <Text>{item.location.state}</Text>
              <Text>CEP - {item.location.postcode}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.paginationView}>
        {Array.from({length: Number(len)}, (_, index) => (
          <TouchableOpacity
            key={index.toString()}
            onPress={() => handleFetchMore(Number(index + 1))}
            style={page - 1 === index ? styles.buttonActive : styles.button}>
            <Text style={page - 1 === index ? styles.textActive : styles.text}>
              {index + 1}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
