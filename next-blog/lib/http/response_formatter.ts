import { NextResponse } from "next/server";

const errorResponse = (message:string,errorCode:number,error: any) => {
    return NextResponse.json({
        message:message,
        error: error,
    },{
        status: errorCode
    });
}

const successResponse = (message:string,errorCode:number=201,data: any) => {
    return NextResponse.json({
        message:message,
        data: data,
    },{
        status: errorCode
    });
}

export {
    errorResponse,
    successResponse
}