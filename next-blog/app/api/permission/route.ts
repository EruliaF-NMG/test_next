import prisma from "@/lib/db/prisma";
import { Permission } from "@prisma/client";
import { errorResponse, successResponse } from "@/lib/http/response_formatter";

interface PermissionRequestBody{
    name: string;
    key: string;
    roleIDs: string[];
}

export const POST = async (req: Request) => {
    try {
        const registerRequest: PermissionRequestBody = await req.json();
        if(!registerRequest.name || !registerRequest.key ){
            return errorResponse("Invalid request", 400, "Invalid request")
        }
        const permission:Permission = await prisma.permission.create({
            data: {
                name: registerRequest.name,
                key: registerRequest.key,
                roleIDs: registerRequest.roleIDs ?? []
            }
        });
        return successResponse("Permission created", 201, permission);
    } catch( ex:any ){
        return errorResponse("Error creating permission", 500, ex);
    }
}