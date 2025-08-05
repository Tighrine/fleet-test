import express from 'express';
import employeeRoutes from './routes/employee.routes';
import deviceRoutes from './routes/device.routes';
import { zodErrorHandler } from './middleware/zodErrorHandler';

const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/employees', employeeRoutes);
app.use('/api/devices', deviceRoutes);

app.use(zodErrorHandler);

export default app;
