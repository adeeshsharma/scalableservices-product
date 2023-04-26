const yaml = require('yamljs');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const components = yaml.load('./swagger/components.yaml');
const products = yaml.load('./swagger/products.yaml');

function swaggerInit(appInstance) {
  const allSwagger = {
    ...components,
    paths: {
      ...products,
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
          url: `http://localhost:${process.env.PORT ?? 4000}`,
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
