const API_URL = "https://vvri.pythonanywhere.com/api";

async function showCourses() {
    const response = await fetch(`${API_URL}/courses`);
    const courses = await response.json();
    document.getElementById('content').innerHTML = `
        <h2>Kurzusok</h2>
        <button onclick="createCourse()">Új kurzus</button>
        <ul>
            ${courses.map(course => `
                <li>
                    ${course.name} - ${course.description}
                    <button onclick="editCourse(${course.id})">Szerkesztés</button>
                    <button onclick="deleteCourse(${course.id})">Törlés</button>
                </li>
            `).join('')}
        </ul>
    `;
}

async function showStudents() {
    const response = await fetch(`${API_URL}/students`);
    const students = await response.json();
    document.getElementById('content').innerHTML = `
        <h2>Diákok</h2>
        <button onclick="createStudent()">Új diák</button>
        <ul>
            ${students.map(student => `
                <li>
                    ${student.name} - ${student.email}
                    <button onclick="editStudent(${student.id})">Szerkesztés</button>
                    <button onclick="deleteStudent(${student.id})">Törlés</button>
                </li>
            `).join('')}
        </ul>
    `;
}

function createCourse() {
    const name = prompt("Kurzus neve:");
    const description = prompt("Kurzus leírása:");
    fetch(`${API_URL}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
    }).then(showCourses);
}

function editCourse(id) {
    const name = prompt("Új kurzusnév:");
    const description = prompt("Új leírás:");
    fetch(`${API_URL}/courses/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
    }).then(showCourses);
}

function deleteCourse(id) {
    fetch(`${API_URL}/courses/${id}`, { method: 'DELETE' }).then(showCourses);
}

function createStudent() {
    const name = prompt("Diák neve:");
    const course_id = prompt("Diák kurzus azonosítója:");
    fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, course_id })
    }).then(showStudents);
}

function editStudent(id) {
    const name = prompt("Új név:");
    const course_id = prompt("Új kurzus ID:");
    fetch(`${API_URL}/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, course_id })
    }).then(showStudents);
}

function deleteStudent(id) {
    fetch(`${API_URL}/students/${id}`, { method: 'DELETE' }).then(showStudents);
}
