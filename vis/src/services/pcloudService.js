import axios from 'axios';

export const getPointCloudData = (period, semester, enrollment) => {     
  return axios.get(`/api/pcloud/${enrollment}?period=${period}&semester=${semester}`)
    .then( response => {   
      //console.log(response)
      return response;
    })
    .catch(error => {      
      throw error;
    });
};