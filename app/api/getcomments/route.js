import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET(req) {
    try {
        const postId = req.nextUrl.searchParams.get("postID"); // Assuming the postId is passed in the query params
        console.log(postId);
        const db = await pool.getConnection();
        const query = 'SELECT * FROM Comments WHERE `PostID` = ?';
        const [rows] = await db.execute(query, [postId]); // Binding the postId parameter
        db.release();
        
        return NextResponse.json(rows);
    } catch (error) {
        // console.error("Error fetching comments:", error);
        return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
    }
}
