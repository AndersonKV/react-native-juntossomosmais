import React from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';

import {DataProps} from '../types/types';

interface Props {
  arrPerson: DataProps[];
  imageHeight: number;
}

function Pagination({arrPerson, imageHeight}: Props) {
  return (
    <View
      style={{
        borderColor: 'red',
        borderWidth: 3,
        height: imageHeight,
        marginBottom: 50,
      }}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={arrPerson}
        numColumns={2}
        style={{
          borderColor: 'green',
          borderWidth: 3,
        }}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              alignItems: 'center',
              borderColor: '#d3d3d3',
              flex: 1,
              margin: 10,
              paddingVertical: 10,
            }}>
            <Image
              style={{
                width: 80,
                height: 80,
                borderWidth: 1,
                borderRadius: 50,
                borderColor: '#d1d1d1',
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
    </View>
  );
}

export default Pagination;
