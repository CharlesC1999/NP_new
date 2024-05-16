import express from 'express'
import { getIdParam } from '#db-helpers/db-tool.js'
import db from '#configs/mysql.js'
const router = express.Router()
router.get('/', async function (req, res) {
  const hotProductSql = `SELECT product.id,product.product_name,product.product_price,product.discount_price,product.category_id,product_image.image_url as image_urls
  FROM product_image
  JOIN  product ON product.id = product_image.product_id
WHERE product.category_id BETWEEN 15 AND 20
GROUP BY product.product_name LIMIT 12`
  const [hotProduct] = await db.query(hotProductSql)
  const hotClassSql = `SELECT class.*,class_image.image__u_r_l,speaker.speaker_name,speaker.speaker_title
  FROM class
  JOIN class_image ON  class.class__i_d = class_image.f__class__i_d
  JOIN favor_class ON  class.class__i_d = favor_class.cid
  JOIN speaker ON class.f__speaker__i_d = speaker_id
  WHERE class_image.sort_order = 0 AND class.class__i_d BETWEEN 20 AND 23 LIMIT 2`
  const [hotClass] = await db.query(hotClassSql)
  const recipeSql = `SELECT * FROM recipe WHERE recipe__i_d BETWEEN 19 AND 22`
  const [recommendedRecipe] = await db.query(recipeSql)
  const productCateSql = `SELECT * FROM product_categories WHERE id BETWEEN 1 AND 7`
  const [productCate] = await db.query(productCateSql)
  return res.json({
    status: 'success',
    data: {
      hotProduct,
      hotClass,
      recommendedRecipe,
      productCate
    },
  })
})

export default router