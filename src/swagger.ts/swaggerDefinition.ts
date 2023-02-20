import swaggerJSDoc from 'swagger-jsdoc';
import {UserSchema} from '../models/user'
const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
          title: 'Rest Api',
          version: '1.0.0',
          description:
            'This is a REST API application made with Express typescript . It retrieves data from NoSQL Database .'
        },
        servers: [
          {
            url: 'http://localhost:5050',
            description: 'Development server',
          },
        ],
        paths: {
            "/crud/register": {
              "post": {
                "tags": ["ExampleEndpoints"],
                "summary": "register a new user",
                "description": "Send a new user to the server and get save it in the data base.",
                "requestBody": {
                  "required": true,
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": `${UserSchema}`

                      }
                    }
                  }
                },
                responses: {
                  "201": {
                    "description": "Success",
                    "message":"user created successfully",
                    "content": {
                      "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/ExampleSchemaHeader"

                        }
                      }
                    }
                  },
                  "404": { "description": "Not found" },
                  "500": { "description": "Internal server error" }
                }
              }
            }
          },
          "components": {
            "schemas": {
              "ExampleSchemaBody": {
                "properties": {
                  "responseText": {
                    "type": "string",
                    "example": ""
                                
                
                  }
                }
              },
              "ExampleSchemaHeader": {
                "required": ["text"],
                "properties": {
                  "text": {
                    "type": "string",
                    "example": "This is some example string!"
                  }
                }
              }
            }
          }
        }
       
      ;
const options = {
  swaggerDefinition,
 // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.ts'],

}
const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;