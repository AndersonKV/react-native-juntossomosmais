import React, {useState} from 'react';

import {Text, TouchableOpacity, FlatList} from 'react-native';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {styles} from '../pages/styles';

interface InterfaceInputCheckBox {
  name: string;
  checked: boolean;
  forEach: [{name: string; checked: boolean}];
}

interface Props {
  stateSelected: string;
  setStateSelected: (arg: string) => void;
  handleFetchMore: (arg: string, arg2: string) => void;
  page: number;
  resetInputs: () => void;
}

function SelectBox({
  stateSelected,
  setStateSelected,
  handleFetchMore,
  page,
  resetInputs,
}: Props) {
  const arr: String[] = ['por todos', 'por homens', 'por mulheres'];
  const [modal, setModal] = useState(false);

  function handleSelectOption(item: string) {
    if (modal === true) {
      setStateSelected(item);
      handleFetchMore(String(page), item);
      resetInputs();
    }
  }

  return (
    <TouchableOpacity
      onPress={() => setModal(!modal)}
      style={
        modal === true ? styles.screenCheckBoxOpen : styles.screenCheckBoxClose
      }>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={arr}
        style={styles.modalOpenText}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setModal(!modal);
              handleSelectOption(String(item));
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
}

export default SelectBox;
