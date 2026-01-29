CREATE TABLE "products" (
  "id" uuid PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" text NOT NULL,
  "in_stock" int NOT NULL,
  "price" real NOT NULL,
  "seller_id" uuid,
  CONSTRAINT "check_stock" CHECK (in_stock > 0)
);

CREATE TABLE "cart" (
  "product_id" uuid,
  "customer_id" uuid,
  "quantity" integer DEFAULT 1
);

CREATE TABLE "order_details" (
  "id" uuid PRIMARY KEY,
  "product_id" uuid,
  "customer_id" uuid,
  "quantity" integer DEFAULT 1,
  "payment_status" bool,
  "payment_mode" varchar,
  "ordered_on" timestamp DEFAULT (now()),
  CONSTRAINT "check_cart_quantity" CHECK (quantity > 0)
);

CREATE TABLE "customers_details" (
  "id" uuid PRIMARY KEY,
  "name" varchar NOT NULL,
  "phone" varchar UNIQUE NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" uuid NOT NULL,
  "address" text NOT NULL
);

COMMENT ON TABLE "products" IS 'Stores all product related data';

ALTER TABLE "order_details" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "cart" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "cart" ADD FOREIGN KEY ("customer_id") REFERENCES "customers_details" ("id");

ALTER TABLE "order_details" ADD FOREIGN KEY ("customer_id") REFERENCES "customers_details" ("id");
