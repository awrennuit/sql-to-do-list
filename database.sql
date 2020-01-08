DROP TABLE "to-do";

CREATE TABLE "to-do" (
	"id" serial primary key,
	"task" varchar(180) not null,
	"completed" boolean DEFAULT false
);

INSERT INTO "to-do"("task") VALUES('Vacuum bedroom');
INSERT INTO "to-do"("task") VALUES('Clean lounge');
INSERT INTO "to-do"("task") VALUES('Order kitchen');
INSERT INTO "to-do"("task") VALUES('Ditch dining room');
INSERT INTO "to-do"("task") VALUES('Fuel bathroom');
