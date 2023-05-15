import { faker } from '@faker-js/faker';
import { appendFileSync } from "fs";

const STUDENTS = [];
const HISTORY = [];
const PROGRAMS = [ 'Computer Science', 'Civil', 'Industrial' ];''
const ENROLLMENT = ['2010-01', '2010-02', '2011-01', '2011-02', '2012-01', '2012-02']

const SUB_ENROLLMENT = {
  '2010-01': ['2010-01', '2010-02', '2011-01', '2011-02', '2012-01', '2012-02', '2013-01', '2013-02', '2014-01', '2014-02' ], 
  '2010-02': ['2010-02', '2011-01', '2011-02', '2012-01', '2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01' ], 
  '2011-01': ['2011-01', '2011-02', '2012-01', '2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02' ], 
  '2011-02': ['2011-02', '2012-01', '2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02', '2016-01' ], 
  '2012-01': ['2012-01', '2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02', '2016-01', '2016-02' ], 
  '2012-02': ['2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02', '2016-01', '2016-02', '2017-01' ]
}

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
    enrollmentYear: ENROLLMENT[ faker.datatype.number({ min:0, max:5 }) ],
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    gender: faker.name.sex(),
    program: PROGRAMS[ faker.datatype.number({ min:0, max:2 }) ],
    semester,
    dropoutStatus
  };
}

Array.from({ length: 100 }).forEach(() => {
  STUDENTS.push(createRandomStudent());
});

STUDENTS.forEach( ({id, semester, dropoutStatus, enrollmentYear }) => {

  var numComplement = !dropoutStatus 
    ? 10 - semester
    : ( semester > 7 ) ? 0 : Math.floor(Math.random() * 2)  

  const base = Array.from({length: semester}, (_, i) => i + 1);
  
  const complement = Array.from({length: numComplement}, () => 1 + Math.floor(Math.random() * semester))

  const fullSemester = base.concat(complement);

  fullSemester.sort(function(a, b){return a-b})

  if( dropoutStatus ) fullSemester.push(0)
  
  fullSemester.forEach( (num, index) => {
    const enrollmentArray = SUB_ENROLLMENT[enrollmentYear]
    HISTORY.push({
      id: enrollmentArray[index],
      studentId: id,
      semester: num 
    })
  }) 
})

console.log(STUDENTS)
//saveAsCSV(STUDENTS, "./students.csv")
//saveAsCSV(HISTORY, "./semesters.csv")