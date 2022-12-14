import express from 'express';
import cors from 'cors';
import connectToDatabase from './connection';

import { UnvRouter } from './controllers/universityController';

let unvRouter = new UnvRouter();


class App {
  
  public app: express.Express;

  constructor() {

    this.app = express();
    this.config();

  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/universities', unvRouter.router);
  }

  public  start(PORT: string | number):void {
    connectToDatabase();
    this.app.listen(PORT, () => { console.log(`Escutando na porta ${PORT}`); });

  }

  public getApp() {
    return this.app;
  }

}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
