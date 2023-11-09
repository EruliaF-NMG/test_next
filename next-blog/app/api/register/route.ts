import { NextResponse } from "next/server";
import { hashSync } from "bcryptjs";
import prisma from "@/lib/db/prisma";
import { User } from "@prisma/client";
import { errorResponse, successResponse } from "@/lib/http/response_formatter";

interface RegisterRequestBody{
    email: string;
    password: string;
    name: string;
    imageUrl:string;
    roleIDs:string[];
}

export const POST = async (req: Request) => {
    try {
        const registerRequest: RegisterRequestBody = await req.json();
        if(!registerRequest.email || !registerRequest.password || !registerRequest.name ){
            return errorResponse("Invalid request", 400, "Invalid request")
        }
        const hashPassword:string = hashSync(registerRequest.password, 10);
        const user:User = await prisma.user.create({
            data: {
                email: registerRequest.email,
                password: hashPassword,
                name: registerRequest.name,
                imageUrl: registerRequest.imageUrl ?? "",
                roleIDs: registerRequest.roleIDs ?? [ "654cde33960ff2605b015043" ],
            }
        });
        return successResponse("User created", 201, user);
    } catch( ex:any ){
        return errorResponse("Error creating user", 500, ex);
    }
}