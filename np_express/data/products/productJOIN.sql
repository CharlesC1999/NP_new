--  選取該product_id ＝＄${id}
SELECT  * FROM `product_image` WHERE product_id = 202 



SELECT 
  p.id,p.product_name, p.category_id,p.product_price,p.product_stock,p.valid,p.upload_date,
  pReview.comment, pReview.rating,
  pImg.image_url,pImg.sort_order
FROM 
  product AS p
  INNER JOIN product_review AS pReview ON p.id = pReview.product_id
  INNER JOIN product_image AS pImg ON p.id = pImg.product_id

SELECT 
  p.id, p.product_name, p.category_id, p.product_price, p.product_stock, p.valid, p.upload_date,
  pReview.comment, pReview.rating,
  pImg.image_url, pImg.sort_order
FROM 
  product AS p
  LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
  LEFT JOIN product_image AS pImg ON p.id = pImg.product_id;


SELECT VERSION();

SELECT 
      p.id, 
      p.product_name, 
      p.category_id, 
      p.product_price, 
      p.product_stock, 
      p.valid, 
      p.upload_date,
      ROUND(AVG(pReview.rating), 1) AS average_rating,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'comment', pReview.comment, 
          'rating', pReview.rating,
          'reviewer_id', pReview.user_id,
          'created_at', pReview.created_at
        )
      ) AS review_details,
      GROUP_CONCAT(pImg.image_url ORDER BY pImg.sort_order) AS image_urls,
      GROUP_CONCAT(pImg.sort_order ORDER BY pImg.sort_order) AS sort_orders
    FROM 
      product AS p
      LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
      LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
    WHERE 
      p.id = :productId
    GROUP BY 
      p.id;

      SELECT 
      p.id, 
      p.product_name, 
      p.category_id, 
      p.product_price, 
      p.product_stock, 
      p.valid, 
      p.upload_date,
      ROUND(AVG(pReview.rating), 1) AS average_rating,
      GROUP_CONCAT(CONCAT(pReview.comment, ' - ', pReview.rating, ' - ', pReview.user_id, ' - ', pReview.created_at)) AS review_details,
      GROUP_CONCAT(pImg.image_url ORDER BY pImg.sort_order) AS image_urls,
      GROUP_CONCAT(pImg.sort_order ORDER BY pImg.sort_order) AS sort_orders
    FROM 
      product AS p
      LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
      LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
    WHERE 
      p.id = :productId
    GROUP BY 
      p.id;


 -- 假设产品ID为100
SELECT 
  JSON_ARRAYAGG(
    JSON_OBJECT(
      'comment', REPLACE(pReview.comment, '"', '\\"'), 
      'rating', pReview.rating,
      'reviewer_id', pReview.user_id,
      'created_at', DATE_FORMAT(pReview.created_at, '%Y-%m-%d %T')
    )
  ) AS review_details
FROM 
  product_review AS pReview
WHERE
  pReview.product_id = 100
LIMIT 100;


SELECT 
    p.product_name, 
    p.product_price, 
    p.category_id,
    pImage.image_url
FROM 
    product AS p
JOIN 
    product_image AS pImage 
ON 
    p.id = pImage.product_id;


SELECT * FROM `recipe`
WHERE recipe__i_d IN (4,49,48,50)
;

SELECT p.product_name, p.product_price, p.id , pImage.image_url
       FROM product AS p
       JOIN product_image AS pImage ON p.id = pImage.product_id
       ORDER BY RAND()
       LIMIT 5;
