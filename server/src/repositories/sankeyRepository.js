import fs from "node:fs/promises";
import path from "path";

import { getTimelapses } from "../utils/utils";

const nodesFilePath = path.join(__dirname, "../db/data/nodes/");
const linksFilePath = path.join(__dirname, "../db/data/links/");
const containerFilePath = path.join(__dirname, "../db/data/container/");

export const getFreshmenByTime = async ( time ) => {
  try {
    const filename = containerFilePath + time + ".json"
    
    const content = await fs.readFile(filename, "utf-8");
      
    const contentToJSON = JSON.parse(content);

    return contentToJSON['1N']

  } catch (error) {
    console.error(`Error al leer el archivo ${ timelapses[i] + "_" + timelapses[i+1] }: ${error.message}`);
  }

}

const getNodes = async (timelapseBegin, timelapseEnd) => {
  const timelapses = getTimelapses(timelapseBegin, timelapseEnd);
  let containerNodes = []
  let depth = 0

  const keys = {
    '1er sem.': 1,
    '1 sem.': 2,
    '2 sem.': 3,
    '3 sem.': 4,
    '4 sem.': 5,
    '5 sem.': 6,
    '6 sem.': 7,
    '7 sem.': 8,
    '8 sem.': 9,
    '9 sem.': 10,
    '10 sem.': 11,
    'Grad.': 100,
    'Drop.': 200,
  }

  for (const timelapse of timelapses) {
    try {
      const filename = nodesFilePath + timelapse + ".json"

      const fileContent = await fs.readFile(filename, "utf-8");
      
      const nodes = JSON.parse(fileContent);

      const nodesWithDepth = nodes.map( node => {
        node.x = depth
        node.order = keys[node.name]
        return node
      })

      depth = depth + 1
      
      containerNodes.push(nodesWithDepth)

    } catch (error) {
      console.error(`Error al leer el archivo ${timelapse}: ${error.message}`);
    }
  }
  return containerNodes

}


const getLinks = async (timelapseBegin, timelapseEnd) => {
  const timelapses = getTimelapses(timelapseBegin, timelapseEnd)

  let links = [];

  for (let i = 0; i < timelapses.length-1; i++) {
    try {
      const filename = linksFilePath + timelapses[i] + "_" + timelapses[i+1] + ".json"

      const content = await fs.readFile(filename, "utf-8");
        
      const contentToJSON = JSON.parse(content);
      
      links.push(contentToJSON)

    } catch (error) {
      console.error(`Error al leer el archivo ${ timelapses[i] + "_" + timelapses[i+1] }: ${error.message}`);
    }
  }
  return links
};

const getNodesBetweenTimelapses = async (timelapseBegin, timelapseEnd) => {
  const timelapses = getTimelapses(timelapseBegin, timelapseEnd)

  let containerNodes = []
  let depth = 0

  const keys = {
    '1er sem.': 1,
    '1 sem.': 2,
    '2 sem.': 3,
    '3 sem.': 4,
    '4 sem.': 5,
    '5 sem.': 6,
    '6 sem.': 7,
    '7 sem.': 8,
    '8 sem.': 9,
    '9 sem.': 10,
    '10 sem.': 11,
    'Grad.': 100,
    'Drop.': 200,
  }

  for (const timelapse of timelapses) {
    try {
      const filename = nodesFilePath + timelapse + ".json"

      const fileContent = await fs.readFile(filename, "utf-8");
      
      const nodes = JSON.parse(fileContent);

      const nodesWithDepth = nodes.map( node => {
        node.x = depth
        node.order = keys[node.name]
        return node
      })

      depth = depth + 1
      
      containerNodes = [...containerNodes, ...nodesWithDepth]      

    } catch (error) {
      console.error(`Error al leer el archivo ${timelapse}: ${error.message}`);
    }
  }

  

  const value = '1N-' + timelapseEnd
  for (let i = containerNodes.length - 1; i >= 0; i--) {
    if (containerNodes[i]['nodeId'] === value) {
      containerNodes.splice(i, 1);
      break; 
    }
  }

  const valueDrop = '0-' + timelapseBegin
  for (let i = containerNodes.length - 1; i >= 0; i--) {
    if (containerNodes[i]['nodeId'] === valueDrop) {
      containerNodes.splice(i, 1);
      break; 
    }
  }
  
  return containerNodes
};

const getLinksBetweenTimelapses = async (timelapseBegin, timelapseEnd) => {
  const timelapses = getTimelapses(timelapseBegin, timelapseEnd)

  let links = [];

  for (let i = 0; i < timelapses.length-1; i++) {
    try {
      const filename = linksFilePath + timelapses[i] + "_" + timelapses[i+1] + ".json"

      const content = await fs.readFile(filename, "utf-8");
        
      const contentToJSON = JSON.parse(content);
      
      links = [...links, ...contentToJSON]      

    } catch (error) {
      console.error(`Error al leer el archivo ${ timelapses[i] + "_" + timelapses[i+1] }: ${error.message}`);
    }
  }
  return links
};


export { getNodesBetweenTimelapses, getLinksBetweenTimelapses, getNodes, getLinks  };