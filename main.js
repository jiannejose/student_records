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

let sortType = 'ascending';

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

  allStudents.push(new Student(nextId, firstName, lastName, gender, new Date(dob), age, username));

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

/* format date */
function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
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
    <td>${formatDate(student.dob)}</td>
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
                <option value="male" ${ student.gender == 'male' ? 'selected="selected"' : '' }>Male</option>
                <option value="female" ${ student.gender == 'female' ? 'selected="selected"' : '' }>Female</option>
            </select>
        </form>
    </td>

    <td>
        <form>
            <input type="date" value="${student.dob.toISOString().substring(0, 10)}" class="edit_dob"/>
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
  allStudents[dataIndex].dob = new Date(newDob);
  allStudents[dataIndex].age = newAge;
  allStudents[dataIndex].username = newUsername;

  grandparentElement.innerHTML = studentDataFormat(allStudents[dataIndex]);

  rebindButtons(grandparentElement);
}
/* SAVING EDITED STUDENT DATA END */

/* SORTING STUDENTS RECORDS START*/
let sortButton = document.querySelector('.sortbtn');

sortButton.addEventListener('click', selectSortCategory);

function selectSortCategory() {
  let sortCategories = document.querySelector('.sort_categories');
  sortCategories.classList.toggle('sort_categories--show');

  if(sortCategories.classList.contains('sort_categories--show')) {
    sortByCategories();
  } 
}

function sortByCategories() {
  let sortByFirstNameBtn = document.getElementById('sortby_fname');
  let sortByLastNameBtn = document.getElementById('sortby_lname');
  let sortByDobBtn = document.getElementById('sortby_dob');
  let sortByAgeBtn = document.getElementById('sortby_age');
  let sortByUsernameBtn = document.getElementById('sortby_username');

  sortByFirstNameBtn.addEventListener('click', sortByFirstName);
  sortByLastNameBtn.addEventListener('click', sortByLastName);
  sortByDobBtn.addEventListener('click', sortByDob);
  sortByAgeBtn.addEventListener('click', sortByAge);
  sortByUsernameBtn.addEventListener('click', sortByUsername);
}

/* sorting by first name */
function sortByFirstName() {
  let studentsList = allStudents.slice(0);

  let sortedStudentsList;

  if(sortType == 'ascending') {
    sortedStudentsList = studentsList.sort((currentStudent, nextStudent) => {
      if(currentStudent.firstName > nextStudent.firstName) {
        return 1;
      } else if(currentStudent.firstName == nextStudent.firstName) {
        return currentStudent.lastName > nextStudent.lastName;
      }
      
      return -1;
    });

    sortType = 'descending';
  } else {
    sortedStudentsList = studentsList.sort((currentStudent, nextStudent) => {
      if(currentStudent.firstName < nextStudent.firstName) {
        return 1;
      } else if(currentStudent.firstName == nextStudent.firstName) {
        return currentStudent.lastName < nextStudent.lastName;
      }

      return -1;
    });

    sortType = 'ascending';
  }

  let sortedByFirstNames = [];

  sortedStudentsList.forEach((student) => {
    sortedByFirstNames.push(student);
  });

  studentsTable.innerHTML = '';

  sortedByFirstNames.forEach((student) => {
    renderStudentData(student);
  });
}

/* sorting by last name */
function sortByLastName() {
  let studentsList = allStudents.slice(0);

  let sortedStudentsList;

  if(sortType == 'ascending') {
    sortedStudentsList = studentsList.sort((currentStudent, nextStudent) => {
      if(currentStudent.lastName > nextStudent.lastName) {
        return 1;
      } else if(currentStudent.lastName == nextStudent.lastName) {
        return currentStudent.firstName > nextStudent.firstName;
      }

      return -1;
    });

    sortType = 'descensing';
  } else {
    sortedStudentsList = studentsList.sort((currentStudent, nextStudent) => {
      if(currentStudent.lastName < nextStudent.lastName) {
        return 1;
      } else if(currentStudent.lastName == nextStudent.lastName) {
        return currentStudent.firstName < nextStudent.firstName;
      }
  
      return -1;  
    });
    
    sortType = 'ascending';
  }

  let sortedByLastNames = [];

  sortedStudentsList.forEach((student) => {
    sortedByLastNames.push(student);
  });

  studentsTable.innerHTML = '';

  sortedByLastNames.forEach((student) => {
    renderStudentData(student)
  });
}

/* sorting by date of birth */
function sortByDob() {
  let studentsList = allStudents.slice(0);

  let sortedStudentsList;

  if(sortType == 'ascending') {
    sortedStudentsList = studentsList.sort((currentStudent, nextStudent) => {
      if(currentStudent.dob > nextStudent.dob) {
        return 1;
      } else if(currentStudent.dob == nextStudent.dob) {
        return currentStudent.lastName > nextStudent.lastName;
      }

      return -1;  
    });

    sortType = 'descending'
  } else {
    sortedStudentsList = studentsList.sort((currentStudent, nextStudent) => {
      if(currentStudent.dob < nextStudent.dob) {
        return 1;
      } else if(currentStudent.dob == nextStudent.dob) {
        return currentStudent.lastName < nextStudent.lastName;
      }

      return -1;
    });

    sortType = 'ascending';
  }
  
  let sortedByDob = [];

  sortedStudentsList.forEach((student) => {
    sortedByDob.push(student);
  });

  studentsTable.innerHTML = '';

  sortedByDob.forEach((student) => {
    renderStudentData(student);
  });
}

/* sorting by age */
function sortByAge() {
  let studentsList = allStudents.slice(0);

  let sortedStudentsList;
  
  if(sortType == 'ascending') {
    sortedStudentsList = studentsList.sort((currentStudent, nextStudent) => {
      if(currentStudent.age > nextStudent.age) {
        return 1;
      } else if(currentStudent.age == nextStudent.age) {
        return currentStudent.lastName > nextStudent.lastName;
      }

      return -1;
    });

    sortType = 'descending';
  } else {
    sortedStudentsList = studentsList.sort((currentStudent, nextStudent) => {
      if(currentStudent.age < nextStudent.age) {
        return 1;
      } else if(currentStudent.age == nextStudent.age) {
        return currentStudent.lastName < nextStudent.lastName;
      }

      return -1;
    });

    sortType = 'ascending';
  }

  let sortedByAge = [];

  sortedStudentsList.forEach((student) => {
    sortedByAge.push(student);
  });

  studentsTable.innerHTML = '';

  sortedByAge.forEach((student) => {
    renderStudentData(student);
  });
}

/* sorting by username */
function sortByUsername() {
  let studentsList = allStudents.slice(0);

  let sortedStudentsList;

  if(sortType == 'ascending') {
    sortedStudentsList = studentsList.sort((currentStudent, nextStudent) => {
      return currentStudent.username > nextStudent.username;
    });

    sortType = 'descending';
  } else {
    sortedStudentsList = studentsList.sort((currentStudent, nextStudent) => {
      return currentStudent.username < nextStudent.username;
    });

    sortType = 'ascending';
  }

  let sortedByUsername = [];

  sortedStudentsList.forEach((student) => {
    sortedByUsername.push(student);
  });

  studentsTable.innerHTML = '';

  sortedByUsername.forEach((student) => {
    renderStudentData(student);
  });
}





// function addTestData(firstName, lastName, gender, dob, age, username) {
//   allStudents.push({
//     id: nextId,
//     firstName: firstName,
//     lastName: lastName,
//     gender: gender,
//     dob: dob,
//     age: age,
//     username: username,
//   });

//   let dataIndex = allStudents.findIndex((student) => student.id ==  nextId);
//   renderTestData(allStudents[dataIndex]);
//   nextId++;
// }

// function renderTestData(student) {
//   let newTr = document.createElement('tr');
//   newTr.setAttribute('data-id', student.id);

//   newTr.innerHTML = studentDataFormat(student);
//   studentsTable.appendChild(newTr);

//   rebindButtons(newTr);
// }

// addTestData('Hermione', 'Granger', 'female', new Date('1991-03-28'), 27, 'wingardium' );
// addTestData('Harry', 'Potter', 'male', new Date('1989-01-28'), 29, 'avada' );
// addTestData('Ron', 'Weasley', 'male', new Date('1991-05-28'), 28, 'quiditch' );
// addTestData('Anne', 'Jose', 'female', new Date('1991-12-03'), 26, 'jianne' );
// addTestData('Ron', 'Cabal', 'male', new Date('1992-06-13'), 25, 'ronron' );