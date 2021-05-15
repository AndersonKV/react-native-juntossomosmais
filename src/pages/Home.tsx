import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
  Animated,
} from 'react-native';

import {DataProps} from '../types/types';
import {faSearch, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import api from '../services/index';
import {styles} from './styles';

//COMPONENTS
import Pagination from '../components/Pagination';

interface Props {
  selected: string;
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
  const [stateSelected, setStateSelected] = useState<string>();
  const [modal, setModal] = useState(false);
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

      try {
        const {data} = await api.get(`results?&_page=${page}&_limit=10`);

        console.log(data.length);
        setStateSelected('por todos');
        setLen(data.length);
        setDataPerson(data);
      } catch (err) {
        console.log(err);
      }

      setState(arrState);

      setLoading(true);
    }
    init();
  }, []);

  async function fetchData(settingPage: string) {
    const {data} = await api.get(`results?&_page=${settingPage}&_limit=10`);
    setDataPerson(data);
    setPage(Number(settingPage));
  }
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

  async function handleFetchMore(index: number) {
    fetchData(index.toString());
  }

  const SelectedBox = () => {
    const arr: String[] = ['por todos', 'por homens', 'por mulheres'];

    return (
      <TouchableOpacity
        onPress={() => setModal(!modal)}
        style={
          modal === true
            ? styles.screenCheckBoxOpen
            : styles.screenCheckBoxClose
        }>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={arr}
          style={styles.modalOpenText}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setModal(!modal);
                modal === true ? setStateSelected(String(item)) : null;
              }}
              style={
                modal === false
                  ? item === stateSelected
                    ? styles.checkBoxSelected
                    : styles.checkBox
                  : styles.modalOpenCheckBoxSelected
              }>
              <Text
                style={
                  modal === true ? styles.modalOpenText : styles.modalCloseText
                }>
                {item}
              </Text>
              <Text>
                {modal === false ? (
                  <FontAwesomeIcon icon={faArrowDown} size={14} color="black" />
                ) : null}
              </Text>
            </TouchableOpacity>
          )}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        padding: 17,
        backgroundColor: 'whitesmoke',
        borderWidth: 3,
        flex: 1,
      }}>
      {loading === true ? (
        <>
          <View style={styles.mainGrid}>
            <TouchableOpacity style={styles.inputIcon}>
              <FontAwesomeIcon icon={faSearch} size={15} color="black" />
            </TouchableOpacity>
            <TextInput placeholder="Buscar..." style={styles.input} />
          </View>

          <SelectedBox />

          <View
            style={{
              marginVertical: 10,
              padding: 5,
              borderColor: '#d3d3d3',
              borderBottomWidth: 2,
              backgroundColor: '#fff',
            }}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={state}
              numColumns={2}
              renderItem={({item}) => (
                <View
                  style={{
                    paddingVertical: 5,
                    flex: 1,
                  }}>
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
          {dataPerson && dataPerson?.length > 0 && len !== undefined ? (
            <Pagination
              imageHeight={imageHeight}
              arrPerson={dataPerson}
              len={len}
              page={page}
              handleFetchMore={handleFetchMore}
            />
          ) : (
            <View style={styles.listNotShow}>
              <Text>Nenhuma lista a ser exibida</Text>
            </View>
          )}
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
