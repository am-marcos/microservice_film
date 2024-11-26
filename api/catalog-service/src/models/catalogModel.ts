import mongoose, { Document, Schema } from 'mongoose';

// Interface pour le document catalog
interface ICatalog extends Document {
    picture: string;
    title: string;
    summary: string;
    release_date: Date;
    author: string;
    duration: number;
    genre: string;
}

// Schéma pour le modèle Catalog
const CatalogSchema: Schema = new Schema({
    picture: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    release_date: { type: Date, required: true },
    author: { type: String, required: true },
    duration: { type: Number, required: true },
    genre: { type: String, required: true }, // Genre est une chaîne de caractères
});

const Catalog = mongoose.model<ICatalog>('Catalog', CatalogSchema);

export default Catalog;
export { ICatalog };
