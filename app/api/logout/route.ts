import { NextRequest, NextResponse } from "next/server";
import { logout } from "@/utils/auth";


export async function GET(request: NextRequest){
    try {
        await logout();
        return NextResponse.json({
            message: "Logout Successful"
        })
    } catch (error) {
        return NextResponse.json({
            message: "Logout unsuccessful",
            error: error
        })
    }
}