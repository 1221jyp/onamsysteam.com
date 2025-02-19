//services/routes.js
const express = require("express");
const router = express.Router();
const connection = require("../db");

// POST 라우트
router.post("/api/enroll", (req, res) => {
  const formData = req.body;
  console.log("Received form data:", formData);

  // 세션에서 이메일을 가져옵니다
  const email = req.session.user.email; // session에서 email을 가져옴

  console.log(email);

  if (!email) {
    // 세션에 이메일이 없다면 로그인되지 않은 상태로 간주하고 처리
    return res.status(401).json({ error: "로그인 후 제출 가능합니다." });
  }

  const { number, name, phone, career, programmingExp, plan, additionalAnswer, bio, question } =
    formData;

  // 먼저 이메일이 존재하는지 확인
  const checkEmailQuery = "SELECT id FROM enrollments WHERE email = $1";
  const checkEmailValues = [email];

  connection.query(checkEmailQuery, checkEmailValues, (error, result) => {
    if (error) {
      console.error("Error checking email:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.rows.length > 0) {
        // 이메일이 이미 존재하면 기존 데이터를 업데이트
        const updateQuery =
          "UPDATE enrollments SET number = $1, name = $2, phone = $3, career = $4, programming_exp = $5, plan = $6, additional_answer = $7, bio = $8, question = $9, updated_at = timezone('Asia/Seoul', now()) WHERE email = $10";

        const updateValues = [
          number,
          name,
          phone,
          career,
          programmingExp,
          plan,
          additionalAnswer,
          bio,
          question,
          email,
        ];

        connection.query(updateQuery, updateValues, (updateError, updateResult) => {
          if (updateError) {
            console.error("Error updating data:", updateError);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            console.log("Data updated successfully:", updateResult);
            res.status(200).json({ message: "Data updated successfully" });
          }
        });
      } else {
        // 이메일이 존재하지 않으면 새로 데이터를 삽입
        const insertQuery =
          "INSERT INTO enrollments (number, name, phone, career, programming_exp, plan, additional_answer, bio, question, email, created_at, updated_at) " +
          "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, timezone('Asia/Seoul', now()) , timezone('Asia/Seoul', now()))";

        const insertValues = [
          number,
          name,
          phone,
          career,
          programmingExp,
          plan,
          additionalAnswer,
          bio,
          question,
          email,
        ];

        connection.query(insertQuery, insertValues, (insertError, insertResult) => {
          if (insertError) {
            console.error("Error inserting data:", insertError);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            console.log("Data inserted successfully:", insertResult);
            res.status(200).json({ message: "Data saved successfully" });
          }
        });
      }
    }
  });
});

module.exports = router;
