import { faker } from '@faker-js/faker';
import { appendFileSync } from "fs";

const STUDENTS = [];
const HISTORY = [];
const PROGRAMS = [ 'Computer Science', 'Civil', 'Industrial' ];

const saveAsCSV = (data, filename) => {
  // Header
  const header = Object.keys(data[0]).map( (k) => k ).join(",") + `\n`;    
  appendFileSync(filename, header); 

  // Body
  data.forEach( register => {
    const csv = Object.keys(register).map( (k) => register[k] ).join(",") + `\n`;    
    appendFileSync(filename, csv); 
  })  
}

const createRandomStudent = () => {
  const semester = faker.datatype.number({ min:1, max:10 });

  const dropout = faker.datatype.number({ min:0, max:1 }) === 1 ? true : false;

  let dropoutStatus = semester < 3 ? true : dropout;
  if (semester === 10) dropoutStatus = false;

  return {
    id: faker.datatype.uuid(),
    year: faker.datatype.number({ min:1, max:3 }),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    gender: faker.name.sex(),
    program: PROGRAMS[ faker.datatype.number({ min:0, max:2 }) ],
    semester,
    dropoutStatus
  };
}

Array.from({ length: 2 }).forEach(() => {
  STUDENTS.push(createRandomStudent());
});

STUDENTS.forEach( ({id, semester, dropoutStatus}) => {

  var numComplement = !dropoutStatus 
    ? 10 - semester
    : ( semester > 7 ) ? 0 : Math.floor(Math.random() * 2)  

  const base = Array.from({length: semester}, (_, i) => i + 1);
  
  const complement = Array.from({length: numComplement}, () => 1 + Math.floor(Math.random() * semester))

  const fullSemester = base.concat(complement);

  fullSemester.sort(function(a, b){return a-b})

  if( dropoutStatus ) fullSemester.push(0)
  
  fullSemester.forEach( (num, index) => {
    HISTORY.push({
      id: index + 1,
      studentId: id,
      semester: num
    })
  }) 
})

saveAsCSV(STUDENTS, "./students.csv")
saveAsCSV(HISTORY, "./semesters.csv")