import fs from "node:fs/promises"
import path from "path"

const roadmapFilePath = path.join(__dirname, '../db/data/roadmap/')


export const getRoadmapByStudentId = async ( studentId, enrollment ) => {
  try {
    const filename = roadmapFilePath + enrollment + ".json"
    
    const content = await fs.readFile(filename, "utf-8");
      
    const contentToJSON = JSON.parse(content);

    return contentToJSON[ studentId ]

  } catch (error) {
    console.error(`Error al leer el archivo ${ enrollment }: ${error.message}`);    
  }
}
