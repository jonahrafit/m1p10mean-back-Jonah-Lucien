const Joi = require( 'joi' );


const pathParamsSchema = Joi.object( {
    page: Joi.number().integer().min( 1 ).required(),
    size: Joi.number().integer().min( 10 ).required()
} );


module.exports = {
    pathParamsSchema
};