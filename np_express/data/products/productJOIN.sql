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


SELECT product_id, user_id FROM product_review WHERE product_id =303 AND user_id = 1

SELECT orders.*,
       orders_detail.*,
       product.*,
       product_image.*,
       class.*,
       product_review.comment AS review_comment,
       product_review.rating AS review_rating
FROM orders
JOIN orders_detail ON orders.Order_ID = orders_detail.order_detail_id
LEFT JOIN product ON orders_detail.commodity_id = product.id AND orders_detail.product_type = 'product'
LEFT JOIN product_image ON orders_detail.commodity_id = product_image.product_id AND orders_detail.product_type = 'product'
LEFT JOIN class ON orders_detail.class_id = class.class__i_d AND orders_detail.product_type = 'class'
LEFT JOIN product_review ON orders_detail.order_detail_id = product_review.order_detail_id  
GROUP BY orders.order_Id
ORDER BY orders.Order_date DESC;

SELECT
  orders.*,
  orders_detail.*,
  IF(product_review.id IS NULL, 0, 1) AS has_reviewed
FROM
  orders
JOIN orders_detail ON orders.Order_ID = orders_detail.order_detail_id
LEFT JOIN product_review ON orders_detail.commodity_id = product_review.product_id
                        AND orders.user_id = product_review.user_id
LEFT JOIN product ON orders_detail.commodity_id = product.id 
LEFT JOIN product_image ON orders_detail.commodity_id = product_image.product_id
LEFT JOIN class ON orders_detail.class_id = class.class__i_d
GROUP BY orders.order_Id, orders_detail.order_detail_id
ORDER BY orders.Order_date DESC;


SELECT * FROM product_review WHERE product_id = 303 AND user_id = 1


SELECT * FROM product WHERE category_id = 22