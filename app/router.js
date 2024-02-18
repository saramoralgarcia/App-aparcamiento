import aparkingRoutes from './routers/aparking.route.js';

const router = (app) =>
{
    app.use('/aparking', aparkingRoutes);
}

export default router;