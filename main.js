let allStudents = [];
let nextId = 1;

let studentForm = document.querySelector('.js-student_form');
let firstNameInput = document.getElementById('fNameInput');
let lastNameInput = document.getElementById('lNameInput');
let genderInput = document.getElementById('genderInput');
let dobInput = document.getElementById('dobInput');
let ageInput = document.getElementById('ageInput');
let usernameInput = document.getElementById('usernameInput');


firstNameInput.focus();

studentForm.addEventListener('submit', addStudent);

/* ADDING STUDENT DATA */

function addStudent(e) {
  e.preventDefault();

  let firstName = firstNameInput.value;
  let lastName = lastNameInput.value;
  let gender = genderInput.value;
  let dob = dobInput.value;
  let age = ageInput.value;
  let username = usernameInput.value;

  allStudents.push(new Student(nextId, firstName, lastName, gender, dob, age, username));

  let inputFields = Array.from(studentForm.getElementsByTagName('input'));
    inputFields.forEach((input) => {
      input.value = '';
    });

  resetSelectOption();
  
  let dataIndex = allStudents.findIndex((student) => student.id == nextId );
  renderStudentData(allStudents[dataIndex]);
  nextId++
}

/* resetting select option to default */
function resetSelectOption() {
  document.getElementById('genderInput').selectedIndex = 0;
}

let studentsTable = document.querySelector('.js-students_table');

function renderStudentData(student) {
  let newTr = document.createElement('tr');
  newTr.setAttribute('data-id', student.id);

  newTr.innerHTML = studentDataFormat(student);
  studentsTable.appendChild(newTr);
}

function studentDataFormat(student) {
  return `
    <td>${student.firstName}</td>

    <td>${student.lastName}</td>

    <td>${student.gender}</td>

    <td>${student.dob}</td>

    <td>${student.age}</td>

    <td>${student.username}</td>

    <td>
        <button>
            <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
        <button>
            <i class="fa fa-pencil" aria-hidden="true"></i>
        </button>
    </td>
  `;  
}