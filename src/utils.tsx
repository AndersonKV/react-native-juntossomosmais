export const STORAGE_KEY = '@ItemCart';

export const backGroundColor = (param: any) => {
  const type = param.types.map((typeInfo: any) => typeInfo.type.name);

  switch (type[0]) {
    case 'steel':
      return '#f4f4f4';
    case 'fire':
      return '#fddfdf';
    case 'grass':
      return '#defde0';
    case 'electric':
      return '#fcf7de';
    case 'water':
      return '#def3fd';
    case 'ice':
      return '#def3fd';
    case 'ground':
      return '#f4e7da';
    case 'rock':
      return '#d5d5d4';
    case 'fairy':
      return '#fceaff';
    case 'poison':
      return '#98d7a5';
    case 'bug':
      return '#f8d5a3';
    case 'poison':
      return '#98d7a5';
    case 'dragon':
      return '#97b3e6';
    case 'psychic':
      return '#eaeda1';
    case 'flying':
      return '#f5f5f5';
    case 'fighting':
      return '#e6e0d4';
    case 'normal':
      return '#f5f5f5';
    default:
      return '#f5f5f5';
  }
};
