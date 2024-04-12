import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET() {
    try {
        const db = await pool.getConnection();

        // Queries
        const [usersResult] = await db.execute('SELECT COUNT(*) AS userCount FROM Users');
        const [coursesResult] = await db.execute('SELECT COUNT(*) AS courseCount FROM courses');
        const [postsResult] = await db.execute('SELECT COUNT(*) AS postCount FROM Posts');
        const [commentsResult] = await db.execute('SELECT COUNT(*) AS commentCount FROM Comments');

        db.release();

        // Extract counts from query results
        const userCount = usersResult[0]?.userCount || 0;
        const courseCount = coursesResult[0]?.courseCount || 0;
        const postCount = postsResult[0]?.postCount || 0;
        const commentCount = commentsResult[0]?.commentCount || 0;

        // Return analytics data
        return NextResponse.json({
            userCount,
            courseCount,
            postCount,
            commentCount
        });
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 });
    }
}
