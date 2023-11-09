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

export const POST = async (req: Request) => {
    try {
        const postRequest: PostRequestBody = await req.json();

        if(!postRequest.title) return errorResponse("Invalid request", 400, "Invalid request")

        const post:Post = await prisma.post.create({
            data: {
                title: postRequest.title,
                body: postRequest.body ?? "",
                authorId: postRequest.authorId,
                categoryId: postRequest.categoryId,
                imageUrl: postRequest.imageUrl ?? null
            }
        });
        return successResponse("Post created", 201, post);
    } catch( ex:any ){
        return errorResponse("Error creating post", 500, ex);
    }
}

export const GET = async (req: Request) => {
    try {
        console.log("GET------pppp")
        const post:Array<Post> = await prisma.post.findMany({
            include:{
                category: true,
                author:true
            }
        });
        return successResponse("Post List", 200, post);
    } catch( ex:any ){
        return errorResponse("Error to list post", 500, ex);
    }
}