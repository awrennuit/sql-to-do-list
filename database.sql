CREATE TABLE "to-do" (
	"id" serial primary key,
	"task" varchar(80) not null,
	"completed" varchar(30) DEFAULT 'N'
);

INSERT INTO "to-do"("task") VALUES('Vacuum bedroom');