
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
        Solution: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Solution ID',
            },
            task_id: {
              type: 'integer',
              description: 'Task ID',
            },
            user_id: {
              type: 'integer',
              description: 'Task ID',
            },
            solution: {
              type: 'string',
              description: 'Solution',
            },
          },
        },
        Comment: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Comment ID',
            },
            task_id: {
              type: 'integer',
              description: 'Task ID',
            },
            user_id: {
              type: 'integer',
              description: 'User ID',
            },
            comment: {
              type: 'string',
              description: 'Comment',
            },
          },
        },
        Rating: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Rating ID',
            },
            task_id: {
              type: 'integer',
              description: 'Task ID',
            },
            user_id: {
              type: 'integer',
              description: 'User ID',
            },
            rating: {
              type: 'integer',
              description: 'Rating',
            },
          },
        },

    }
}
    
},
    apis: ['./routes/rating.ts', './routes/comments.ts', './routes/solutions.ts', './routes/tasks.ts', './routes/users.ts'], // путь к файлам, где находятся ваши маршруты
}

export default swaggerOptions;