***

# Project Setup and Execution Guide
**Hospital Management System**

This guide provides the necessary steps to configure, build, and execute the Hospital Management System application locally. The project utilizes a Java Spring Boot backend, a PostgreSQL database, and a vanilla web frontend.

### Prerequisites
Before running the application, please ensure the following software is installed on your local machine:
* **Java Development Kit (JDK):** Version 17 or 21 (LTS).
* **PostgreSQL:** Version 12 or higher.
* **Apache Maven:** (Optional if using an IDE with built-in Maven support, such as VS Code, IntelliJ, or Eclipse).

---

### Step 1: Database Initialization
The application requires a PostgreSQL database to store patient records. The database and the primary table must be created before launching the backend.

1. Open your PostgreSQL terminal (psql) or a GUI tool like pgAdmin.
2. Execute the following SQL commands to create the database and the `patients` table:

```sql
-- Create the database
CREATE DATABASE hospital_db;

-- Connect to the database (if using psql)
\c hospital_db;

-- Create the required table
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT,
    diagnosis VARCHAR(255),
    admission_status VARCHAR(20) DEFAULT 'Admitted'
);
```

### Step 2: Application Configuration
The Spring Boot application needs to connect to your local PostgreSQL instance. 

1. Navigate to the project directory and open the configuration file located at:
   `src/main/resources/application.properties`
2. Update the `spring.datasource.username` and `spring.datasource.password` fields to match your local PostgreSQL credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hospital_db
spring.datasource.username=YOUR_POSTGRES_USERNAME
spring.datasource.password=YOUR_POSTGRES_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Step 3: Running the Application
You can run the application either through an Integrated Development Environment (IDE) or via the command line.

**Option A: Using an IDE (Recommended)**
1. Import the project folder as a Maven Project into your IDE (VS Code, Eclipse, or IntelliJ).
2. Locate the main application file: `src/main/java/com/hospital/ManagementApplication.java`.
3. Run the `main` method.

**Option B: Using the Command Line**
1. Open a terminal and navigate to the root directory of the project (where the `pom.xml` file is located).
2. Execute the following Maven command:
   ```bash
   mvn spring-boot:run
   ```

You will know the server has started successfully when you see a console message similar to: `Started ManagementApplication in X seconds (process running for X)`.

### Step 4: Accessing the User Interface
The frontend is served directly by the Spring Boot application; no separate web server is required.

1. Open a modern web browser (Chrome, Firefox, Edge).
2. Navigate to the following address:
   **http://localhost:8080**
3. The Hospital Management System GUI will load, allowing you to interact with the API and database directly.

### Step 5: Testing Guide (CRUD Operations)
To verify the system's functionality, you can perform the following actions within the graphical interface:
* **Create:** Fill out the "Add New Patient" form and click "Save Patient." The new record will immediately appear in the table below.
* **Read:** Upon loading the page, the system automatically fetches and displays all existing records from the database.
* **Update:** Click the "Edit" button next to any patient record. The form will populate with their data. Change a value (e.g., update the status to "Discharged") and click "Save Patient."
* **Delete:** Click the red "Delete" button next to a record and confirm the prompt to permanently remove it from the database.

***
