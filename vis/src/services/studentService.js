import axios from 'axios';

export const getRoadmapByStudentId = async ( studnetId, semesterFrom, semesterTo ) => {
  return axios.get(`/api/student/roadmap/${studnetId}?semester_from=${semesterFrom}&semester_to=${semesterTo}`)
    .then( response => {   
      return response;
    })
    .catch(error => {      
      throw error;
    });  
}


