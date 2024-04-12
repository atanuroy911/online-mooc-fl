// pages/api/courses.js
import pool from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { selectedCourse, selectedStudents } = await request.json();

        const db = await pool.getConnection();

        let sqlResult = false
        selectedStudents.map(async item => {
            const query = 'INSERT INTO course_students (course_id, student_id) VALUES (?, ?);';
            const values = [selectedCourse, item];
            console.log(values);
            const [result] = await db.execute(query, values);
            if (result.affectedRows > 0) {
                sqlResult = true
            }
        })

        db.release();

        if (sqlResult) {
            return NextResponse.json({ message: "Course Assigned added successfully" });
        } else {
            return NextResponse.json({ error: "Student Added" }, { status: 200 });
        }
    } catch (error) {
        // console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
