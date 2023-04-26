const yaml = require('yamljs');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const components = yaml.load('./swagger/components.yaml');
const getProducts = yaml.load('./swagger/get_products.yaml');
const getProductById = yaml.load('./swagger/get_productbyid.yaml');
const postProduct = yaml.load('./swagger/post_product.yaml');
const putProductById = yaml.load('./swagger/put_productbyid.yaml');
const deleteProductById = yaml.load('./swagger/delete_productbyid.yaml');

function swaggerInit(appInstance) {
  const allSwagger = {
    ...components,
    paths: {
      ...getProducts,
      ...getProductById,
      ...postProduct,
      ...putProductById,
      ...deleteProductById,
    },
  };

  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Order API',
        version: '1.0.0',
        description: 'An API to manage orders',
      },
      servers: [
        {
          url: `http://localhost:4000`,
        },
      ],
      ...allSwagger, // Use the merged Swagger documentation object
    },
    apis: [], // No need to specify the APIs here, as we are providing the documentation directly in the definition
  };

  const specs = swaggerJsdoc(swaggerOptions);
  appInstance.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = swaggerInit;
