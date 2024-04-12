import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET(req: NextRequest) {
    try {
        const studentEmail = req.nextUrl.searchParams.get('id')
        const db = await pool.getConnection()

        const query = 'SELECT * FROM task_completions WHERE student_id = (SELECT UserID FROM Users WHERE Email = ?)'
        const [rows] = await db.execute(query, [studentEmail])
        db.release()
        
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}