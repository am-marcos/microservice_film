import { Router } from 'express';
import CatalogController from '../controllers/catalogController';

const router = Router();

/**
 * @swagger
 * /api/catalogs:
 *   post:
 *     summary: Crée un nouveau film 
 *     tags: [Films]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catalog'
 *     responses:
 *       201:
 *         description: Film créé avec succès
 *       500:
 *         description: Film non créé
 */
router.post('/catalogs', CatalogController.createCatalog);

/**
 * @swagger
 * /api/catalogs/{id}:
 *   get:
 *     summary: Récupérer un film par ID
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du film
 *     responses:
 *       200:
 *         description: Film récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catalog'
 *       404:
 *         description: Film non trouvé
 *       500:
 *         description: Erreur lors de la récupération du film
 */
router.get('/catalogs/:id', CatalogController.getCatalogById);

/**
 * @swagger
 * /api/catalogs:
 *   get:
 *     summary: Récupérer tous les films
 *     tags: [Films]
 *     responses:
 *       200:
 *         description: Liste des films récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Catalog'
 *       500:
 *         description: Erreur lors de la récupération des films
 */
router.get('/catalogs', CatalogController.getAllCatalogs);

/**
 * @swagger
 * /api/catalogs/{id}:
 *   put:
 *     summary: Modifier un film par ID
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du film
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catalog'
 *     responses:
 *       200:
 *         description: Film mis à jour avec succès
 *       404:
 *         description: Film non trouvé
 *       500:
 *         description: Erreur lors de la mise à jour du film
 */
router.put('/catalogs/:id', CatalogController.updateCatalog);

/**
 * @swagger
 * /api/catalogs/{id}:
 *   delete:
 *     summary: Supprimer un film par ID
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du film
 *     responses:
 *       200:
 *         description: Film supprimé avec succès
 *       404:
 *         description: film non trouvé
 *       500:
 *         description: Erreur lors de la suppression du film
 */
router.delete('/catalogs/:id', CatalogController.deleteCatalog);

export default router;