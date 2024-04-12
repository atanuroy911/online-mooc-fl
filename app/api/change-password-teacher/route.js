import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { email, newPassword } = await request.json();

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const db = await pool.getConnection();
    const query = "UPDATE teacher_login SET Password = ? WHERE Email = ?";
    const values = [hashedPassword, email];
    const [result] = await db.execute(query, values);

    db.release();

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "Password updated successfully" });
    } else {
      return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
