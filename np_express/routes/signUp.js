import express from 'express'
import bcrypt from 'bcryptjs'
import bodyParser from 'body-parser'
import sequelize from '##/configs/db.js'
const router = express.Router()
const { Member } = sequelize.models

// 創建 Express 應用
const app = express()
app.use(bodyParser.json())

// 註冊 API 路由
router.post('/', async (req, res) => {
  const { user_name, account, email, phone, gender, date_of_birth, password } =
    req.body
  const defaultDOB = '1901-01-01'
  const dob = date_of_birth || defaultDOB
  const salt = bcrypt.genSaltSync(10)
  //   bcrypt加密
  const hashedPassword = bcrypt.hashSync(password, salt)

  try {
    const newMember = await Member.create({
      User_name: user_name,
      Account: account,
      Email: email,
      Phone: phone,
      Gender: gender,
      date_of_birth: dob,
      Password: hashedPassword,
      Create_date: new Date(), // 假設現在的時間為創建日期
      Last_login: new Date(), // 也可以設置為現在的時間或合理的默認值
      google_uid: 'not google',
      line_uid: 'not line',
      line_access_token: 'not line',
      valid: true,
    })
    res.status(201).send('會員註冊成功')
  } catch (error) {
    console.error('資料庫錯誤:', error)
    res.status(500).send('註冊新用戶時出錯')
  }
})

export default router
