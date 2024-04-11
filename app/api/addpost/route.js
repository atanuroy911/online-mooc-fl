// pages/api/posts.js
import pool from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { subject, content, createdBy } = await request.json();

        const db = await pool.getConnection();
        
        const query = "INSERT INTO Posts (Subject, Content, CreatedBy) VALUES (?, ?, ?)";
        const values = [subject, content, createdBy];
        console.log(values);
        const [result] = await db.execute(query, values);

        db.release();

        if (result.affectedRows > 0) {
            return NextResponse.json({ message: "Post added successfully" });
        } else {
            return NextResponse.json({ error: "Failed to add post" }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
