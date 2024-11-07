import { NextFunction, Request, Response } from 'express';
import express from 'express'
const router = express.Router()
import { Cart } from '../model/Cart'
import { checkCartExist , checkMovieExist, checkMovieExistInCart } from '../middleware/cartMiddleware';


    // Récupérer le panier d'un user 

    router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {

        const {id} = req.params

        try{
            const pannier = await Cart.findOne({user_id: id}).exec()
    
            res.json(pannier).status(200)
            
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
    
    // Ajouter un film dans le panier d'un user
    
    router.put('/:id/:movieId',checkCartExist, checkMovieExist, checkMovieExistInCart, async(req: Request, res: Response, next: NextFunction) => {

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

    // Supprimer un film dans le panier d'un user 
    router.delete('/:id/:movieId', checkCartExist, checkMovieExist, async(req: Request, res: Response, next: NextFunction) => {

        const {id, movieId} = req.params
        
        try{

            const findOneCart = await Cart.findById(id)
            let fill: Array<any> = []
            fill.push(findOneCart?.movies)
            const data = fill[0].filter((e: string) => e!.toString() !== movieId.toString())

            await Cart.findByIdAndUpdate(
                {_id : id},
                {movies : data}
            ).exec()
            
            res.json(findOneCart).status(200)

        }catch(err){
            res.json(err).status(500)
        }

    })

module.exports = router