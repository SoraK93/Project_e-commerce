CREATE TABLE "cart" (
  "product_id" uuid,
  "customer_id" uuid,
  "quantity" integer DEFAULT 1
);

CREATE TABLE "customers_details" (
  "id" uuid PRIMARY KEY NOT NULL,
  "name" character varying NOT NULL,
  "phone" character varying UNIQUE NOT NULL,
  "email" character varying UNIQUE NOT NULL,
  "password" text NOT NULL,
  "address" text NOT NULL,
  "is_seller" boolean NOT NULL DEFAULT false
);

CREATE TABLE "order_details" (
  "id" uuid PRIMARY KEY NOT NULL,
  "product_id" uuid,
  "customer_id" uuid,
  "quantity" integer DEFAULT 1,
  "payment_status" boolean,
  "payment_mode" character varying,
  "ordered_on" timestamp DEFAULT (now()),
  CONSTRAINT "check_cart_quantity" CHECK ((quantity > 0))
);

CREATE TABLE "products" (
  "id" uuid PRIMARY KEY NOT NULL,
  "name" character varying NOT NULL,
  "description" text NOT NULL,
  "in_stock" integer NOT NULL,
  "price" real NOT NULL,
  "seller_id" uuid,
  CONSTRAINT "check_stock" CHECK ((in_stock >= 0))
);

CREATE TABLE "session_id" (
  "sid" character varying PRIMARY KEY NOT NULL,
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
);

CREATE UNIQUE INDEX "cart_product_id_idx" ON "cart" USING BTREE ("product_id");

CREATE INDEX "IDX_session_expire" ON "session_id" USING BTREE ("expire");

ALTER TABLE "cart" ADD CONSTRAINT "cart_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers_details" ("id");

ALTER TABLE "cart" ADD CONSTRAINT "cart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;

ALTER TABLE "order_details" ADD CONSTRAINT "order_details_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers_details" ("id");

ALTER TABLE "order_details" ADD CONSTRAINT "order_details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "products" ADD CONSTRAINT "products_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "customers_details" ("id");
