import {StyleSheet, Dimensions} from 'react-native';

const windowHeigth = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  mainGrid: {
    borderColor: 'rgba(211, 211, 211, 0.827)',
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 25,
  },
  inputIcon: {
    width: '10%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  input: {
    backgroundColor: 'white',
    width: '90%',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  screenCheckBoxOpen: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: windowWidth,
    height: windowHeigth,
    zIndex: 5,
    position: 'absolute',
  },
  screenCheckBoxClose: {
    marginVertical: 10,
  },
  modalOpenText: {
    top: '30%',
  },
  checkBoxSelected: {
    borderWidth: 1,
    borderColor: '#d3d3d3d3',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  modalCloseText: {
    justifyContent: 'space-evenly',
  },
  modalOpenCheckBoxSelected: {
    borderWidth: 1,
    borderColor: '#d3d3d3d3',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    padding: 10,
    width: '70%',
  },
  checkBox: {
    borderWidth: 1,
    display: 'none',
  },
  listNotShow: {
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
