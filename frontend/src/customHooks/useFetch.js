const useFetch = async (url) => {
    try{
        return await (await fetch(url)).json();
    }catch(err){
        throw err;
    }
}

export default useFetch