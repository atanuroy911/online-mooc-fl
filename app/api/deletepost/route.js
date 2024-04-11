// FILE NAME /app/api/tacos/route.js
import { NextResponse } from 'next/server';
import pool from '@/app/libs/mysql';

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('postID');

  try {
    const db = await pool.getConnection();
    // Delete comments associated with the post first
    const commentQuery = 'DELETE FROM Comments WHERE PostID = ?';
    await db.execute(commentQuery, [id]);

    // Now delete the post
    const postQuery = 'DELETE FROM Posts WHERE PostID = ?';
    const [result] = await db.execute(postQuery, [id]);
    db.release();

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: 'Post deleted successfully' });
    } else {
      return NextResponse({ error: 'Post not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse(
      { error: 'Internal server error - delete ' },
      { status: 500 }
    );
  }
}
