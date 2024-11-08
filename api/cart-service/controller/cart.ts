import { NextFunction, Request, Response } from 'express';
import express from 'express'
const router = express.Router()
import { Cart } from '../model/Cart'
import { checkCartExist , checkMovieExist, checkMovieExistInCart } from '../middleware/cartMiddleware';


/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - user_id
 *         - movies
 *       properties:
 *         user_id:
 *           type: string
 *           description: A available user_id generated by MongoDB(mongoose)
 *         movies:
 *           type: Array<string>
 *           description: Array of all movies id added in the cart
 *       example:
 *         user_id: 6720e5a7d672d79b7ffrf458
 *         movies: ["6720e5a7d672d79b7ffrf458","6720e5a7d672d79b7ffrf455","6720e5a7d672d79b7ffrf758"]
 */       

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: The Carts managing API
 */

    // Récupérer le panier d'un user 

    /**
 * @swagger
 * /cart/{user_id}:
 *   get:
 *     summary: Returns one Cart by user_id
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: The list of the Cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
    */ 

    router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {

        const {id} = req.params

        try{
            const pannier = await Cart.findOne({user_id: id}).exec()
    
            res.json(pannier).status(200)
            
        } catch (err) {
            res.status(500).json({ error: err })
        }
    })

    /**
 * @swagger
 * /cart/{id}:
 *   post:
 *     summary: Create a users Cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         user_id: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user_id
 *     responses:
 *       200:
 *         description: The creation of users cart
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Problem in carts creation
    */

    // Création d'un panier selon un user_id 
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

    /**
 * @swagger
 * /cart/{id}/{movieId}:
 *   put:
 *     summary: Add a movie in the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         user_id: id
 *         movieId: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user_id and a movieId
 *     responses:
 *       200:
 *         description: The adding of a movie in the users cart
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Cart not found or movie not found
 *       409:
 *          description: Reesource already exist
    */

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

        /**
 * @swagger
 * /cart/{id}/{movieId}:
 *   delete:
 *     summary: Delete a movie in the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         user_id: id
 *         movieId: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The carts id and a movieId
 *     responses:
 *       200:
 *         description: The adding of a movie in the users cart
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Cart not found or movie not found
    */

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

export default router