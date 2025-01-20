const API_URL = "https://vvri.pythonanywhere.com/api";
async function showCourses() {
    const response = await fetch(`${API_URL}/courses`);
    const courses = await response.json();
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Courses</h2>
        <button onclick="createCourse()">Add Course</button>
        <ul>
            ${courses.map(course => `
                <li>
                    ${course.name} - ${course.description}
                    <button onclick="editCourse(${course.id})">Edit</button>
                    <button onclick="deleteCourse(${course.id})">Delete</button>
                </li>
            `).join('')}
        </ul>
    `;
}

async function showStudents() {
    const response = await fetch(`${API_URL}/students`);
    const students = await response.json();
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Students</h2>
        <button onclick="createStudent()">Add Student</button>
        <ul>
            ${students.map(student => `
                <li>
                    ${student.name} - ${student.email}
                    <button onclick="editStudent(${student.id})">Edit</button>
                    <button onclick="deleteStudent(${student.id})">Delete</button>
                </li>
            `).join('')}
        </ul>
    `;
}

function createCourse() {
    const name = prompt("Enter course name:");
    const description = prompt("Enter course description:");
    fetch(`${API_URL}/courses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
    }).then(showCourses);
}

function editCourse(id) {
    const name = prompt("Enter new course name:");
    const description = prompt("Enter new course description:");
    fetch(`${API_URL}/courses/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
    }).then(showCourses);
}

function deleteCourse(id) {
    fetch(`${API_URL}/courses/${id}`, {
        method: 'DELETE'
    }).then(showCourses);
}

function createStudent() {
    const name = prompt("Enter student name:");
    const email = prompt("Enter student email:");
    fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    }).then(showStudents);
}

function editStudent(id) {
    const name = prompt("Enter new student name:");
    const email = prompt("Enter new student email:");
    fetch(`${API_URL}/students/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    }).then(showStudents);
}

function deleteStudent(id) {
    fetch(`${API_URL}/students/${id}`, {
        method: 'DELETE'
    }).then(showStudents);
}