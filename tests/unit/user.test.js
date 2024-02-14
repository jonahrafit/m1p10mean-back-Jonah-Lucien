const mongoose = require( "mongoose" );
const request = require( "supertest" );
const app = require( '../../app' );
require( "dotenv" ).config();
const reqAddUser = require( '../../utils/data' );

describe( "POST /auth/register", () => {
    test( "should create a user", async () => {
        return request( app )
            .post( "/auth/register" )
            .send( reqAddUser )
            .expect( 201 )
            .then( ( {
                body
            } ) => {
                console.log( body );
            } )
    } );
} );