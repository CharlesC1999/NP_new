SELECT p.*,
    GROUP_CONCAT(DISTINCT c.name SEPARATOR ',') AS color_name,
    GROUP_CONCAT(DISTINCT t.name SEPARATOR ',') AS tag_name,
    GROUP_CONCAT(DISTINCT s.name SEPARATOR ',') AS size_name
FROM product AS p
    INNER JOIN product_color AS pc ON pc.pid = p.id
    INNER JOIN color AS c ON c.id = pc.cid
    INNER JOIN product_tag AS pt ON pt.pid = p.id
    INNER JOIN tag AS t ON t.id = pt.tid
    INNER JOIN product_size AS ps ON ps.pid = p.id
    INNER JOIN size AS s ON s.id = ps.sid
WHERE p.name LIKE '%e%'
    AND p.brand_id IN (1, 2, 4)
    AND p.cat_id IN (4, 5, 6, 10, 11, 12)
    AND c.id IN (1, 2)
    AND s.id IN (2, 3)
    AND t.id IN (1, 2, 4)
    AND p.price >= 1500
    AND p.price <= 10000
GROUP BY p.id
ORDER BY p.price ASC;
-- LIMIT 10 OFFSET 0;
-- 
-- 
-- 
SELECT *
FROM product
WHERE (name LIKE '%e%')
    AND (brand_id IN (1, 2, 4))
    AND (cat_id IN (4, 5, 6, 10, 11, 12))
    AND CONCAT(",", color, ",") REGEXP ",(1|2),"
    AND CONCAT(",", size, ",") REGEXP ",(2|3),"
    AND CONCAT(",", tag, ",") REGEXP ",(1|2|4),"
    AND price >= 1500
    AND price <= 10000
ORDER BY price ASC;
-- LIMIT 10 OFFSET 0;
-- find_in_set
SELECT *
FROM product
WHERE (name LIKE '%e%')
    AND (brand_id IN (1, 2, 4))
    AND (cat_id IN (4, 5, 6, 10, 11, 12))
    AND (
        FIND_IN_SET(1, color)
        OR FIND_IN_SET(2, color)
    )
    AND (
        FIND_IN_SET(2, size)
        OR FIND_IN_SET(3, size)
    )
    AND (
        FIND_IN_SET(1, tag)
        OR FIND_IN_SET(2, tag)
        OR FIND_IN_SET(4, tag)
    )
    AND price >= 1500
    AND price <= 10000
ORDER BY price ASC;
-- LIMIT 10 OFFSET 0;
SELECT 
    p.id, 
    p.product_name, 
    p.product_price, 
    p.product_stock, 
    p.product_description,
    p.valid, 
    p.upload_date,
    p.category_id, 
    pCate.name AS cate_name,
    pCate.parent_id,
    pCate.id AS CateID,
    pImg.image_url AS image_urls,
    ROUND(AVG(pReview.rating), 1) AS average_rating,
    GROUP_CONCAT(CONCAT_WS('|', pReview.comment, pReview.rating, pReview.user_id, DATE_FORMAT(pReview.created_at, '%Y-%m-%d %T'))) AS review_details,
    GROUP_CONCAT(pImg.sort_order ORDER BY pImg.sort_order) AS sort_orders
FROM 
    product AS p
    LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
    LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
    LEFT JOIN product_categories AS pCate ON p.category_id = pCate.id
GROUP BY 
    p.id
ORDER BY 
    p.id
LIMIT 10 OFFSET 0;


SELECT 
    p.id, 
    p.product_name, 
    p.product_price, 
    p.product_stock, 
    p.product_description,
    p.valid, 
    p.upload_date,
    p.category_id, 
    pCate.name AS cate_name,
    pCate.parent_id,
    pCate.id AS CateID,
    pImg.image_url AS image_urls,
    ROUND(AVG(pReview.rating), 1) AS average_rating,
    GROUP_CONCAT(CONCAT_WS('|', pReview.comment, pReview.rating, pReview.user_id, DATE_FORMAT(pReview.created_at, '%Y-%m-%d %T'))) AS review_details,
    GROUP_CONCAT(pImg.sort_order ORDER BY pImg.sort_order) AS sort_orders
FROM 
    product AS p
    LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
    LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
    LEFT JOIN product_categories AS pCate ON p.category_id = pCate.id
WHERE 
    pCate.id IN (SELECT id FROM product_categories WHERE parent_id = 1 OR id = 1)
GROUP BY 
    p.id
ORDER BY 
    p.id
LIMIT 10 OFFSET 0;

SELECT 
  p.id, 
  p.product_name, 
  p.product_price, 
  p.product_stock, 
  p.product_description,
  p.valid, 
  p.upload_date,
  p.category_id, 
  pCate.name AS cate_name,
  pCate.parent_id,
  pCate.id AS CateID,
  pImg.image_url AS image_urls,
  ROUND(AVG(pReview.rating), 1) AS average_rating,
  GROUP_CONCAT(CONCAT_WS('|', pReview.comment, pReview.rating, pReview.user_id, DATE_FORMAT(pReview.created_at, '%Y-%m-%d %T'))) AS review_details,
  GROUP_CONCAT(pImg.sort_order ORDER BY pImg.sort_order) AS sort_orders
FROM 
  product AS p
  LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
  LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
  LEFT JOIN product_categories AS pCate ON p.category_id = pCate.id
WHERE
  p.category_id IN (
    SELECT id FROM product_categories
    WHERE id IN (3,4) OR parent_id IN (3,4)
  )
GROUP BY 
  p.id
ORDER BY 
  p.id
LIMIT 10 OFFSET 0;

DESCRIBE product;

SELECT 
  p.id, 
  p.product_name, 
  p.product_price, 
  p.product_stock, 
  p.product_description,
  p.valid, 
  p.upload_date,
  p.category_id, 
  pCate.name AS cate_name,
  pCate.parent_id,
  pCate.id AS CateID,
  pImg.image_url AS image_urls,
  ROUND(AVG(pReview.rating), 1) AS average_rating,
  GROUP_CONCAT(CONCAT_WS('|', pReview.comment, pReview.rating, pReview.user_id, DATE_FORMAT(pReview.created_at, '%Y-%m-%d %T'))) AS review_details,
  GROUP_CONCAT(pImg.sort_order ORDER BY pImg.sort_order) AS sort_orders
FROM 
  product AS p
  LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
  LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
  LEFT JOIN product_categories AS pCate ON p.category_id = pCate.id
WHERE
  p.category_id IN (
    SELECT id FROM product_categories
    WHERE id IN (10) OR parent_id IN (10)
  )
GROUP BY 
  p.id
ORDER BY 
  p.id ASC
LIMIT 20 OFFSET 0;



SELECT 
  p.id, 
  p.product_name, 
  p.product_price, 
  p.product_stock, 
  p.product_description,
  p.valid, 
  p.upload_date,
  p.category_id, 
  pCate.name AS cate_name,
  pCate.parent_id,
  pCate.id AS CateID,
  pImg.image_url AS image_urls,
  ROUND(AVG(pReview.rating), 1) AS average_rating,
  GROUP_CONCAT(CONCAT_WS('|', pReview.comment, pReview.rating, pReview.user_id, DATE_FORMAT(pReview.created_at, '%Y-%m-%d %T'))) AS review_details,
  GROUP_CONCAT(pImg.sort_order ORDER BY pImg.sort_order) AS sort_orders
FROM 
  product AS p
  LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
  LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
  LEFT JOIN product_categories AS pCate ON p.category_id = pCate.id
WHERE
  p.category_id = 22
GROUP BY 
  p.id
ORDER BY 
  p.id ASC
LIMIT 20 OFFSET 0;


SELECT 
    p.id, 
    p.product_name, 
    p.product_price, 
    p.discount_price,
    p.product_stock, 
    p.product_description,
    p.valid, 
    p.upload_date,
    p.category_id, 
    pCate.name AS cate_name,
    pCate.parent_id,
    pCate.id AS CateID,
    pImg.image_url AS image_urls,
    pReview.rating AS rating,
    ROUND(AVG(pReview.rating), 1) AS average_rating,
    GROUP_CONCAT(CONCAT_WS('|', pReview.comment, pReview.rating, pReview.user_id, DATE_FORMAT(pReview.created_at, '%Y-%m-%d %T'))) AS review_details,
    GROUP_CONCAT(pImg.sort_order ORDER BY pImg.sort_order) AS sort_orders
FROM 
    product AS p
    LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
    LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
    LEFT JOIN product_categories AS pCate ON p.category_id = pCate.id
WHERE
    category_id IN  (15,14)
GROUP BY 
    p.id
ORDER BY
    id DESC  
LIMIT 100; 

SELECT 
    p.id, 
    p.product_name, 
    p.product_price, 
    p.discount_price,
    p.product_stock, 
    p.product_description,
    p.valid, 
    p.upload_date,
    p.category_id, 
    pCate.name AS cate_name,
    pCate.parent_id,
    pCate.id AS CateID,
    pImg.image_url AS image_urls,
    ROUND(AVG(pReview.rating), 1) AS average_rating,
    GROUP_CONCAT(CONCAT_WS('|', pReview.comment, pReview.rating, pReview.user_id, DATE_FORMAT(pReview.created_at, '%Y-%m-%d %T'))) AS review_details,
    GROUP_CONCAT(pImg.sort_order ORDER BY pImg.sort_order) AS sort_orders
FROM 
    product AS p
LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
LEFT JOIN product_categories AS pCate ON p.category_id = pCate.id
WHERE
    ROUND(AVG(pReview.rating), 1) = 3
GROUP BY 
    p.id
ORDER BY
    rating DESC  
LIMIT 100; 



    SELECT 
    p.id, 
    p.product_name, 
    p.product_price, 
    p.discount_price,
    p.product_stock, 
    p.product_description,
    p.valid, 
    p.upload_date,
    p.category_id, 
    pCate.name AS cate_name,
    pCate.parent_id,
    pCate.id AS CateID,
    pImg.image_url AS image_urls,
    ROUND(AVG(pReview.rating), 1) AS average_rating,
    GROUP_CONCAT(CONCAT_WS('|', pReview.comment, pReview.rating, pReview.user_id, DATE_FORMAT(pReview.created_at, '%Y-%m-%d %T'))) AS review_details,
    GROUP_CONCAT(pImg.sort_order ORDER BY pImg.sort_order) AS sort_orders
FROM 
    product AS p
LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
LEFT JOIN product_categories AS pCate ON p.category_id = pCate.id
GROUP BY 
    p.id
HAVING
    ROUND(AVG(pReview.rating), 1) = 3
ORDER BY 
    p.category_id ASC


SELECT COUNT(*) AS vagetable FROM product WHERE category_id = 1;

SELECT COUNT(*) AS fruit FROM product WHERE category_id = 2;

SELECT COUNT(*) AS meet FROM product WHERE  category_id IN (8,9,10,11,21);

SELECT COUNT(*) AS seadfood FROM product WHERE category_id = 4;

SELECT COUNT(*) AS fruit FROM product WHERE category_id = 2;

SELECT COUNT(*) AS egg FROM product WHERE category_id = 5;

SELECT COUNT(*) AS fruit FROM product WHERE category_id = 2;

SELECT COUNT(*) AS vegetarianDiet FROM product WHERE category_id = 7;

SELECT COUNT(*) AS soyMilkProducts FROM product WHERE category_id IN (12,13);

-- 優惠商品數量
SELECT COUNT(*) AS DisVagetable FROM product WHERE category_id = 14;

SELECT COUNT(*) AS disFruit FROM product WHERE category_id = 15;

SELECT COUNT(*) AS disVegetarianDiet FROM product WHERE category_id = 16;
SELECT COUNT(*) AS disMeet FROM product WHERE category_id = 17;

SELECT COUNT(*) AS disEgg FROM product WHERE category_id = 18;

SELECT COUNT(*) AS disSoyMilkProducts FROM product WHERE category_id = 19;

SELECT COUNT(*) AS disSeadfood FROM product WHERE category_id = 20;

SELECT COUNT(*) AS disGift FROM product WHERE category_id = 22;







SELECT * FROM product WHERE category_id IN ()

SELECT DISTINCT id AS cateId, name AS cateName, parent_id AS parentId
    FROM product_categories WHERE id IN (14,15,16,17,18,19,20,23)



SELECT 
    p.id, 
    p.product_name, 
    p.product_price, 
    p.discount_price,
    p.product_stock, 
    p.product_description,
    p.valid, 
    p.upload_date,
    p.category_id, 
    pCate.name AS cate_name,
    pCate.parent_id,
    pCate.id AS CateID,
    pImg.image_url AS image_urls,
    ROUND(AVG(pReview.rating), 1) AS average_rating,
    GROUP_CONCAT(DISTINCT CONCAT_WS('|', pReview.comment, pReview.rating, pReview.user_id, DATE_FORMAT(pReview.created_at, '%Y-%m-%d %T'))) AS review_details,
    GROUP_CONCAT(DISTINCT pImg.sort_order ORDER BY pImg.sort_order) AS sort_orders
FROM 
    product AS p
    LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
    LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
    LEFT JOIN product_categories AS pCate ON p.category_id = pCate.id
WHERE
    p.category_id IN (14,15,16,17,18,19,20,23)
GROUP BY 
    p.id
ORDER BY
    p.id DESC
LIMIT 100;



SELECT p.product_name, p.product_price, p.id , pImage.image_url , p.upload_date
      FROM product AS p
      JOIN product_image AS pImage ON p.id = pImage.product_id
      ORDER BY created_at DESC
      LIMIT 5;