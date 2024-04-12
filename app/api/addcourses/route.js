// pages/api/courses.js
import pool from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { courseName, courseDescription, courseCode, courseCredits, department, departmentShort, instructor, learningObjectives, prerequisites, duration, qualifications, experience, syllabus } = await request.json();

        const db = await pool.getConnection();

        const query = 'INSERT INTO `courses` (`courseId`, `name`, `department`, `department_short`, `credits`, `instructor`, `content`, `learning_objectives`, `prerequisites`, `duration`, `qualifications`, `experience`, `syllabus`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [courseCode, courseName, department, departmentShort, courseCredits, instructor, courseDescription, learningObjectives, prerequisites, duration, qualifications, experience, syllabus];
        console.log(values);
        const [result] = await db.execute(query, values);

        db.release();

        if (result.affectedRows > 0) {
            return NextResponse.json({ message: "Course added successfully" });
        } else {
            return NextResponse.json({ error: "Failed to add course" }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
