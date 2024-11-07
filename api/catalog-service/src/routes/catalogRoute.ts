import { Router } from 'express';
import CatalogController from '../controllers/catalogController';

const router = Router();

router.post('/catalogs', CatalogController.createCatalog);
router.get('/catalogs/:id', CatalogController.getCatalogById);
router.get('/catalogs', CatalogController.getAllCatalogs);
router.put('/catalogs/:id', CatalogController.updateCatalog);
router.delete('/catalogs/:id', CatalogController.deleteCatalog);

export default router;
