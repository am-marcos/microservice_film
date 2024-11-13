import Catalog from '../models/catalogModel';
import { ICatalog } from '../models/catalogModel';

class CatalogService {
    // creation d'un catalogue
    async createCatalog(catalogData: ICatalog): Promise<ICatalog> {
        const catalog = new Catalog(catalogData);
        return await catalog.save();
    }

    // Recuperer un catalogue par ID
    async getCatalogById(id: string): Promise<ICatalog | null> {
        return await Catalog.findById(id).exec();
    }

    // Recuperer tous les catalogues
    async getAllCatalogs(): Promise<ICatalog[]> {
        return await Catalog.find().exec();
    }

    // Modifier un catalogue par ID
    async updateCatalog(id: string, catalogData: Partial<ICatalog>): Promise<ICatalog | null> {
        return await Catalog.findByIdAndUpdate(id, catalogData, { new: true }).exec();
    }

    // Supprimer un catalogue par ID
    async deleteCatalog(id: string): Promise<ICatalog | null> {
        return await Catalog.findByIdAndDelete(id).exec();
    }
}

export default new CatalogService();
