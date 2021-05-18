import {StyleSheet, Dimensions} from 'react-native';

const windowHeigth = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    padding: 17,
    backgroundColor: 'whitesmoke',
    borderWidth: 3,
    flex: 1,
  },
  inputGroup: {
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
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
    width: windowWidth,
    height: windowHeigth,
    zIndex: 5,
    position: 'absolute',
  },
  screenCheckBoxClose: {
    marginVertical: -5,
  },
  modalOpenText: {
    top: '30%',
    textTransform: 'uppercase',
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
    textTransform: 'uppercase',
  },
  listNotShow: {
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  containerInputBox: {
    marginVertical: '7%',
    padding: 5,
    borderColor: '#d3d3d3',
    borderBottomWidth: 2,
    backgroundColor: '#fff',
  },
  containerInputChecked: {
    paddingVertical: 5,
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  inputChecked: {
    backgroundColor: 'white',
    width: 15,
    height: 15,
    borderRadius: 50,
    borderWidth: 1,
    marginRight: 10,
  },
  inputCheckedActive: {
    backgroundColor: '#00FFFF',
    borderColor: 'green',
    width: 15,
    height: 15,
    borderRadius: 50,
    borderWidth: 1,
    marginRight: 10,
  },
});

// <View style={{...styles.gridView}}>
