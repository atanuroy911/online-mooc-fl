import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/utils/auth";


export async function GET(
    request:  NextRequest
) {
    try {
        const session = await getSession();
        console.log(session);
        if (session!=null){
            return NextResponse.json({
                message: "Login Successful",
                session: session,
                
            }, {
                status: 200,
            })
        }
        return NextResponse.json({
            message: "Login Unsuccessful",
            session: null,
        }, {
            status: 200,
        })
        
    } catch (error) {
        return NextResponse.json({
            message: "Error Occured",
            error: error
        }, {
            status: 500,
        })
    }
}
