
// Swagger Options

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Leetcode API',
        version: '0.0.1',
        description: 'API for leetcode clone',
      },
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description: 'User ID',
              },
              name: {
                type: 'string',
                description: 'User name',
              },
              rating: {
                type: 'integer',
                description: 'User rating',
              },
              role: {
                type: 'string',
                description: 'User role',
              },
              permissions: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'User permissions',
              },
            },
            Task: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  description: 'User ID',
                },
                description: {
                  type: 'string',
                  description: 'Task description',
                },
                incoming_example: {
                  type: 'string',
                  description: 'Incoming example',
                },
                outgoing_example: {
                  type: 'string',
                  description: 'Outgoing example',
                },
                tags: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description: 'Tags',
                },
                additional_info: {
                  type: 'string',
                  description: 'Additional info',
                },
                score: {
                  type: 'integer',
                  description: 'Task score',
                },
                title: {
                  type: 'string',
                  description: 'Task title',
                },
                category: {
                  type: 'string',
                  description: 'Task category',
                },
              }
            },
        
        }
    }
}
    
},
    apis: ['./routes/rating.js', './routes/comments.js', './routes/solutions.js', './routes/tasks.js', './routes/users.js'], // путь к файлам, где находятся ваши маршруты
}

module.exports = swaggerOptions;