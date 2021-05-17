import express from "express";
import * as AuthController from "../controllers/authController";
import * as MovieController from "../controllers/movieController";
import { userValidator } from "../validator/auth";
import verifyUser from "../middlewares/verifyUser";

const router = express.Router();

// Authentication Router
/**
 * @swagger
 * tags:
 *  name: Authentication
 * /api/auth/register:
 *  post:
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fullname:
 *                              type: string
 *                              default: Vu Cao Nguyen
 *                          birthday:
 *                              type: string
 *                              default: 07/10/2000
 *                          phone_number:
 *                              type: string
 *                              default: 0383188752
 *                          password:
 *                               type: string
 *                               default: 123456
 *                          email:
 *                                type: string
 *                                default: nguyenvux710@gmail.com
 *                          address:
 *                                type: string
 *                                default: 135B Tran Hung Dao, Q1, TP.HCM
 *                          status:
 *                                type: string
 *                                default: UNVERIFIED
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.post("/auth/register", userValidator, AuthController.register);
router.post("/auth/login", AuthController.login);
router.post("/auth/uploadImage", verifyUser, AuthController.uploadImage);
router.post("/auth/verifyEmail", AuthController.verifyEmail);

// Movie Router
router.get("/movies", MovieController.getAll);
router.post("/movies", MovieController.create);
router.get("/movies/:id", MovieController.getById);
router.put("/movies/:id", MovieController.update);
router.delete("/movies/:id", MovieController.deleted);

export default router;
