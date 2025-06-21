import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes imports
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';
import deliveryRoutes from './routes/deliveryRoutes';
import { seedAdminUser } from './utils/seedAdmin';
import inventoryRoutes from './routes/inventoryRoutes';
import menuRoutes from './routes/menuRoutes';
import reportRoutes from './routes/reportRoutes';
import cashierRoutes from './routes/cashierRoutes'; 
import supportRoutes from './routes/supportRoutes';





// Load environment variables
dotenv.config();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/inventory', inventoryRoutes);

app.use('/api/menu', menuRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/cashier', cashierRoutes);
app.use('/api/support', supportRoutes);


console.log("✅ Menu routes loaded");


// Homepage route
app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to the homepage!');
});

// Start server
app.listen(port, async () => {
    await seedAdminUser();
    console.log(`Server is running on http://localhost:${port}`);
});
