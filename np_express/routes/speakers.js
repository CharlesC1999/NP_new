import express from 'express'
const router = express.Router()

import { getIdParam } from '##/db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '##/configs/db.js'
const { Speaker, Class } = sequelize.models

// 一般sql
import db from '#configs/mysql.js'

// GET - 取得所有資料
router.get('/', async function (req, res) {
  // 在此定義 speakers 是 speakers.json 中的所有資料
  // const speakers = await Speaker.findAll({ logging: console.log })

  // 從網址查詢字串中解構出當前頁數及每頁筆數
  const { page = 1, perpage = 12 } = req.query

  // 分頁用
  // 如果查詢字串中的 page 和 perpage 是 undefined 或是無法轉換為數字，page預設為1，perpage預設為 12
  const perpageNow = Number(perpage) || 12
  const pageNow = Number(page) || 1
  const limit = perpageNow
  // offset 是 SQL 查詢中的偏移量，用來跳過開頭的 offset 數量的記錄
  // 例如：pageNow = 2，perpageNow = 12，(2-1)*12 = 12，表示會跳過前 12 筆資料，從第 13 筆開始
  const offset = (pageNow - 1) * perpageNow

  // 返回該分頁所需要的資料範圍，例如第三頁，會得到第 25~36 筆資料
  const sqlSpeakers = `SELECT speaker.*,speaker_categories.speaker_cate_name
  FROM speaker
  JOIN speaker_categories ON speaker.f_speaker_cate_id = speaker_categories.speaker_cate_id LIMIT ${limit} OFFSET ${offset}`
  // 從 sqlSpeakers 中取得分頁資料內容，放在 speakersPage
  const [speakersPage] = await db.query(sqlSpeakers)

  // 用來計算值 -> 返回一個有一列及一行的結果集，其中列名為 count，值則是資料表總筆數
  const sqlCount = `SELECT COUNT(*) AS count FROM speaker`
  // 從 sqlCount 中取得資料總筆數，放在 total
  const [rows2] = await db.query(sqlCount)
  const total = rows2[0].count

  // 計算頁數
  // Math.ceil() 函數用於將其參數向上取整到最接近的整數
  // 例如 Math.ceil(2.1) = 3，計算至少需要多少頁才能顯示所有資料
  const pageCount = Math.ceil(total / Number(perpage)) || 0

  // 回傳所有講師資料
  const speakers = await Speaker.findAll({
    logging: console.log,
  })

  // 回傳 JSON，讓前端可以使用
  return res.json({
    status: 'success',
    data: {
      total,
      pageCount,
      speakersPage,
      speakers,
    },
  })
})

// GET - 取得單筆資料
router.get('/:id', async function (req, res) {
  // 使用 getIdParam() 將查詢參數（原本是 string）轉為數字
  const id = getIdParam(req)
  const speakers = await Speaker.findAll({
    logging: console.log,
  })

  // 取得該名講師課程資訊（將 class 與 class_image 資料表關聯，圖片有多張時取第一張）
  const ClassDataSql = `SELECT class.class__i_d,class.class_name,class.class_description,class_image.image__u_r_l
  FROM class_image
  JOIN class ON class.class__i_d= class_image.f__class__i_d
  WHERE f__speaker__i_d =${id} GROUP BY 
  class.class__i_d`
  const [ClassData] = await db.query(ClassDataSql)
  const speaker = await Speaker.findByPk(id, {
    raw: true, //只需要資料表中資料
  })
  return res.json({ status: 'success', data: { speaker, speakers, ClassData } })
})

export default router
