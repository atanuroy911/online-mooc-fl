// pages/api/posts.js
import pool from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { postID, comment, createdBy } = await request.json(); // Assuming the client sends postID, comment, and createdBy in the request body

        const db = await pool.getConnection();
        
        const query = "INSERT INTO Comments (PostID, Comment, CreatedBy) VALUES (?, ?, ?)"; // Adjusted SQL query to insert into the Comments table
        const values = [postID, comment, createdBy]; // Updated values array with postID, comment, and createdBy
        const [result] = await db.execute(query, values);
        console.log(values);
        db.release();

        if (result.affectedRows > 0) {
            return NextResponse.json({ message: "Comment added successfully" });
        } else {
            return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
