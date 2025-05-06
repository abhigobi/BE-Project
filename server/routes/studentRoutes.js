const express = require("express");
const {
  getAllFiles,
  toggleFileStatus,
  getStudent,
  getStudentComplianceByStudentId,
} = require("../controllers/studentController");
const upload = require("../middleware/upload");
const {
  uploadFile,
  deleteFile,
  updateFileStatus,
  getAllSubmissionsWithStudentAndWardenName,
} = require("../controllers/StudentSubmittedComplianceControllers");
const router = express.Router();

router.get("/getAllFiles", getAllFiles);
router.post("/toggleFileStatus", toggleFileStatus);
router.get("/getStudent", getStudent);
router.get(
  "/getStudentComplianceByStudentId/:studentId",
  getStudentComplianceByStudentId
);

router.post("/uploadFile", upload.single("file"), uploadFile);
router.delete("/deleteFile/:id", deleteFile);
router.put("/updateFileStatus", updateFileStatus);
router.get("/getAllSubmissions", getAllSubmissionsWithStudentAndWardenName);

module.exports = router;
