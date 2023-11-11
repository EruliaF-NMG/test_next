import prisma from "@/lib/db/prisma";
import { User } from "@prisma/client";
import { errorResponse, successResponse } from "@/lib/http/response_formatter";


export const GET = async (req: Request) => {
    try {
        const users:Array<User> = await prisma.user.findMany({
            include: {
                roles:true
            }
        });
        return successResponse("User List", 200, users);
    } catch( ex:any ){
        return errorResponse("Error to list User", 500, ex);
    }
}