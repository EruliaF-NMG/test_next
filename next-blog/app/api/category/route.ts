import prisma from "@/lib/db/prisma";
import { Category } from "@prisma/client";
import { errorResponse, successResponse } from "@/lib/http/response_formatter";


export const GET = async (req: Request) => {
    try {
        const categories:Array<Category> = await prisma.category.findMany();
        return successResponse("Category List", 200, categories);
    } catch( ex:any ){
        return errorResponse("Error to list category", 500, ex);
    }
}