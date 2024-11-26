/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nom de l'utilisateur
 *         email:
 *           type: string
 *           description: Email de l'utilisateur
 *         password:
 *           type: string
 *           description: Mot de passe de l'utilisateur
 *         status:
 *           type: string
 *           description: Statut de l'abonnement de l'utilisateur
 *       example:
 *         name: John Doe
 *         email: johndoe@example.com
 *         password: password123
 *         status: active
 */