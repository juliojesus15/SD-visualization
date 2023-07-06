import axios from 'axios';

export const getPointCloudData = () => {
  return axios.get(`/api/pcloud`)
    .then( response => {   
      return response;
    })
    .catch(error => {      
      throw error;
    });
};