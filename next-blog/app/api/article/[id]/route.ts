import prisma from "@/lib/db/prisma";
import { Post } from "@prisma/client";
import { errorResponse, successResponse } from "@/lib/http/response_formatter";

interface PostRequestBody {
    title: string;
    body: string;
    authorId: string;
    categoryId: string;
    imageUrl: string;
}


export const GET = async (req: Request,{ params }: { params: { id: string } }) => {
    try {
        const paramsId = params.id;
        const post:Post|null = await prisma.post.findFirst({
            where:{id:paramsId},
            include:{
                category: true,
                author:true
            }
        });
        return successResponse("Post item", 200, post??{});
    } catch( ex:any ){
        return errorResponse("Error to find post", 500, ex);
    }
}

interface PutRequestBody {
    title: string;
    body: string;
    categoryId: string;
    imageUrl: string;
}


export const PUT = async (req: Request,{ params }: { params: { id: string } }) => {
    try {
        const paramsId = params.id;

        const postRequest: PutRequestBody = await req.json();

        if(!postRequest.title || !postRequest.categoryId || !postRequest.body) return errorResponse("Invalid request", 400, "Invalid request")


        const post:Post = await prisma.post.update({
            where:{id:paramsId},
            data:{
                title: postRequest.title,
                body:postRequest.body,
                categoryId:postRequest.categoryId,
            }
        });
        return successResponse("Post item", 200, post??{});
    } catch( ex:any ){
        return errorResponse("Error to find post", 500, ex);
    }
}