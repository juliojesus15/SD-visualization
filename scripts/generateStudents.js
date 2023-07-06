import { faker } from '@faker-js/faker';
import { appendFileSync } from "fs";

const STUDENTS = []
const ROADMAP = []

const CAREER = [ 'Computer Science', 'Civil', 'Industrial' ]

const ENROLLMENT = [
  '2010-01', '2010-02', 
  '2011-01', '2011-02', 
  '2012-01', '2012-02',
]

const SUB_ENROLLMENT = {
  '2010-01': ['2010-01', '2010-02', '2011-01', '2011-02', '2012-01', '2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02', ], 
  '2010-02': ['2010-02', '2011-01', '2011-02', '2012-01', '2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02', '2016-01', ], 
  '2011-01': ['2011-01', '2011-02', '2012-01', '2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02', '2016-01', '2016-02', ], 
  '2011-02': ['2011-02', '2012-01', '2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02', '2016-01', '2016-02', '2017-01', ], 
  '2012-01': ['2012-01', '2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02', '2016-01', '2016-02', '2017-01', '2017-02', ], 
  '2012-02': ['2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02', '2016-01', '2016-02', '2017-01', '2017-02', '2018-01', ],  
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

const generateRandomGrades = (semester, dropoutStatus) => {
  const defaultRange = { min: 2, max: 12 };
  let gradeRange;

  if (semester >= 8) {
    gradeRange = dropoutStatus ? { min: 10, max: 13 } : { min: 12, max: 20 };
  } 
  else if (semester >= 6 && semester < 8) {
    gradeRange = dropoutStatus ? { min: 10, max: 12 } : { min: 11, max: 14 };
  } 
  else if (semester >= 3 && semester < 6) {
    gradeRange = dropoutStatus ? { min: 5, max: 12 } : { min: 10, max: 12 };
  } 
  else {
    gradeRange = defaultRange;
  }

  return faker.datatype.number(gradeRange);
};

const createRandomStudent = (enrollment) => {
  const maxSemester = faker.datatype.number({ min:1, max:10 });

  const dropout = faker.datatype.number({ min:0, max:1 }) === 1 ? true : false;

  let dropoutStatus = maxSemester < 3 ? true : dropout;
  if (maxSemester === 10) 
    dropoutStatus = false;

  return {
    student_id: faker.datatype.uuid(),
    enrollment: enrollment,
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    gender: faker.name.sex(),
    career: CAREER[ faker.datatype.number({ min:0, max: CAREER.length -1 }) ],
    current_semester: maxSemester,
    grade1:  generateRandomGrades(maxSemester, dropoutStatus),
    grade2:  generateRandomGrades(maxSemester, dropoutStatus),
    grade3:  generateRandomGrades(maxSemester, dropoutStatus),
    grade4:  generateRandomGrades(maxSemester, dropoutStatus),
    grade5:  generateRandomGrades(maxSemester, dropoutStatus),
    grade6:  generateRandomGrades(maxSemester, dropoutStatus),
    grade7:  generateRandomGrades(maxSemester, dropoutStatus),
    grade8:  generateRandomGrades(maxSemester, dropoutStatus),
    grade9:  generateRandomGrades(maxSemester, dropoutStatus),
    grade10: generateRandomGrades(maxSemester, dropoutStatus),
    dropout: dropoutStatus
  };
}

ENROLLMENT.forEach( element => {
  Array.from({ length: 500 }).forEach(() => {
    STUDENTS.push(createRandomStudent( element ));
  });
})

STUDENTS.forEach( ({student_id, current_semester, dropout, enrollment }) => {

  var numComplement = !dropout 
    ? 10 - current_semester
    : ( current_semester > 7 ) ? 0 : Math.floor(Math.random() * 2)  

  const base = Array.from({length: current_semester}, (_, i) => i + 1);
  
  const complement = Array.from({length: numComplement}, () => 1 + Math.floor(Math.random() * current_semester))

  const fullSemester = base.concat(complement);

  fullSemester.sort(function(a, b){return a-b})

  if( dropout ) fullSemester.push(0)
  if( !dropout && (current_semester == 10) ) fullSemester.push(11)
  
  const enrollments = SUB_ENROLLMENT[ enrollment ]
    
  fullSemester.forEach( (num, index) => {    
    ROADMAP.push({
      timelapse: enrollments[index],
      student_id: student_id,
      semester: num 
    })
  }) 
})

saveAsCSV(STUDENTS, "./students.csv")
saveAsCSV(ROADMAP, "./semesters.csv")