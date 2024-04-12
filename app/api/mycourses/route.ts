import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        const db = await pool.getConnection()
        const query = `
        SELECT courses.*
        FROM courses
        JOIN course_students ON course_students.course_id = courses.id
        JOIN Users ON course_students.student_id = Users.UserID
        WHERE Users.Email = ?;
        `;
        const [rows] = await db.execute(query, [id])
        db.release()

        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}