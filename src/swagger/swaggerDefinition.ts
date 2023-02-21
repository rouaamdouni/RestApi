import swaggerJSDoc from 'swagger-jsdoc';
import {UserSchema} from '../models/user'
const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
          title: 'Rest Api',
          version: '1.0.0',
          description:
            'This is a REST API application made with Express typescript . It retrieves data from NoSQL Database (MongoDB) .'
        },
        servers: [
          {
            url: 'http://localhost:5050',
            description: 'Development server',
          },
        ],
        paths: {
            "/auth/register": {
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
                            // "$ref": "#/components/schemas/ExampleSchemaHeader"

                        }
                      }
                    }
                  },
                  "404": { "description": "Not found" },
                  "500": { "description": "Internal server error" }
                }
              }
            },
            "/auth/login": {
              "post": {
                "tags": ["ExampleEndpoints"],
                "summary": "Login ",
                "description": "Send email and password to the server and check if they are valid.",


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
                    "message":"user logged in successfully",
                    "token": "jwt_token",
                    "content": {
                      "application/json": {
                        "schema": {
                            // "$ref": "#/components/schemas/ExampleSchemaHeader"

                        }
                      }
                    }
                  },
                  "401": { "description": "Invalid Credentials" },
                  "500": { "description": "Internal server error" }
                }
              }
            },
            "/auth/forgotpassword": {
              "post": {
                "tags": ["ExampleEndpoints"],
                "summary": "Forgot password ",
                "description": " Generate a new resertPassword and send it to the user via email using sendinblue.",



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
                    "success": "true", 
                   "data":"Email Sent",
                   "messsage": `<h1> You have requested a password reset </h1>
                   <p> Please go to this link to reset your password </p>
                   <a href=<resetUrl> clicktracking=off><resetUrl>`,
                    "content": {
                      "application/json": {
                        "schema": {
                            // "$ref": "#/components/schemas/ExampleSchemaHeader"

                        }
                      }
                    }
                  },
                  "401": { "description": "email could not be sent" },
                  "500": { "description": "Internal server error" }
                }
              }
            },
            "/auth/resetpassword": {
              "post": {
                "tags": ["ExampleEndpoints"],
                "summary": "reset password token",
                "description": "Generate a reset password token and reset password expiration and save it in the database",
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
                    "success": "true",
                    "data":"Password Reset successful",
                    "content": {
                      "application/json": {
                        "schema": {
                            // "$ref": "#/components/schemas/ExampleSchemaHeader"

                        }
                      }
                    }
                  },
                  "400": { "description": "invalid reset Token" },
                  "500": { "description": "Internal server error" }
                }
              }
            },
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