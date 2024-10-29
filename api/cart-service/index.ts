import http from 'http';
import express from 'express';
import connectDB from './config/db'
// import MainController from './controllers/main';
// import BookController from './controllers/book';

export const app = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
    
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    connectDB()
    
    httpServer = http.createServer(app);
    httpServer.listen(process.env.PORT, () => {
        console.log(`Server started on localhost:${process.env.PORT}`);
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();