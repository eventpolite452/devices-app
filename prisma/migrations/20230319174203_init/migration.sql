-- CreateTable
CREATE TABLE "devices" (
    "id" VARCHAR NOT NULL,
    "model" VARCHAR,
    "brand" VARCHAR,
    "release_date" VARCHAR,
    "os" VARCHAR,
    "is_new" BOOLEAN DEFAULT false,
    "received_datatime" DATE DEFAULT CURRENT_TIMESTAMP,
    "update_datetime" TIMESTAMP(3),
    "created_datetime" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "devices_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "devices_id_key" ON "devices"("id");
