class Student {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.course = [];
  }
}
class Course {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }
}

class StudentManager {
  constructor() {
    this.students = [];
    this.courses = [];
  }

  addStudent(student) {
    this.students.push(student);
  }

  addCourses(course) {
    this.courses.push(course);
  }

  enrollCourse(id, code) {
    const courseData = this.checkCourse(code);
    const studentData = this.checkStudent(id);

    studentData.course.push(courseData);
  }

  checkStudent(id) {
    return this.students.find((student) => student.id === id);
  }

  checkCourse(code) {
    return this.courses.find((course) => course.code === code);
  }

  displayStudents() {
    this.students.forEach((student) => {
      // student.courses.map((course) => console.log(course));
      console.log(
        9`Student: name - ${student.name}, id - ${student.id}, courses enrolled - ${student.length}`
      );

      // console.log(enrollCourses);
    });
  }
}

const student1 = new Student(234, "Okpala");
const student2 = new Student(651, "Chibuike");
const studentManager = new StudentManager();

studentManager.addStudent(student1);
studentManager.addStudent(student2);

console.log(studentManager);

const course1 = new Course("Chemistry", "CHM101");
const course2 = new Course("Biology", "BIO101");

studentManager.addCourses(course1);
studentManager.addCourses(course2);

studentManager.enrollCourse(234, "CHM101");
studentManager.enrollCourse(234, "BIO101");
studentManager.enrollCourse(651, "BIO101");

studentManager.displayStudents();

console.log(JSON.stringify(studentManager));
