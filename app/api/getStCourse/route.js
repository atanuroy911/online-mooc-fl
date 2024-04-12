import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET(req) {
    try {
        const courseId = req.nextUrl.searchParams.get("id"); // Assuming the postId is passed in the query params
        console.log(courseId);
        const db = await pool.getConnection();
        const query = 'SELECT Users.UserID, Users.RollNumber, Users.FirstName, Users.LastName, Users.Email FROM Users JOIN course_students ON Users.UserId = course_students.student_id WHERE course_students.course_id = ? ;';
        const [rows] = await db.execute(query, [courseId]); // Binding the postId parameter
        db.release();
        
        return NextResponse.json(rows);
    } catch (error) {
        // console.error("Error fetching comments:", error);
        return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
    }
}
