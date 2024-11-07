import { NextFunction, Request, Response } from 'express';
import {Cart} from '../model/Cart'
import {Catalog} from '../model/Catalog'

const checkCartExist = (async (req: Request, res: Response, next: NextFunction) => {

    const {id} = req.params

    const findOneCart = await Cart.findById(id)

    console.log(findOneCart);
    

    findOneCart !== null ? next() : res.send({error : "Cart not found"}).status(404)
    
})

const checkMovieExist = (async (req: Request, res: Response, next: NextFunction) => {

    const {movieId} = req.params

    const findOneMovie = await Catalog.findById(movieId)

    findOneMovie !== null && findOneMovie !== undefined ? next() : res.send({error : "Catalog not found"}).status(404)
    
})

export {
    checkCartExist,
    checkMovieExist
}