import { getCatagoryAPI } from "@/config/api-end-opints";
import { Category } from "@prisma/client";

const getCatagory = async (): Promise<Category[]> => {
    const data = await fetch(getCatagoryAPI,{ cache: 'no-store' });
    const post = await data.json();
    return post.data;
};
  
export {
    getCatagory
}