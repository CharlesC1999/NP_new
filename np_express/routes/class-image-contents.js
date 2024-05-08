import express from 'express'
import sequelize from '#configs/db.js'

const router = express.Router()
const { Class_image } = sequelize.models

// GET - 根據 classId 獲得圖片資料
router.get('/full/:F_Class_ID', async (req, res) => {
  const classId = parseInt(req.params.F_Class_ID)
  console.log(req.params.F_Class_ID)

  if (isNaN(classId)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Invalid class ID provided.' })
  }

  try {
    const classData = await Class_image.findAll({
      where: { F_Class_ID: classId },
      raw: true,
    })
    // console.log(classData)

    if (!classData || classData.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Class images not found.' })
    }

    return res.json({ status: 'success', data: classData })
  } catch (error) {
    console.error('Error fetching class images:', error)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
      error: error.message,
    })
  }
})

export default router
