import { faker } from '@faker-js/faker';

const createRandomStudent = () => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    genre: faker.name.sex(),
    semester: faker.datatype.number({ min:1, max:10 }),
    dropout: faker.datatype.number({ min:0, max:1 }) === 1 ? true : false,
  };
}

const STUDENTS = [];

Array.from({ length: 31 }).forEach(() => {
  STUDENTS.push(createRandomStudent());
});

const randomArr = Array.from({length: 10}, () => 1 + Math.floor(Math.random() * 2))
randomArr.sort(function(a, b){return a-b});

console.log(randomArr)
//console.log(STUDENTS)