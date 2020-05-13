import { Express } from 'express'
import express from 'express'
import { routes } from '../../routes'
import { database } from '../models/index'
import { environment } from '../../config/environment'
var bodyParser = require('body-parser')
import cors from 'cors'
import { middlewareErro } from './error'
import * as dotenv from 'dotenv'
import * as admin from 'firebase-admin'
import fileUpload from 'express-fileupload'
var serviceAccount = require("../../../sigeros-68420-firebase-adminsdk-6h64o-54c218bcac.json");

dotenv.config()

export class App {
  private app: Express

  public constructor() {
    this.app = express()
  }

  public initApp = async () => {
    try {
      await this.initDatabase()
      this.initFirebase()
      this.app.use(cors())
      this.app.use(bodyParser.urlencoded({ extended: true }))
      this.app.use(bodyParser.json())
      this.app.use(fileUpload({useTempFiles : true,}))
      
      this.initRoutes()
      const server = this.app.listen(environment.port)
      console.log(server.address())
    } catch (error) {
      console.log(error)
    }
  }

  private initFirebase = () => {

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://sigeros-68420.firebaseio.com",
      storageBucket: "gs://sigeros-68420.appspot.com"
    });
  }

  private initRoutes = () => {
    try {
      this.app.use(routes)
      this.app.use(middlewareErro);
    } catch (error) {
      throw error
    }
  }

  private initDatabase = async () => {
    try {
      await database.authenticate()
    } catch (error) {
      throw error
    }
  }

}