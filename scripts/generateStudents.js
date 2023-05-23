import { faker } from '@faker-js/faker';
import { appendFileSync } from "fs";

const STUDENTS = []
const HISTORY = []

const CAREER = [ 'Computer Science', 'Civil', 'Industrial' ]

const ENROLLMENT = [
  '2010-01', '2010-02', 
  '2011-01', '2011-02', 
  '2012-01', '2012-02', 
  '2013-01', '2013-02',
  '2014-01', '2014-02',
  '2015-01', '2015-02',
]

const SUB_ENROLLMENT = {
  '2010-01': ['2010-01', '2010-02', '2011-01', '2011-02', '2012-01', '2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02',], 
  '2010-02': ['2010-02', '2011-01', '2011-02', '2012-01', '2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02', '2016-01', ], 
  '2011-01': ['2011-01', '2011-02', '2012-01', '2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02', '2016-01', '2016-02', ], 
  '2011-02': ['2011-02', '2012-01', '2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02', '2016-01', '2016-02', '2017-01', ], 
  '2012-01': ['2012-01', '2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02', '2016-01', '2016-02', '2017-01', '2017-02', ], 
  '2012-02': ['2012-02', '2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02', '2016-01', '2016-02', '2017-01', '2017-02', '2018-01', ],
  '2013-01': ['2013-01', '2013-02', '2014-01', '2014-02', '2015-01', '2015-02', '2016-01', '2016-02', '2017-01', '2017-02', '2018-01', '2018-02', ], 
  '2013-02': ['2013-02', '2014-01', '2014-02', '2015-01', '2015-02', '2016-01', '2016-02', '2017-01', '2017-02', '2018-01', '2018-02', '2019-01', ],
  '2014-01': ['2014-01', '2014-02', '2015-01', '2015-02', '2016-01', '2016-02', '2017-01', '2017-02', '2018-01', '2018-02', '2019-01', '2019-02', ], 
  '2014-02': ['2014-02', '2015-01', '2015-02', '2016-01', '2016-02', '2017-01', '2017-02', '2018-01', '2018-02', '2019-01', '2019-02', '2020-01', ],
  '2015-01': ['2015-01', '2015-02', '2016-01', '2016-02', '2017-01', '2017-02', '2018-01', '2018-02', '2019-01', '2019-02', '2020-01', '2020-02', ], 
  '2015-02': ['2015-02', '2016-01', '2016-02', '2017-01', '2017-02', '2018-01', '2018-02', '2019-01', '2019-02', '2020-01', '2020-02', '2021-01', ],
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
    student_id: faker.datatype.uuid(),
    enrollment: ENROLLMENT[ faker.datatype.number({ min:0, max: ENROLLMENT.length - 1})  ],
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    gender: faker.name.sex(),
    career: CAREER[ faker.datatype.number({ min:0, max: CAREER.length -1 }) ],
    current_semester: semester,
    dropout: dropoutStatus
  };
}

Array.from({ length: 100 }).forEach(() => {
  STUDENTS.push(createRandomStudent());
});


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
    HISTORY.push({
      timelapse: enrollments[index],
      student_id: student_id,
      semester: num 
    })
  }) 
})


saveAsCSV(STUDENTS, "./students.csv")
saveAsCSV(HISTORY, "./semesters.csv")