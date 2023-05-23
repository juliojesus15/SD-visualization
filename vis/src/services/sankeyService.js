import axios from 'axios';

export const getSankeyDiagram = async (timelapseBegin, timelapseEnd) => {
  const URL = `/api/sankey/data`;

  try {
    const response = await axios.get(
      URL, 
      { 
        params: { timelapseBegin, timelapseEnd }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener el diagrama de Sankey:', error);
    throw error; 
  }
}


export const getSankeyDiagramOnlyFreshmen = async (timelapseBegin, timelapseEnd) => {
  const URL = `/api/sankey/freshmen/data`;

  try {
    const response = await axios.get(
      URL, 
      { 
        params: { timelapseBegin, timelapseEnd }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener el diagrama de Sankey:', error);
    throw error; 
  }
}
