import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const db = await pool.getConnection();
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const values = [username, email, hashedPassword];
    const [result] = await db.execute(query, values);

    db.release();

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "User created successfully" });
    } else {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}