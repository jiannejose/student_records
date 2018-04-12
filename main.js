let allStudents = [];
let nextId = 1;

let studentForm = document.querySelector('.js-student_form');
let firstNameInput = document.getElementById('fNameInput');
let lastNameInput = document.getElementById('lNameInput');
let genderInput = document.getElementById('genderInput');
let dobInput = document.getElementById('dobInput');
let ageInput = document.getElementById('ageInput');
let usernameInput = document.getElementById('usernameInput');

let studentsTable = document.querySelector('.js-students_table');

firstNameInput.focus();

studentForm.addEventListener('submit', addStudent);

/* ADDING STUDENT DATA START */

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

  firstNameInput.focus();
}

/* reset select option to default */
function resetSelectOption() {
  document.getElementById('genderInput').selectedIndex = 0;
}

/* render student data on the table */
function renderStudentData(student) {
  let newTr = document.createElement('tr');
  newTr.setAttribute('data-id', student.id);

  newTr.innerHTML = studentDataFormat(student);
  studentsTable.appendChild(newTr);
}

/*capitalize names when rendered */
function capitalize(string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)} `;
}

/* student data format when rendered */
function studentDataFormat(student) {
  return `
    <td>${capitalize(student.firstName)}</td>

    <td>${capitalize(student.lastName)}</td>

    <td>${capitalize(student.gender)}</td>

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
/* ADDING STUDENT DATA END */


