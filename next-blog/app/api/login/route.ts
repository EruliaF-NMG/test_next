import { NextResponse } from "next/server";
import { compareSync } from "bcryptjs";
import prisma from "@/lib/db/prisma";
import { User } from "@prisma/client";
import { errorResponse, successResponse } from "@/lib/http/response_formatter";
import { sign } from "jsonwebtoken";
import { JWTPaylod } from "@/types/custom-jwt";

interface LoginRequestBody{
    email: string;
    password: string;
}

export const POST = async (req: Request) => {
    try {
        const loginRequest: LoginRequestBody = await req.json();
        if(!loginRequest.email || !loginRequest.password ){
            return NextResponse.json({error: 'Unauthorized'}, {status: 401})
        }
        const user:any = await prisma.user.findFirst({
            where:{
                email: loginRequest.email
            },
            include: {
                roles:{
                    include:{
                        permissions: true
                    }
                }
            },
        });

        if(!user) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        if(!compareSync(loginRequest.password,user!.password)) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        const jwtPaylod:JWTPaylod = {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles.map(role => role.key),
            permissions:user.roles.map(role => role.permissions.map(permission => permission.key)).flat(Infinity)
        }
        const acesssToken:string = sign(jwtPaylod, process.env.JWT_SECRET, { expiresIn: 86400 });
        const refreshToken:string = sign({ 
            id: user.id, 
        }, process.env.JWT_SECRET, { expiresIn: 259200 }); 
        return successResponse("Authorization is success", 201, {
            'access_token': acesssToken,
            'refresh_token': refreshToken,
        });
    } catch( ex:any ){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }
}