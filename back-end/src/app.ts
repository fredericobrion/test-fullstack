import express from "express";
import router from "./routes";

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }

  private routes(): void {
    this.app.use(router);
  }
}

export { App };

export const { app } = new App();

// const app = express();

// app.use(express.json());

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World");
// });

// export default app;
