import { NextFunction, Request, Response } from 'express';
import {Cart} from '../model/Cart'
import {Catalog} from '../model/Catalog'

const checkCartExist = (async (req: Request, res: Response, next: NextFunction) => {

    const {id} = req.params

    const findOneCart = await Cart.findById(id)
        
    findOneCart !== null ? next() : res.send({error : "Cart not found"}).status(404)
    
})

const checkMovieExist = (async (req: Request, res: Response, next: NextFunction) => {
    
    const {movieId} = req.params
    
    const findOneMovie = await Catalog.findById(movieId)
    
    findOneMovie !== null && findOneMovie !== undefined ? next() : res.send({error : "Catalog not found"}).status(404)
    
})

const checkMovieExistInCart = (async (req: Request, res: Response, next: NextFunction) => {
    
    const {id, movieId} = req.params
    
    const findOneCart = await Cart.findById(id)
    let array:Array<any> = []
    array.push(findOneCart?.movies)

    const exists = array[0].includes(movieId)

    exists !== true ? next() : res.json({error : 'Le film existe déjà dans votre panier'})
})

export {
    checkCartExist,
    checkMovieExist,
    checkMovieExistInCart
}