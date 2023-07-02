import axios from 'axios';

export const getData = (semesterFrom, semesterTo) => {
  return axios.get(`/api/sankey?semester_from=${semesterFrom}&semester_to=${semesterTo}`)
    .then( response => {   
      return response;
    })
    .catch(error => {      
      throw error;
    });
};