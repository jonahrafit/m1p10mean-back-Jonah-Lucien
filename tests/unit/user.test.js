const mongoose = require( "mongoose" );
const request = require( "supertest" );
const app = require( '../../app' );
require( "dotenv" ).config();
const reqAddUser = require( '../../utils/data' );

describe( "POST /auth/register", () => {
    it( "should create a user", async () => {
        const res = await request( app ).post( "/auth/register" ).send( reqAddUser );
        expect( res.statusCode ).toBe( 201 );
    } );
} );