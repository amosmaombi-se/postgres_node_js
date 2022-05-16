const express = require("express");
const router = express.Router();

const {
  getInvoices,
  getPaymentReports,
  viewReceipt,
} = require("../controllers/account");

router.post('/invoices',getInvoices);
router.post("/payments", getPaymentReports);
router.post('/receipts', viewReceipt);

module.exports = router;
