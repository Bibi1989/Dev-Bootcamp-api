const people = [
  {
    firstName: "Sam",
    lastName: "Hughes",
    DOB: "07/07/1978",
    department: "Development",
    salary: "45000",
  },
  {
    firstName: "Terri",
    lastName: "Bishop",
    DOB: "07/04/1989",
    department: "Development",
    salary: "35000",
  },
  {
    firstName: "Jar",
    lastName: "Burke",
    DOB: "11/01/1985",
    department: "Marketing",
    salary: "38000",
  },
  {
    firstName: "Julio",
    lastName: "Miller",
    DOB: "12/02/1991",
    department: "Sales",
    salary: "40000",
  },
  {
    firstName: "Chester",
    lastName: "Flores",
    DOB: "15/03/1988",
    department: "Development",
    salary: "41000",
  },
  {
    firstName: "Madison",
    lastName: "Marshall",
    DOB: "22/09/1980",
    department: "Sales",
    salary: "32000",
  },
  {
    firstName: "Gabriella",
    lastName: "Steward",
    DOB: "26/08/1994",
    department: "Marketing",
    salary: "46000",
  },
  {
    firstName: "Ava",
    lastName: "Pena",
    DOB: "02/11/1986",
    department: "Office Management",
    salary: "38000",
  },
];

const inOneFunction = (array) => {
  return {
    averageSalary: array.reduce(
      (acc, { salary }) => {
        acc.average += Number(salary);
        acc.answers = acc.average / array.length;
        return acc;
      },
      { average: 0, answers: 0 }
    ).answers,
    olderThan30: array.filter(
      ({ DOB }) => Number(new Date().getFullYear()) - Number(DOB.slice(-4)) > 30
    ),
    fullNames: array.map(
      ({ firstName, lastName }) => `${firstName} ${lastName}`
    ),
    orderFromYoungToOld: array.sort((a, b) => b.DOB.slice(7) - a.DOB.slice(7)),
    howManyPeople: array.reduce((acc, { department }) => {
      if (acc[department]) {
        acc[department] += 1;
      } else {
        acc[department] = 1;
      }
      return acc;
    }, {}),
  };
};

const averageSalary = (array) => {
  const result = array.reduce(
    (acc, { salary }) => {
      acc.average += Number(salary);
      acc.answers = acc.average / array.length;
      return acc;
    },
    { average: 0, answers: 0 }
  );
  return result.answers;
};

const olderThan30 = (array) => {
  return array.filter(
    ({ DOB }) => Number(new Date().getFullYear()) - Number(DOB.slice(-4)) > 30
  );
};

const fullNames = (array) => {
  return array.map(({ firstName, lastName }) => `${firstName} ${lastName}`);
};

const orderFromYoungToOld = (array) => {
  return array.sort((a, b) => b.DOB.slice(7) - a.DOB.slice(7));
};

const howManyPeople = (array) => {
  return array.reduce((acc, { department }) => {
    if (acc[department]) {
      acc[department] += 1;
    } else {
      acc[department] = 1;
    }
    return acc;
  }, {});
};

console.log(olderThan30(people));
console.log(people.length);
