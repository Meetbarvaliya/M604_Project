const API_URL = '/api/patients';

// Load patients when the page starts
document.addEventListener('DOMContentLoaded', fetchPatients);

// Handle form submission (Create or Update)
document.getElementById('patientForm').addEventListener('submit', function(e) {
    e.preventDefault();
    savePatient();
});

// READ: Fetch all patients from the backend
async function fetchPatients() {
    try {
        const response = await fetch(API_URL);
        const patients = await response.json();
        const tbody = document.getElementById('patientTableBody');
        tbody.innerHTML = '';

        patients.forEach(patient => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${patient.id}</td>
                <td>${patient.firstName}</td>
                <td>${patient.lastName}</td>
                <td>${patient.age}</td>
                <td>${patient.diagnosis}</td>
                <td>${patient.admissionStatus}</td>
                <td>
                    <button class="action-btn" onclick="editPatient(${patient.id})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deletePatient(${patient.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching patients:', error);
    }
}

// CREATE / UPDATE: Send data to the backend
async function savePatient() {
    const id = document.getElementById('patientId').value;
    const patientData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value,
        diagnosis: document.getElementById('diagnosis').value,
        admissionStatus: document.getElementById('admissionStatus').value
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patientData)
        });

        if (response.ok) {
            clearForm();
            fetchPatients(); // Refresh the table
        } else {
            alert('Failed to save patient.');
        }
    } catch (error) {
        console.error('Error saving patient:', error);
    }
}

// DELETE: Remove a patient
async function deletePatient(id) {
    if (confirm('Are you sure you want to delete this patient?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchPatients(); // Refresh the table
            } else {
                alert('Failed to delete patient.');
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    }
}

// Prepare the form for updating an existing patient
async function editPatient(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const patient = await response.json();

        document.getElementById('patientId').value = patient.id;
        document.getElementById('firstName').value = patient.firstName;
        document.getElementById('lastName').value = patient.lastName;
        document.getElementById('age').value = patient.age;
        document.getElementById('diagnosis').value = patient.diagnosis;
        document.getElementById('admissionStatus').value = patient.admissionStatus;

        document.getElementById('formTitle').innerText = 'Edit Patient';
    } catch (error) {
        console.error('Error fetching patient details:', error);
    }
}

// Reset the form back to default
function clearForm() {
    document.getElementById('patientId').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('age').value = '';
    document.getElementById('diagnosis').value = '';
    document.getElementById('admissionStatus').value = 'Admitted';
    document.getElementById('formTitle').innerText = 'Add New Patient';
}