// pages/api/posts.js
import pool from "@/app/libs/mysql";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { studentEmail, taskId, flag } = await request.json();

        const db = await pool.getConnection();
        
        let query;
        let values;

        // Check if a record with the same student_id and task_id exists in the database
        query = `SELECT COUNT(*) AS count FROM task_completions WHERE student_id = (SELECT UserID FROM Users WHERE Email = ?) AND task_id = ?`;
        values = [studentEmail, taskId];
        const [existingResult] = await db.execute(query, values);
        const existingCount = existingResult[0].count;

        // If a matching record exists and the incoming flag is false, delete it
        if (existingCount > 0 && !flag) {
            query = `DELETE FROM task_completions WHERE student_id = (SELECT UserID FROM Users WHERE Email = ?) AND task_id = ?`;
            values = [studentEmail, taskId];
            await db.execute(query, values);
            db.release();
            return NextResponse.json({ message: "Post deleted successfully" });
        }

        // If a matching record exists and the flag in the database is true, ignore
        if (existingCount > 0 && flag) {
            db.release();
            return NextResponse.json({ message: "Post already exists" });
        }

        // If no matching record exists, add a new record
        query = `INSERT INTO task_completions (id, student_id, task_id, completed) SELECT NULL, Users.UserID, ?, ? FROM Users WHERE Users.Email = ?`;
        values = [taskId, flag, studentEmail];
        await db.execute(query, values);
        db.release();
        return NextResponse.json({ message: "Post added successfully" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
