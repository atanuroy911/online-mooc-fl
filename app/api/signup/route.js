import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { firstName, lastName, email, password, rollNumber, username } = await request.json();

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const db = await pool.getConnection();
    const query = "INSERT INTO Users (FirstName, LastName, RollNumber, Password, Email, username) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [firstName, lastName, rollNumber, hashedPassword, email, username];
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