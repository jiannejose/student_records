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

  rebindButtons(newTr);
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
        <button class="delete-btn">
            <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
        <button class="edit-btn">
            <i class="fa fa-pencil" aria-hidden="true"></i>
        </button>
    </td>
  `;  
}
/* ADDING STUDENT DATA END */

/* rebinding buttons */
function rebindButtons(element) {
  let deleteButton = element.querySelector('.delete-btn');
  let editButton = element.querySelector('.edit-btn');

  deleteButton.addEventListener('click', deleteStudent);

  if(editButton) {
    editButton.addEventListener('click', editStudentData);
  }

}

/* DELETING STUDENT START*/
function deleteStudent() {
  let grandparentElement = this.parentElement.parentElement;
  let studentId = grandparentElement.getAttribute('data-id');
  let dataIndex = allStudents.findIndex((student) => student.id == studentId);

  allStudents.splice(dataIndex, 1);
  grandparentElement.remove();
}
/* DELETING STUDENT END */

/* EDITING STUDENT DATA START */
function editDataFormat(student) {
  return `
    <td>
        <form>
            <input type="text" value="${capitalize(student.firstName)}" class="edit_fname"/>
        </form>
    </td>

    <td>
        <form>
            <input type="text" value="${capitalize(student.lastName)}" class="edit_lname"/>
        </form>
    </td>

    <td>
        <form>
            <select type="text" name="gender" class="edit_gender"/>
                <option value="default">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </form>
    </td>

    <td>
        <form>
            <input type="date" value="${student.dob}" class="edit_dob"/>
        </form>
    </td>

    <td>
        <form>
            <input type="text" value="${student.age}" class="edit_age"/>
        </form>
    </td>

    <td>
        <form>
            <input type="text" value="${student.username}" class="edit_username"/>
        </form>
    </td>

    <td>
        <button class="delete-btn">
            <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
        <button class="update-btn">
            <i class="fa fa-check" aria-hidden="true"></i>
        </button>
    </td>
  `;
}

function editStudentData() {
  let grandparentElement = this.parentElement.parentElement;
  let studentId = grandparentElement.getAttribute('data-id');
  let dataIndex = allStudents.findIndex((student) => student.id == studentId);

  grandparentElement.innerHTML = editDataFormat(allStudents[dataIndex]);

  let editFirstNameInput = grandparentElement.querySelector('.edit_fname');
  
  editFirstNameInput.focus();
  
  let updateButton = grandparentElement.querySelector('.update-btn');
  updateButton.addEventListener('click', updateStudentData);
}
/* EDITING STUDENT DATA END */


/* SAVING EDITED STUDENT DATA START */
function updateStudentData() {
  let grandparentElement = this.parentElement.parentElement;
  let studentId = grandparentElement.getAttribute('data-id');
  let dataIndex = allStudents.findIndex((student) => student.id == studentId );

  let newFirstName = grandparentElement.querySelector('.edit_fname').value;
  let newLastName = grandparentElement.querySelector('.edit_lname').value;
  let newGender = grandparentElement.querySelector('.edit_gender').value;
  let newDob = grandparentElement.querySelector('.edit_dob').value;
  let newAge = grandparentElement.querySelector('.edit_age').value;
  let newUsername = grandparentElement.querySelector('.edit_username').value;

  allStudents[dataIndex].firstName = newFirstName;
  allStudents[dataIndex].lastName = newLastName;
  allStudents[dataIndex].gender = newGender;
  allStudents[dataIndex].dob = newDob;
  allStudents[dataIndex].age = newAge;
  allStudents[dataIndex].username = newUsername;

  grandparentElement.innerHTML = studentDataFormat(allStudents[dataIndex]);

  rebindButtons(grandparentElement);
}
