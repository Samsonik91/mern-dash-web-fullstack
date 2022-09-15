import {Router} from 'express'
import adController from "../controllers/adController.js"
import auth from '../middlewares/auth.js'

const router = new Router()

router.post('/createAd', auth, adController.createAd)
router.patch('/update/:id', auth, adController.updateAd)
router.delete('/:id', auth, adController.deleteAd)
router.get('/lastAds', adController.lastAds)
router.get('/getAd/:id', adController.getAd)
router.get('/getByCategory', adController.getAdsByCategory)
router.get('/search', adController.getAdsByTags)
router.get('/getOwnAds', adController.getOwnAds)
router.get('/getAuthorAds', adController.getAuthorAds)
router.get('/forconversation/:id', adController.getAdForConversation)
router.patch('/addFavorite', adController.addFavorite)
router.patch('/removeFavorite', adController.removeFavorite)
router.get('/getFavorites', adController.getFavorites)

export default router