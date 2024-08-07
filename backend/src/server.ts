import express from 'express';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import https from 'https';
import cors from 'cors';
import { DataSource } from 'typeorm';
import { dataSource } from './data-source';
import { RouteManager } from './managers/route.manager';

import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

class Server {
  private app: express.Application;
  private dataSource: DataSource;
  private routeManager: RouteManager;

  constructor() {
    this.app = express();
    this.dataSource = dataSource;
    this.routeManager = new RouteManager();
    this.configure();
    this.setupRoutes();
    this.startServer();
  }

  configure() {
    this.app.set('port', Number(process.env.SERVER_PORT) || 6666);
    this.app.use(express.json());
    this.app.use(helmet());
    this.configureCORS();
  }

  configureCORS() {
    this.app.use(
      cors({
        origin: [
          'http://localhost',
          'http://localhost:9998',
          'http://192.168.1.6',
          'http://192.168.1.6:9998',
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
      })
    );
  }

  async setupRoutes() {
    try {
      await dataSource.initialize();
      this.routeManager.initializeRoutes(this.app);
      this.setupStaticFiles();
      console.log('Successful connection to database:', process.env.DB_MAIN);
    } catch (error) {
      console.error('Failed connection to database:', error);
    }
  }

  setupStaticFiles() {
    const buildPath = path.join(__dirname, '../../frontend/build');
    if (fs.existsSync(buildPath)) {
      this.app.use(express.static(buildPath));
      this.app.use('/*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
      });
    } else {
      console.log('No build folder found');
    }
  }

  startServer() {
    const port = this.app.get('port');
    if (process.env.TESTMODE === 'true') {
      this.app.listen(port, () =>
        console.log(`Server is listening @ port: ${port}`)
      );
    } else {
      this.startHTTPS(port);
    }
  }

  startHTTPS(port: number) {
    if (process.env.SSL_PATH) {
      const httpsOptions = {
        key: fs.readFileSync(`${process.env.SSL_PATH}${process.env.SSL_KEY}`),
        cert: fs.readFileSync(`${process.env.SSL_PATH}${process.env.SSL_CERT}`),
        ca: [
          fs.readFileSync(`${process.env.SSL_PATH}${process.env.SSL_GD1}`),
          fs.readFileSync(`${process.env.SSL_PATH}${process.env.SSL_GD2}`),
          fs.readFileSync(`${process.env.SSL_PATH}${process.env.SSL_GD3}`),
        ],
      };
      https.createServer(httpsOptions, this.app).listen(port, () => {
        console.log(`Listening on HTTPS on port ${port}`);
      });
    }
  }
}

new Server();
