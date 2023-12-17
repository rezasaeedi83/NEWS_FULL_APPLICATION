import axios from 'axios';
import { apis, server_url } from '../../app/variables'

const doLogin = async (username, password) => {
  return axios
    .post(
      server_url + apis.login,
      { username, password }
    ).then(({data, status}) => {
      if (status === 200)
        return data;

      throw new Error('Something went wrong with server');
      }).catch(err => {
        console.log(err)
        return null;
    });

}

export default doLogin;
