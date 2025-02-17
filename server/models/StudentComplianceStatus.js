const db = require('../config/db');

// Function to create the table if it does not exist
const createTable = async () => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS StudentComplianceStatus (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        compliance_id INT NOT NULL,
        urlOfCompliance VARCHAR(2083) NOT NULL,
        name VARCHAR(255) NOT NULL,
        status ENUM('Pending', 'Completed', 'Waiting For Approve', 'Rejected') DEFAULT 'Pending',
        completed_at TIMESTAMP NULL,
        due_date TIMESTAMP NULL,
        FOREIGN KEY (student_id) REFERENCES Student(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (compliance_id) REFERENCES CommonCompliancePdfForStudent(id) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);
  } catch (error) {
    console.error("❌ Error creating table:", error);
  }
};

createTable();

// Student Compliance Status (Individual tracking)
module.exports = {
  // Initialize status for all students when a new compliance is added
  initializeStatusForAllStudents: async (complianceId, studentIds, urlOfCompliance, name, due_date) => {
    if (!complianceId || !studentIds || !urlOfCompliance || !name || !due_date) {
      throw new Error("All parameters are required.");
    }
    if (studentIds.length === 0) {
      console.log("No students to initialize.");
      return;
    }
    const values = studentIds.map((studentId) => [studentId, complianceId, urlOfCompliance, name, due_date]);
    await db.query(
      'INSERT INTO StudentComplianceStatus (student_id, compliance_id, urlOfCompliance, name, due_date) VALUES ?',
      [values]
    );
  },

  // Update a student's compliance status
  updateStatus: async (studentId, complianceId, status) => {
    const allowedStatuses = ['Pending', 'Completed', 'Waiting For Approve', 'Rejected'];
    if (!allowedStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}. Allowed values are ${allowedStatuses.join(', ')}.`);
    }
    const completedAt = status === 'Completed' ? new Date() : null;
    await db.execute(
      'UPDATE StudentComplianceStatus SET status = ?, completed_at = ? WHERE student_id = ? AND compliance_id = ?',
      [status, completedAt, studentId, complianceId]
    );
  },

  // Get compliance status for a student
  getStatusByStudent: async (studentId) => {
    if (!studentId) {
      throw new Error("Student ID is required.");
    }
    const [rows] = await db.execute(
      `SELECT 
        c.id AS compliance_id,
        c.name,
        c.url,
        s.status,
        s.completed_at
      FROM StudentComplianceStatus s
      INNER JOIN CommonCompliancePdfForStudent c 
        ON c.id = s.compliance_id
      WHERE s.student_id = ?`,
      [studentId]
    );
    return rows;
  },
  getAllStudentCompliances: async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const [rows] = await db.execute(
      `SELECT 
        s.id AS StudentComplianceStatus_ID,
        s.student_id,
        s.compliance_id,
        s.urlOfCompliance,
        s.name AS compliance_name,
        s.status,
        s.completed_at,
        st.name AS student_name,
        st.email AS student_email
      FROM StudentComplianceStatus s
      LEFT JOIN Student st 
        ON s.student_id = st.id
      LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    return rows;
  },
  getStudentComplianceStatusID: async (studentId, complianceId) => {
    if (!studentId || !complianceId) {
      throw new Error("Student ID and Compliance ID are required.");
    }
    const [rows] = await db.execute(
      `SELECT * FROM StudentComplianceStatus WHERE student_id = ? AND compliance_id = ?`,
      [studentId, complianceId]
    );
    return rows;
  },

  updateStudentComplianceStatus: async (studentId, complianceId, status) => {
    const allowedStatuses = ['Pending', 'Completed', 'Waiting For Approve', 'Rejected'];
    if (!allowedStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}. Allowed values are ${allowedStatuses.join(', ')}.`);
    }
    const completedAt = status === 'Completed' ? new Date() : null;
    await db.execute(
      'UPDATE StudentComplianceStatus SET status = ?, completed_at = ? WHERE student_id = ? AND compliance_id = ?',
      [status, completedAt, studentId, complianceId]
    );
  },
};
