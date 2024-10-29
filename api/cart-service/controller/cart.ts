import { NextFunction, Request, Response } from 'express';
import express from 'express'
const router = express.Router()
import {Cart} from '../model/Cart'


    // Récupérer le panier d'un user 

    router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {

        const {id} = req.params

        try{
            const pannier = await Cart.findOne({user_id: id}).exec()
    
            res.json(pannier)
            
        } catch (err) {
            res.status(500).json({ error: err })
        }
    })

    // Ajouter un article au panier d'un user 
    router.post('/:id', async (req: Request, res: Response, next: NextFunction) => {
        const {id} = req.params

    })

    // Supprimer un article dans le panier d'un user 
    router.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
        const {id} = req.params

    })

module.exports(router)