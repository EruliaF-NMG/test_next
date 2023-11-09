import prisma from "@/lib/db/prisma";
import { Role } from "@prisma/client";
import { errorResponse, successResponse } from "@/lib/http/response_formatter";

interface RoleRequestBody{
    name: string;
    key: string;
    permissionIDs: string[];
    userIDs: string[];
}

export const POST = async (req: Request) => {
    try {
        const registerRequest: RoleRequestBody = await req.json();
        if(!registerRequest.name || !registerRequest.key ){
            return errorResponse("Invalid request", 400, "Invalid request")
        }
        const role:Role = await prisma.role.create({
            data: {
                name: registerRequest.name,
                key: registerRequest.key,
                permissionIDs: registerRequest.permissionIDs ?? [],
                userIDs: registerRequest.userIDs ?? []
            }
        });
        return successResponse("Role created", 201, role);
    } catch( ex:any ){
        return errorResponse("Error creating role", 500, ex);
    }
}