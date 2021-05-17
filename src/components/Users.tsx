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
  handleFetchMore: (arg: number, arg2: string) => void;
}

function Users({arrPerson, page, len}: Props) {
  return (
    <View style={{...styles.gridView}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color: '#000', fontWeight: 'bold'}}>
          {arrPerson.length} items
        </Text>
        {len !== 0 ? (
          <Text style={{color: '#000', fontWeight: 'bold'}}>
            {page}/{len}
          </Text>
        ) : null}
      </View>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={arrPerson}
        numColumns={2}
        style={styles.listCard}
        renderItem={({item, index}) => (
          <TouchableOpacity key={index} style={styles.userCard}>
            <Image
              style={styles.img}
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

const styles = StyleSheet.create({
  gridView: {
    marginTop: -20,
    // marginBottom: -15,
    flex: 1,
  },
  listCard: {
    borderColor: '#d3d3d3',
    borderRightWidth: 5,
  },
  userCard: {
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#d3d3d3',
    backgroundColor: '#fff',
    flex: 1,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  img: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
  },
});

export default Users;
