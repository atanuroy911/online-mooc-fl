// pages/api/login/route.js

import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";
import bcrypt from "bcrypt";
import { teacherlogin } from "@/utils/auth";

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        const db = await pool.getConnection();
        const query = "SELECT * FROM teacher_login WHERE username = ?";
        const [rows] = await db.execute(query, [username]);
        db.release();

        if (rows.length === 0) {
            return NextResponse.json({
                message: "User Not Found"
            }, {
                status: 401,
            });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({
                message: "Invalid Password"
            }, {
                status: 401,
            });
        }
        await teacherlogin(user.email, user.username, user.full_name);        

        return NextResponse.json({
            message: "Login Successful",
            name: user.full_name,
            username: username
        }, {
            status: 200,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Error Occured",
            error: error
        }, {
            status: 501,
        });
    }
}
