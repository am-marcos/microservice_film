import { Router } from 'express';
import CatalogController from '../controllers/catalogController';

const router = Router();

/**
 * @swagger
 * /api/catalogs:
 *   post:
 *     summary: Créer un nouveau catalogue
 *     tags: [Catalogues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catalog'
 *     responses:
 *       201:
 *         description: Catalogue créé avec succès
 *       500:
 *         description: Erreur lors de la création du catalogue
 */
router.post('/catalogs', CatalogController.createCatalog);

/**
 * @swagger
 * /api/catalogs/{id}:
 *   get:
 *     summary: Récupérer un catalogue par ID
 *     tags: [Catalogues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du catalogue
 *     responses:
 *       200:
 *         description: Catalogue récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catalog'
 *       404:
 *         description: Catalogue non trouvé
 *       500:
 *         description: Erreur lors de la récupération du catalogue
 */
router.get('/catalogs/:id', CatalogController.getCatalogById);

/**
 * @swagger
 * /api/catalogs:
 *   get:
 *     summary: Récupérer tous les catalogues
 *     tags: [Catalogues]
 *     responses:
 *       200:
 *         description: Liste des catalogues récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Catalog'
 *       500:
 *         description: Erreur lors de la récupération des catalogues
 */
router.get('/catalogs', CatalogController.getAllCatalogs);

/**
 * @swagger
 * /api/catalogs/{id}:
 *   put:
 *     summary: Modifier un catalogue par ID
 *     tags: [Catalogues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du catalogue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catalog'
 *     responses:
 *       200:
 *         description: Catalogue mis à jour avec succès
 *       404:
 *         description: Catalogue non trouvé
 *       500:
 *         description: Erreur lors de la mise à jour du catalogue
 */
router.put('/catalogs/:id', CatalogController.updateCatalog);

/**
 * @swagger
 * /api/catalogs/{id}:
 *   delete:
 *     summary: Supprimer un catalogue par ID
 *     tags: [Catalogues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du catalogue
 *     responses:
 *       200:
 *         description: Catalogue supprimé avec succès
 *       404:
 *         description: Catalogue non trouvé
 *       500:
 *         description: Erreur lors de la suppression du catalogue
 */
router.delete('/catalogs/:id', CatalogController.deleteCatalog);

export default router;