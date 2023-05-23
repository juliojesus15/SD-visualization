import { timelapses } from "../constants/timelapses"

export const getTimelapses = (begin, end) => {  
  const indexA = timelapses.indexOf(begin);  
  const indexB = timelapses.indexOf(end);
  
  if (indexA === -1 || indexB === -1) return [];

  const listOfTimelapses = timelapses.slice(indexA, indexB+1);
  
  return listOfTimelapses;
}