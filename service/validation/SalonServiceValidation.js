const Joi = require( 'joi' );

const PostServiceSchema = Joi.object( {
    nom: Joi.string().required(),
    prix: Joi.number().required(),
    duree: Joi.number().required(),
    commission: Joi.number().required()
} );

const PutServiceSchema = Joi.object( {
    nom: Joi.string(),
    prix: Joi.number().min( 1 ),
    duree: Joi.number().min( 1 ),
    commission: Joi.number()
} );

const pathParamsSchema = Joi.object( {
    page: Joi.number().integer().min( 1 ).required(),
    size: Joi.number().integer().min( 2 ).required()
} );


module.exports = {
    PostServiceSchema,
    PutServiceSchema,
    pathParamsSchema
};