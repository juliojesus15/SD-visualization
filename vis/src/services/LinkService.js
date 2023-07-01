import axios from 'axios';

export const getLinksWithinRange = (semesterFrom, semesterTo) => {
  return axios.get(`/api/link?semester_from=${semesterFrom}&semester_to=${semesterTo}`)
    .then( response => {               
      return response;
    })
    .catch(error => {     
     throw error;
    });
};