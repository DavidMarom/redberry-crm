const DB_USER = process.env.DB_USER;


export async function GET(request){
    console.log(request);
    return new Response(DB_USER);
}
