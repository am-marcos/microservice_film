import { Request, Response } from 'express';
import CatalogService from '../services/catalogService';

class CatalogController {
    // Créer un nouveau catalogue
    async createCatalog(req: Request, res: Response): Promise<void> {
        try {
            const catalog = await CatalogService.createCatalog(req.body);
            res.status(201).json(catalog);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la création du catalogue', error });
        }
    }

    // Récupérer un catalogue par ID
    async getCatalogById(req: Request, res: Response): Promise<void> {
        try {
            const catalog = await CatalogService.getCatalogById(req.params.id);
            if (catalog) {
                res.status(200).json(catalog);
            } else {
                res.status(404).json({ message: 'Catalogue non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération du catalogue', error });
        }
    }

    // Récupérer tous les catalogues
    async getAllCatalogs(req: Request, res: Response): Promise<void> {
        try {
            const catalogs = await CatalogService.getAllCatalogs();
            res.status(200).json(catalogs);
        } catch (error) {
            res.status(500).json({
                message: 'Erreur lors de la récupération des catalogues',
                error,
            });
        }
    }

    // Modifier un catalogue par ID
    async updateCatalog(req: Request, res: Response): Promise<void> {
        try {
            const catalog = await CatalogService.updateCatalog(req.params.id, req.body);
            if (catalog) {
                res.status(200).json(catalog);
            } else {
                res.status(404).json({ message: 'Catalogue non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la mise à jour du catalogue', error });
        }
    }

    // Supprimer un catalogue par ID
    async deleteCatalog(req: Request, res: Response): Promise<void> {
        try {
            const catalog = await CatalogService.deleteCatalog(req.params.id);
            if (catalog) {
                res.status(200).json({ message: 'Catalogue supprimé avec succès' });
            } else {
                res.status(404).json({ message: 'Catalogue non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression du catalogue', error });
        }
    }
}

export default new CatalogController();
