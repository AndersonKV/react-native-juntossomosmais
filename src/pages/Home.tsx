import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
} from 'react-native';

import {DataProps} from '../types/types';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import api from '../services/index';
import {styles} from './styles';

//COMPONENTS
import Pagination from '../components/Pagination';
import SelectBox from '../components/SelectBox';
import Users from '../components/Users';

interface Props {
  selected: string;
}

interface InterfaceInputCheckBox {
  name: string;
  checked: boolean;
}

function Home() {
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round((dimensions.height * 9) / 16);
  const imageWidth = Math.round((dimensions.width * 9) / 16);
  const [dataPerson, setDataPerson] = useState<DataProps[]>();
  const [inputState, setInputState] = useState<string>('');
  const [page, setPage] = useState(1);
  const [len, setLen] = useState<number>();
  const [state, setState] = useState<InterfaceInputCheckBox[]>();
  const [inputChecked, setInputCheked] = useState<Props[]>();
  const [falseCheckeds, setFalseChekeds] = useState(false);
  const [stateSelected, setStateSelected] = useState<string>('por todos');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function init() {
      const arr = [
        {name: 'São paulo', checked: false},
        {name: 'Rio de janeiro', checked: false},
        {name: 'Minas gerais', checked: false},
        {name: 'Espirito santo', checked: false},
        {name: 'Bahia', checked: false},
      ];

      console.log(arr);
      setState(arr);
      // setState(
      //   [name: 'São paulo', checked: false],

      // );

      console.log('iniciou');
      try {
        const response = await api.get('results');
        const {data} = await api.get(`results?&_page=${page}&_limit=20`);

        const result = response.data.length / 20;

        setLen(result);
        setDataPerson(data);
      } catch (err) {
        console.log(err);
      }

      setLoading(true);
    }
    init();
  }, []);

  async function handleSubmit() {
    if (inputState.length > 3) {
      const {data} = await api.get(`results?name.first_like=${inputState}`);

      if (data.length > 0) {
        console.log(data, len, stateSelected);

        setDataPerson(data);
        setLen(0);
        setPage(1);
      } else {
        setDataPerson([]);
        setLen(0);
      }
    }
  }

  async function fetchData(settingPage: string, stateCurrent: string) {
    if (stateCurrent === 'por todos') {
      const response = await api.get('results');

      const {data} = await api.get(`results?&_page=${settingPage}&_limit=20`);
      const result = Math.round(response.data.length / 20);

      setLen(result);
      setDataPerson(data);
      setPage(Number(settingPage));
      return;
    }

    if (stateCurrent === 'por homens') {
      const response = await api.get('results?gender=male');

      const {data} = await api.get(
        `results?gender=male&_page=${settingPage}&_limit=20`,
      );

      const result = Math.round(response.data.length / 20);

      setLen(result);
      setDataPerson(data);
      setPage(Number(settingPage));
      return;
    }

    if (stateCurrent === 'por mulheres') {
      const response = await api.get('results?gender=female');

      const {data} = await api.get(
        `results?gender=female&_page=${settingPage}&_limit=20`,
      );

      const result = Math.round(response.data.length / 20);

      console.log(settingPage);
      setLen(result);
      setDataPerson(data);
      setPage(Number(settingPage));
      return;
    }
  }

  async function handleCheckBox(text: string, index: number) {
    if (inputChecked && inputChecked?.length > 0) {
      let arr: Props[] = [];

      let verify = false;

      /*
      percorre o array adicionando os items ao novo array
      evitando algum estado que já exista
      */
      inputChecked &&
        inputChecked.forEach(element => {
          if (element.selected !== text) {
            arr.push({selected: element.selected});
          } else {
            verify = true;
          }
        });

      if (verify === false) {
        arr.push({selected: text});
      }
      const preUpdate: any = state && state[index];
      preUpdate.checked = !preUpdate.checked;

      setInputCheked(arr);
      handleFetchState(arr);
    } else {
      const preUpdate: any = state && state[index];
      preUpdate.checked = !preUpdate.checked;

      setInputCheked([{selected: text}]);
      handleFetchState([{selected: text}]);
    }
  }

  async function handleFetchMore(index: any, stateCurrent: string) {
    fetchData(String(index), stateCurrent);
  }

  async function handleFetchState(value: Props[]) {
    if (value.length === 0) {
      setLen(0);
      setDataPerson([]);
      return;
    }

    if (value.length > 0) {
      const arrString: Array<String> = [];

      value.forEach((element, index) => {
        index === 0
          ? arrString.push(`location.state=${element.selected}`)
          : arrString.push(`&location.state=${element.selected}`);
      });

      const stringParam = String(arrString)
        .replaceAll(',', '')
        .toLocaleLowerCase();
      const {data} = await api.get(`results?${stringParam}`);

      setLen(0);
      setDataPerson(data);
      return;
    }
  }

  async function resetInputs() {
    state &&
      state.forEach(element => {
        element.checked = false;
      });
  }
  return (
    <View style={styles.container}>
      {loading === true ? (
        <>
          {/*INPUT*/}
          <View style={styles.inputGroup}>
            <TouchableOpacity style={styles.inputIcon} onPress={handleSubmit}>
              <FontAwesomeIcon icon={faSearch} size={15} color="black" />
            </TouchableOpacity>
            <TextInput
              placeholder="Buscar..."
              style={styles.input}
              onChangeText={text => setInputState(text)}
            />
          </View>

          {/*SELECT OPTION*/}
          {stateSelected ? (
            <SelectBox
              stateSelected={stateSelected}
              setStateSelected={setStateSelected}
              handleFetchMore={handleFetchMore}
              page={page}
              resetInputs={resetInputs}
              setInputCheked={setInputCheked}
              falseCheckeds={falseCheckeds}
              setFalseChekeds={setFalseChekeds}
            />
          ) : null}

          {/*INPUTION CHECKBOX*/}

          <View style={styles.containerInputBox}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={state}
              numColumns={2}
              extraData={state}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    handleCheckBox(item.name, index);
                  }}
                  style={styles.containerInputChecked}>
                  {item.checked === true ? (
                    <View style={styles.inputCheckedActive} />
                  ) : (
                    <View style={styles.inputChecked} />
                  )}

                  <Text>
                    {item.name} - {index}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/*LIST USERS*/}

          {dataPerson && dataPerson?.length > 0 && len !== undefined ? (
            <Users
              imageHeight={imageHeight}
              arrPerson={dataPerson}
              len={len}
              page={page}
              handleFetchMore={handleFetchMore}
            />
          ) : null}

          {/*PAGINATION*/}

          {dataPerson && dataPerson?.length > 0 ? (
            <Pagination
              imageHeight={imageHeight}
              len={len || 0}
              page={page}
              handleFetchMore={handleFetchMore}
              stateSelected={stateSelected || ''}
            />
          ) : (
            <View style={styles.listNotShow}>
              <Text>Infelizmente nada foi encontrado</Text>
            </View>
          )}
        </>
      ) : (
        <View>
          <Text>Carregando.3..</Text>
        </View>
      )}
    </View>
  );
}

export default Home;
