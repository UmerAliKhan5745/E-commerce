// src/index.ts
import express, { Request, Response } from 'express';
import './config/dbs'
import cors from 'cors';
import passport from 'passport';
const app = express();
app.use(express.json())
require('./middleware/Jwt_passport/jwtPassport')
const port = 5000;
app.use(passport.initialize());
app.use(cors())
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
    
});
app.use('/api/auth',require('./routes/auth'))
app.use('/api/product',require('./routes/products'))


app.listen(port, () => {

  console.log(`Server is running at http://localhost:${port}`);
});
