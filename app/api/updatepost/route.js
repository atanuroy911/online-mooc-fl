// pages/api/posts.js
import pool from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const { postId, subject, content } = await request.json();

        const db = await pool.getConnection();
        
        const query = "UPDATE Posts SET Subject = ?, Content = ? WHERE PostID = ?";
        const values = [subject, content, postId];
        console.log(values);
        const [result] = await db.execute(query, values);

        db.release();

        if (result.affectedRows > 0) {
            return NextResponse.json({ message: "Post updated successfully" });
        } else {
            return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
