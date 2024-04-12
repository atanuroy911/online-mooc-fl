import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET(req: NextRequest) {
    try {
        const courseId = req.nextUrl.searchParams.get('id')
        const db = await pool.getConnection()

        const query = 'select * from tasks where course_id = ?'
        const [rows] = await db.execute(query, [courseId])
        db.release()
        
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}