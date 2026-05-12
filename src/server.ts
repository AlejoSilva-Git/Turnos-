import { app } from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/database";


const bootstrap = async ()=>{
    await connectDB();
    
    app.listen(env.port, ()=>{
        console.log(`Servidor corriendo en puerto ${env.port}`);
    })

}

bootstrap();