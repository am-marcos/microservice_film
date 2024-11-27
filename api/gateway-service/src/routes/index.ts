import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = Router();

const userServiceProxy = createProxyMiddleware({
    target: process.env.USER_SERVICE_PORT,
    changeOrigin: true,
    pathRewrite: {
        '^/api/users': '/users',
    },
});

const cartServiceProxy = createProxyMiddleware({
    target: process.env.CART_SERVICE_PORT,
    changeOrigin: true,
    pathRewrite: {
        '^/api/cart': '/cart',
    },
});

const catalogServiceProxy = createProxyMiddleware({
    target: process.env.CATALOG_SERVICE_PORT,
    changeOrigin: true,
    pathRewrite: {
        '^/api/catalog': '/catalog',
    },
});

router.use('/users', userServiceProxy);
router.use('/cart', cartServiceProxy);
router.use('/catalog', catalogServiceProxy);

export default router;
