import axios from 'axios';

export const getRoadmapByStudentId = async ( studnetId, semesterFrom, semesterTo, color ) => {  
  return axios.get(`/api/student/${studnetId}/roadmap?semester_from=${semesterFrom}&semester_to=${semesterTo}&color=${color}`)
    .then( response => {   
      return response;
    })
    .catch(error => {      
      throw error;
    });  
}


