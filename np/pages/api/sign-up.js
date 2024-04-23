import bcrypt from "bcryptjs";
import pool from "@/lib/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      user_name,
      account,
      email,
      phone,
      gender,
      date_of_birth,
      password,
    } = req.body;

    const defaultDOB = "1901-01-01";
    const dob = date_of_birth || defaultDOB;

    try {
      //   從前端收取資料
      const salt = bcrypt.genSaltSync(10);
      //   加密
      const hashedPassword = bcrypt.hashSync(password, salt);
      const sql =
        "INSERT INTO member (User_name, Account, Email, Phone, Gender, date_of_birth, Password, valid) VALUES (?, ?, ?, ?, ?, ?, ?, 1)";
      await pool.query(sql, [
        user_name,
        account,
        email,
        phone,
        gender,
        dob,
        hashedPassword,
      ]);
      res.status(201).send("會員註冊成功");
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).send("Error registering new user");
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
