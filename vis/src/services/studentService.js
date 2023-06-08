import axios from 'axios';

export const getRoadmapByStudentId = async ( studentId, name, lastname, timeBegin, timeEnd, color ) => {
  const URL = `/api/student/sankey/data`;

  try {
    const response = await axios.get(
      URL, 
      { 
        params: { studentId, name, lastname, timeBegin, timeEnd, color }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener el diagrama de Sankey:', error);
    throw error; 
  }
}


