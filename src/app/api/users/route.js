const DB_PASSWORD = process.env.DB_PASSWORD;


export async function GET(request){
    console.log(request);
    return new Response('hi');
}
