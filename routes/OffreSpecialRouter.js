const express = require( 'express' );
const router = express.Router();

const {
    createOffreSpecial,
    updateOffreSpecial,
    getOffreSpecial,
    deleteOffreSpecial
} = require( '../service/OffreSpecialService' );

router.post( '/:id', createOffreSpecial );
router.put( '/:id', updateOffreSpecial );
router.get( '/:page/:size', getOffreSpecial );
router.delete( '/:id', deleteOffreSpecial );

module.exports = router;