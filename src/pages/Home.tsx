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
  TextInput,
  ScrollView,
} from 'react-native';

import {DataProps} from '../types/types';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import api from '../services/index';

//COMPONENTS
import Pagination from '../components/Pagination';

interface Props {
  selected: string;
  arrPerson: any;
}

function Home() {
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round((dimensions.height * 9) / 16);
  const imageWidth = Math.round((dimensions.width * 9) / 16);
  const [dataPerson, setDataPerson] = useState<DataProps[]>();
  const [page, setPage] = useState(1);
  const [len, setLen] = useState<number>();
  const [state, setState] = useState<String[]>();
  const [checkedState, SetCheckedState] = useState<Props[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function init() {
      const arrState = [
        'São paulo',
        'Rio de janeiro',
        'Minas gerais',
        'Espirito santo',
        'Bahia',
      ];

      const {data} = await api.get(`results?&_page=${page}&_limit=10`);

      console.log(data.length);
      setDataPerson(data);
      setState(arrState);
      setLoading(true);
    }
    init();
  }, []);

  async function handleCheckBox(text: string) {
    if (checkedState && checkedState?.length > 0) {
      let arr: Props[] = [];

      let verify = false;

      /*
      percorre o array adicionando os items ao novo array
      evitando algum estado que já exista
      */
      checkedState &&
        checkedState.forEach(element => {
          if (element.selected !== text) {
            arr.push({selected: element.selected});
          } else {
            verify = true;
          }
        });

      if (verify === false) {
        arr.push({selected: text});
      }

      SetCheckedState(arr);
    } else {
      SetCheckedState([{selected: text}]);
    }
  }
  return (
    <View
      style={{
        padding: 17,
        backgroundColor: 'whitesmoke',
        justifyContent: 'center',
      }}>
      {loading === true ? (
        <>
          <View
            style={{
              borderColor: 'rgba(211, 211, 211, 0.827)',
              borderWidth: 1,
              flexDirection: 'row',
              borderRadius: 25,
            }}>
            <TouchableOpacity
              style={{
                width: '10%',
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
              }}>
              <FontAwesomeIcon icon={faSearch} size={15} color="black" />
            </TouchableOpacity>

            <TextInput
              placeholder="Buscar..."
              style={{
                backgroundColor: 'white',
                width: '90%',
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
              }}
            />
          </View>
          <View
            style={{paddingVertical: 10, borderColor: 'red', borderWidth: 3}}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={state}
              renderItem={({item}) => (
                <View style={{paddingVertical: 5}}>
                  <BouncyCheckbox
                    size={25}
                    fillColor="gray"
                    unfillColor="#FFFFFF"
                    text={`${item}`}
                    iconStyle={{borderColor: '#d3d3d3'}}
                    textStyle={{
                      fontFamily: 'JosefinSans-Regular',
                      textDecorationLine: 'none',
                    }}
                    onPress={() => handleCheckBox(item.toString())}
                  />
                </View>
              )}
            />
          </View>
          {dataPerson && dataPerson?.length > 0 ? (
            <Pagination imageHeight={imageHeight} arrPerson={dataPerson} />
          ) : null}
        </>
      ) : (
        <View>
          <Text>Carregando...</Text>
        </View>
      )}
    </View>
  );
}

export default Home;
