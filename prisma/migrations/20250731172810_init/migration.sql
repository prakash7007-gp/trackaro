-- CreateTable
CREATE TABLE "attendance" (
    "id" SERIAL NOT NULL,
    "employeeid" INTEGER,
    "date" DATE NOT NULL,
    "checkin" TIMESTAMP(6),
    "checkout" TIMESTAMP(6),
    "lateminutes" INTEGER DEFAULT 0,
    "earlyexitminutes" INTEGER DEFAULT 0,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "inchargeid" INTEGER,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_shifts" (
    "id" SERIAL NOT NULL,
    "employeeid" INTEGER,
    "shiftid" INTEGER,
    "assignedby" INTEGER,
    "assignedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_shifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "departmentid" INTEGER,
    "role" VARCHAR(20) DEFAULT 'employee',
    "joindate" DATE NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leave_requests" (
    "id" SERIAL NOT NULL,
    "employeeid" INTEGER,
    "fromdate" DATE NOT NULL,
    "todate" DATE NOT NULL,
    "reason" TEXT,
    "status" VARCHAR(20) DEFAULT 'pending',

    CONSTRAINT "leave_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monthly_permissions" (
    "id" SERIAL NOT NULL,
    "employeeid" INTEGER,
    "monthyear" VARCHAR(7) NOT NULL,
    "usedminutes" INTEGER DEFAULT 0,

    CONSTRAINT "monthly_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shifts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "starttime" VARCHAR(8) NOT NULL,
    "endtime" VARCHAR(8) NOT NULL,

    CONSTRAINT "shifts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "monthly_permissions_employeeid_monthyear_key" ON "monthly_permissions"("employeeid", "monthyear");

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_employeeid_fkey" FOREIGN KEY ("employeeid") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_inchargeid_fkey" FOREIGN KEY ("inchargeid") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employee_shifts" ADD CONSTRAINT "employee_shifts_assignedby_fkey" FOREIGN KEY ("assignedby") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employee_shifts" ADD CONSTRAINT "employee_shifts_employeeid_fkey" FOREIGN KEY ("employeeid") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employee_shifts" ADD CONSTRAINT "employee_shifts_shiftid_fkey" FOREIGN KEY ("shiftid") REFERENCES "shifts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_departmentid_fkey" FOREIGN KEY ("departmentid") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "leave_requests" ADD CONSTRAINT "leave_requests_employeeid_fkey" FOREIGN KEY ("employeeid") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "monthly_permissions" ADD CONSTRAINT "monthly_permissions_employeeid_fkey" FOREIGN KEY ("employeeid") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
