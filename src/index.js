import './db';
import app from './app';
//import { createApiKey, createBots } from './lib/createData';
const main = async () => {
    app.listen(app.get('port'), () => console.log('Server running on port', app.get('port'))); 
    //createApiKey();
    //createBots(); 
};

main();