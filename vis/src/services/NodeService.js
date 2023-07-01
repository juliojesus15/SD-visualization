import axios from 'axios';

export const getNodesWithinRange = (semesterFrom, semesterTo) => {
  return axios.get(`/api/node?semester_from=${semesterFrom}&semester_to=${semesterTo}`)
    .then( response => {   
      return response;
    })
    .catch(error => {      
      throw error;
    });
};