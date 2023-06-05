import './db';
import app from './app';
//import { createApiKey, createBots } from './lib/createData';

const main = async () => {
    app.listen(app.get('port'), () => console.log('Server running on port', app.get('port'), 'Con el bot:', app.get('id'))); 
    //createApiKey();
    //createBots(); 
};

main();