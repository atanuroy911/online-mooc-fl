// pages/api/posts.js
import pool from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, content, id } = await request.json();

        const db = await pool.getConnection();
        
        const query = "INSERT INTO `tasks` (`id`, `course_id`, `title`, `content`) VALUES (NULL, ?, ?, ?)";
        const values = [id, title, content];
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
