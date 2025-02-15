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
                FOREIGN KEY (student_id) REFERENCES Student(id),
                FOREIGN KEY (compliance_id) REFERENCES CommonCompliancePdfForStudent(id)
            )
        `);
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

createTable();

// Student Compliance Status (Individual tracking)
module.exports = {
  // Initialize status for all students when a new compliance is added
  initializeStatusForAllStudents: async (complianceId, studentIds, urlOfCompliance, name) => {
    const values = studentIds.map((studentId) => [studentId, complianceId, urlOfCompliance, name]);
    await db.query(
      'INSERT INTO StudentComplianceStatus (student_id, compliance_id,urlOfCompliance,name) VALUES ?',
      [values]
    );
  },

  // Update a student's compliance status
  updateStatus: async (studentId, complianceId, status) => {
    const completedAt = status === 'Completed' ? new Date() : null;
    await db.execute(
      'UPDATE StudentComplianceStatus SET status = ?, completed_at = ? WHERE student_id = ? AND compliance_id = ?',
      [status, completedAt, studentId, complianceId]
    );
  },

  // Get compliance status for a student
  // Get compliance status for a student
  getStatusByStudent: async (studentId) => {
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


  getAllStudentCompliances: async () => {
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
        ON s.student_id = st.id`
    );
    return rows;
  },
  getStudentComplianceStatusID: async (studentId, complianceId) => {
    const [rows] = await db.execute(
      `SELECT * FROM StudentComplianceStatus WHERE student_id = ? AND compliance_id = ?`,
      [studentId, complianceId]
    );
    return rows;
  },

  updateStudentComplianceStatus: async (studentId, complianceId, status) => {
    try {
      const completedAt = status === 'Completed' ? new Date() : null;
      const [rows] = await db.execute(
        `UPDATE StudentComplianceStatus SET status = ?, completed_at = ? WHERE student_id = ? AND compliance_id = ?`,
        [status, completedAt, studentId, complianceId] // Correct order of parameters
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
};
