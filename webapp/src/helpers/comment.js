import axios from 'axios';
import { apis, server_url } from '../app/variables';

export const leaveComment = async (postUrl, message, token) => {
  return axios
    .put(
      server_url + apis.addComment,
      {
        postUrl, message, token
      }, {
        token
      }
    )
    .then(({ data, status}) => {
      if (status !== 200)
        throw new Error();

      return data.isSuccessful
    }).catch(err => {
      return false;
    })
}

export const getComments = async (postUrl) => {
    return axios
    .post(
      server_url + apis.fetchComments,
      { postUrl }
    ).then(({ data, status }) => {
      if (status === 200)
        return data.comments;

      throw new Error('Something went wrong');
    }).catch(err => {
      console.log(err);
      return [];
    });
}