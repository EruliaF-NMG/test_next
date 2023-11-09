

const getData = async (url:string): Promise<any[]> => {
    const data = await fetch(url,{ cache: 'no-store' });
    const post = await data.json();
    return post.data;
};
  
export {
    getData
}