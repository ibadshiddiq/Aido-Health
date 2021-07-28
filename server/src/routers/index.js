const express = require("express");

const router = express.Router();

const {
  getInsurances,
  createInsurance,
  getInsuranceDetail,
  updateInsurance,
  deleteInsurance,
} = require("../controllers/insurance");
router.get("/insurance", getInsurances);
router.post("/insurance", createInsurance);
router.post("/insurance/:id", getInsuranceDetail);
router.put("/insurance/:id", updateInsurance);
router.delete("/insurance/:id", deleteInsurance);

module.exports = router;
