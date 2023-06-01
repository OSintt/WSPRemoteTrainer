import './db';
import app from './app';
//import { createApiKey, createBots } from './lib/createData';
import Bot from './models/Bot';
const main = async () => {
    console.log(await Bot.find());
    app.listen(app.get('port'), () => console.log('Server running on port', app.get('port'))); 
    //createApiKey();
    //createBots(); 
};

main();