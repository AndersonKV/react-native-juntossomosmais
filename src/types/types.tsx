export interface DataProps {
  cell: string;
  dob: {date: string; age: number};
  email: string;
  gender: string;
  location: {
    city: string;
    coordinates: {latitude: string; longitude: string};
    postcode: number;
    state: string;
    street: string;
    timezone: {
      description: string;
      offset: string;
    };
  };
  name: {
    first: string;
    last: string;
    title: string;
  };
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  registered: {date: string; age: number};
}
