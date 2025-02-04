//services/routes.js
const express = require("express");
const router = express.Router();
const connection = require("../db");

// GET 라우트
router.get("/api/pa", (req, res) => {
  console.log("API 요청 받음");
  connection.query("SELECT * FROM PA", (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
});

// POST 라우트
router.post("/api/post", (req, res) => {
  const userName = req.session.user.name;
  const formData = req.body;
  console.log("Received form data:", formData);
  const { subject, title, description, startDate, endDate, referenceLink } = formData;
  const query =
    "INSERT INTO PA (subject, title, description, start_date, end_date, reference_link, author, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, timezone('Asia/Seoul', now()))";
  const values = [subject, title, description, startDate, endDate, referenceLink, userName];

  connection.query(query, values, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("데이터 저장 성공:", result);
      res.status(200).json({ message: "Data saved successfully" });
    }
  });
});

module.exports = router;
