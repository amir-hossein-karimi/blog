/**
 * @swagger
 *  /:
 *      get:
 *          tags: [test]
 *          summary: this is index
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: not found
 *          parameters:
 *              -   name: username
 *                  in: formData
 *                  description: enter a username
 *                  type: string
 *                  required: true
 */
