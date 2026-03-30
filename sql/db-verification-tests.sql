
-- =========================================================
-- 1. User registration
-- Action in app:
-- POST /api/users
-- =========================================================

SELECT COUNT(*) AS user_count
FROM users
WHERE email = 'student_1774860246570@erp.local';

SELECT
  u.id,
  u.email,
  u.password_hash,
  u.full_name,
  r.name AS role_name,
  u.created_at
FROM users u
LEFT JOIN roles r ON r.id = u.role_id
WHERE u.email = 'student_1774860246570@erp.local';

-- 1.3 Check that the role record exists
SELECT COUNT(*) AS role_count
FROM roles
WHERE name = 'admin';

-- 1.4 Check referential integrity between users and roles
SELECT COUNT(*) AS broken_user_role_links
FROM users u
LEFT JOIN roles r ON r.id = u.role_id
WHERE r.id IS NULL;


-- =========================================================
-- 2. Product creation
-- Action in app:
-- POST /api/products
-- =========================================================

-- 2.1 Check that the product record was created
SELECT COUNT(*) AS product_count
FROM products
WHERE name = 'Продуктыч';

-- 2.2 Check that product fields are filled correctly
SELECT
  p.id,
  p.name,
  p.price,
  p.category_id,
  p.unit_id
FROM products p
WHERE p.name = 'Продуктыч';

-- Expected:
-- name = expected product name
-- price = expected value, for example 125.50
-- category_id = expected category id
-- unit_id IS NOT NULL

-- 2.3 Check category and unit links
SELECT
  p.id AS product_id,
  c.name AS category_name,
  u.name AS unit_name,
  u.short_name AS unit_short_name
FROM products p
LEFT JOIN product_categories c ON c.id = p.category_id
LEFT JOIN units u ON u.id = p.unit_id
WHERE p.name = 'Продуктыч';

-- 2.4 Check for broken product links
SELECT COUNT(*) AS broken_product_links
FROM products p
LEFT JOIN product_categories c ON c.id = p.category_id
LEFT JOIN units u ON u.id = p.unit_id
WHERE c.id IS NULL OR u.id IS NULL;


-- =========================================================
-- 3. Purchase order creation
-- Action in app:
-- POST /api/purchases/orders
-- =========================================================

-- 3.1 Check that the purchase order header exists
SELECT COUNT(*) AS purchase_order_count
FROM purchase_orders
WHERE id = 1;

-- Replace 1 with the real purchase order id from API response.

-- 3.2 Check purchase order fields
SELECT
  po.id,
  po.supplier_id,
  po.order_date,
  po.status
FROM purchase_orders po
WHERE po.id = 1;

-- Expected:
-- supplier_id = expected supplier id
-- status = 'created'

-- 3.3 Check that purchase order items were created
SELECT COUNT(*) AS purchase_order_items_count
FROM purchase_order_items
WHERE purchase_order_id = 1;

-- 3.4 Check purchase order item field values
SELECT
  poi.id,
  poi.purchase_order_id,
  poi.product_id,
  poi.quantity,
  poi.price
FROM purchase_order_items poi
WHERE poi.purchase_order_id = 1;

-- Expected:
-- product_id = expected product id
-- quantity = expected quantity from request
-- price = current product price at order creation time

-- 3.5 Check that item price matches product price
SELECT
  poi.id,
  poi.product_id,
  poi.price AS item_price,
  p.price AS product_price
FROM purchase_order_items poi
JOIN products p ON p.id = poi.product_id
WHERE poi.purchase_order_id = 1;

-- 3.6 Check referential integrity for purchase order
SELECT COUNT(*) AS broken_purchase_links
FROM purchase_order_items poi
LEFT JOIN purchase_orders po ON po.id = poi.purchase_order_id
LEFT JOIN products p ON p.id = poi.product_id
WHERE po.id IS NULL OR p.id IS NULL;


-- =========================================================
-- 4. Sales order creation
-- Action in app:
-- POST /api/sales/orders
-- =========================================================

-- 4.1 Check that the sales order header exists
SELECT COUNT(*) AS sales_order_count
FROM sales_orders
WHERE id = 1;

-- Replace 1 with the real sales order id from API response.

-- 4.2 Check sales order fields
SELECT
  so.id,
  so.client_id,
  so.order_date,
  so.status
FROM sales_orders so
WHERE so.id = 1;



-- 4.3 Check that sales order items were created
SELECT COUNT(*) AS sales_order_items_count
FROM sales_order_items
WHERE sales_order_id = 1;

-- 4.4 Check sales order item field values
SELECT
  soi.id,
  soi.sales_order_id,
  soi.product_id,
  soi.quantity,
  soi.price
FROM sales_order_items soi
WHERE soi.sales_order_id = 1;


-- 4.5 Check that item price matches product price
SELECT
  soi.id,
  soi.product_id,
  soi.price AS item_price,
  p.price AS product_price
FROM sales_order_items soi
JOIN products p ON p.id = soi.product_id
WHERE soi.sales_order_id = 1;

-- 4.6 Check referential integrity for sales order
SELECT COUNT(*) AS broken_sales_links
FROM sales_order_items soi
LEFT JOIN sales_orders so ON so.id = soi.sales_order_id
LEFT JOIN products p ON p.id = soi.product_id
WHERE so.id IS NULL OR p.id IS NULL;


-- =========================================================
-- 5. Cascade delete checks
-- Safe manual verification using transaction + rollback
-- These checks confirm that child rows are deleted with parent rows.
-- =========================================================

-- 5.1 Cascade delete for purchase orders -> purchase_order_items
BEGIN;

SELECT COUNT(*) AS purchase_items_before_delete
FROM purchase_order_items
WHERE purchase_order_id = 3;

DELETE FROM purchase_orders
WHERE id = 3;

SELECT COUNT(*) AS purchase_order_after_delete
FROM purchase_orders
WHERE id = 3;

SELECT COUNT(*) AS purchase_items_after_delete
FROM purchase_order_items
WHERE purchase_order_id = 3;

ROLLBACK;




-- 5.2 Cascade delete for sales orders -> sales_order_items
BEGIN;

SELECT COUNT(*) AS sales_items_before_delete
FROM sales_order_items
WHERE sales_order_id = 1;

DELETE FROM sales_orders
WHERE id = 1;

SELECT COUNT(*) AS sales_order_after_delete
FROM sales_orders
WHERE id = 1;

SELECT COUNT(*) AS sales_items_after_delete
FROM sales_order_items
WHERE sales_order_id = 1;

ROLLBACK;



-- =========================================================
-- 6. Additional integrity checks for the whole database
-- =========================================================

-- 6.1 Users without valid role
SELECT COUNT(*) AS users_without_role
FROM users u
LEFT JOIN roles r ON r.id = u.role_id
WHERE r.id IS NULL;

-- 6.2 Products without valid category or unit
SELECT COUNT(*) AS products_with_broken_links
FROM products p
LEFT JOIN product_categories c ON c.id = p.category_id
LEFT JOIN units u ON u.id = p.unit_id
WHERE c.id IS NULL OR u.id IS NULL;

-- 6.3 Purchase items without valid order or product
SELECT COUNT(*) AS orphan_purchase_items
FROM purchase_order_items poi
LEFT JOIN purchase_orders po ON po.id = poi.purchase_order_id
LEFT JOIN products p ON p.id = poi.product_id
WHERE po.id IS NULL OR p.id IS NULL;

-- 6.4 Sales items without valid order or product
SELECT COUNT(*) AS orphan_sales_items
FROM sales_order_items soi
LEFT JOIN sales_orders so ON so.id = soi.sales_order_id
LEFT JOIN products p ON p.id = soi.product_id
WHERE so.id IS NULL OR p.id IS NULL;

-- 6.5 Stock movements with broken links
SELECT COUNT(*) AS broken_stock_links
FROM stock_movements sm
LEFT JOIN warehouses w ON w.id = sm.warehouse_id
LEFT JOIN products p ON p.id = sm.product_id
LEFT JOIN batches b ON b.id = sm.batch_id
WHERE w.id IS NULL OR p.id IS NULL OR b.id IS NULL;
