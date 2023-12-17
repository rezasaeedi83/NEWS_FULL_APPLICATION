import axios from 'axios';
import { apis, server_url } from '../../app/variables';

const doRegister = async (username, password, fullname) => {
  return axios
    .post(
      server_url + apis.register,
      {
        username, password, fullname
      }
    ).then(({ data, status }) => {
      if (status === 200)
        return data;
      
      throw new Error('Something went wrong with server');
    }).catch(err => {
      console.log(err);
      return null;
    });
}

export default doRegister;
