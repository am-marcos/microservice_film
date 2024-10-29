import { NextFunction, Request, Response } from 'express';
import express from 'express'
const router = express.Router()
import {Cart} from '../model/Cart'


    // Récupérer le panier d'un user 

    router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {

        const {id} = req.params

        try{
            const pannier = await Cart.findOne({user_id: id}).exec()
    
            res.json("Ok c'est GOOD")
            
        } catch (err) {
            res.status(500).json({ error: err })
        }
    })

    // Ajouter un article au panier d'un user 
    router.post('/:id', async (req: Request, res: Response, next: NextFunction) => {

        const {id} = req.params

        try{
            const createCart = await Cart.create({
                user_id : id,
                movies : []
            })

            const saveCart = await createCart.save()

            res.json(saveCart).status(200)
        } catch(err){
            res.json(err).status(500)
        }
        
    })
    
    // Modifier le panier d'un user
    
    router.put('/:id/:movieId', async(req: Request, res: Response, next: NextFunction) => {

        const {id, movieId} = req.params
        
        try{
            
            await Cart.findOneAndUpdate(
                {_id : id},
                {$push : {movies: movieId}}
            ).exec()
            
            const findOneCart = await Cart.findById(id)

            res.json(findOneCart).status(200)

        }catch(err){
            res.json(err).status(500)
        }
    })

    // Supprimer un article dans le panier d'un user 
    router.delete('/:id/:movieId', async(req: Request, res: Response, next: NextFunction) => {
        const {id, movieId} = req.params
        
        try{

            const findOneCart = await Cart.findById(id)
                        

            res.json(findOneCart).status(200)

        }catch(err){
            res.json(err).status(500)
        }

    })

module.exports = router