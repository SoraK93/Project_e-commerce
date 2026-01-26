CREATE TABLE "products" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "description" text,
  "in_stock" int,
  "price" real
);

CREATE TABLE "categories" (
  "id" uuid PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "product_category" (
  "products_id" int,
  "categories_id" int
);

CREATE TABLE "orders" (
  "order_id" uuid PRIMARY KEY,
  "customers_id" int UNIQUE
);

CREATE TABLE "order_details" (
  "id" uuid PRIMARY KEY,
  "product_id" int UNIQUE,
  "quantity" integer DEFAULT 1,
  "payment_status" bool,
  "payment_mode" varchar,
  "ordered_on" timestamp DEFAULT (now()),
  CONSTRAINT "check_cart_quantity" CHECK (quantity > 0)
);

CREATE TABLE "delivery_details" (
  "order_id" int UNIQUE,
  "delivery_address" varchar,
  "delivery_status" varchar,
  "contact_person" varchar
);

CREATE TABLE "customers_details" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "phone" varchar,
  "email" varchar UNIQUE,
  "address" text
);

CREATE INDEX "product_category_product_id_categories_id_index" ON "product_category" ("products_id", "categories_id");

COMMENT ON TABLE "products" IS 'Stores all product related data';

COMMENT ON TABLE "categories" IS 'Stores all category types a product can relate too';

COMMENT ON TABLE "product_category" IS 'Products can be searched based on its category';

ALTER TABLE "product_category" ADD FOREIGN KEY ("products_id") REFERENCES "products" ("id");

ALTER TABLE "product_category" ADD FOREIGN KEY ("categories_id") REFERENCES "categories" ("id");

ALTER TABLE "order_details" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("customers_id") REFERENCES "customers_details" ("id") ON DELETE CASCADE;

ALTER TABLE "delivery_details" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("order_id") ON DELETE CASCADE;

ALTER TABLE "orders" ADD FOREIGN KEY ("order_id") REFERENCES "order_details" ("id") ON DELETE CASCADE;
