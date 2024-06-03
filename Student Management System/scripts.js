class Student {
  constructor(name, age, grade) {
    this.name = name;
    this.age = age;
    this.grade = grade;
  }

  updateDetails(newName, newAge, newGrade) {
    if (newName) this.name = newName;
    if (newAge) this.age = newAge;
    if (newGrade) this.grade = newGrade;
  }
}

class StudentManager {
  constructor() {
    this.students = [];
  }

  addsStudent(student) {
    this.students.push(student);
    this.displayStudents();
  }

  // Method to update the details of an existing student
  updateStudent(name, newDetails) {
    const student = this.findStudentByName(name);
    console.log(student);
    if (student) {
      student.updateDetails(
        newDetails.newName,
        newDetails.newAge,
        newDetails.newGrade
      );
      this.displayStudents();
    } else {
      alert("Student not found");
    }
  }

  // Method to find a student by name
  findStudentByName(name) {
    return this.students.find((student) => student.name === name);
  }

  displayStudents() {
    console.log(this.students);
    return this.students.forEach((student) => {
      const addForm = document.querySelector("#add-form");
      const displayContainer = document.querySelector(".display-container");
      const listDisplay = document.createElement("li");
      listDisplay.setAttribute("cls", "value");
      listDisplay.innerHTML = `${student.name} is ${student.age} years old, with a grade ${student.grade}`;
      displayContainer.append(listDisplay);

      console.log(displayContainer);
      console.log(addForm);
    });
  }
}

const damianManager = new StudentManager();
damianManager.addsStudent({ name: "damian", age: 30, grade: 3 });
const find = damianManager.findStudentByName("age");
damianManager.updateStudent("damian", { name: "Damian" });
console.log(find, update);

document.querySelector("#add-form").addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(" ai fjfnn ubidn");

  const parent = document.querySelector("#add-form").children;
  const nameValue = parent[1].value;
  const ageValue = parent[3].value;
  const gradeValue = parent[5].value;

  console.log(parent);
  console.log(nameValue, ageValue, gradeValue);

  const newStudent = new Student(nameValue, ageValue, gradeValue);
  console.log(newStudent);
  damianManager.addsStudent(newStudent);
});
