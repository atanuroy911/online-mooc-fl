import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET(req) {
    try {
        const courseId = req.nextUrl.searchParams.get("courseID"); // Assuming the postId is passed in the query params
        const studentId = req.nextUrl.searchParams.get("studentID"); // Assuming the postId is passed in the query params
        // console.log(courseId);
        // console.log(studentId);
        const db = await pool.getConnection();
        const query = 'DELETE FROM course_students WHERE `course_students`.`course_id` = ? AND `course_students`.`student_id` = ?';
        const [rows] = await db.execute(query, [courseId, studentId]); // Binding the postId parameter
        db.release();
        
        return NextResponse.json(rows);
    } catch (error) {
        // console.error("Error fetching comments:", error);
        return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
    }
}
