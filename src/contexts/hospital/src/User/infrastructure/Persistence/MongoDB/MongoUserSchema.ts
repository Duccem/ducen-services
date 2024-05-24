export const MongoUserSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['_id', 'name', 'email', 'password', 'role', 'birthDate', 'address', 'phoneNumber'],
    properties: {
      _id: { bsonType: 'objectId' },
      id: { bsonType: 'string' },
      name: {
        bsonType: 'object',
        properties: {
          firstName: { bsonType: 'string' },
          lastName: { bsonType: 'string' },
        },
      },
      email: { bsonType: 'string' },
      password: { bsonType: 'string' },
      role: { bsonType: 'string' },
      birthDate: { bsonType: 'date' },
      address: {
        bsonType: 'object',
        properties: {
          street: { bsonType: 'string' },
          city: { bsonType: 'string' },
          state: { bsonType: 'string' },
          zipCode: { bsonType: 'string' },
          coordinates: {
            bsonType: 'object',
            properties: {
              latitude: { bsonType: 'double' },
              longitude: { bsonType: 'double' },
            },
          },
        },
      },
      phoneNumber: { bsonType: 'string' },
      photo: { bsonType: 'string' },
      gender: { bsonType: 'string' },
      configuration: {
        bsonType: 'object',
        properties: {
          timezone: { bsonType: 'string' },
          lang: { bsonType: 'string' },
          theme: { bsonType: 'string' },
        },
      },
      devices: {
        bsonType: 'array',
        items: {
          bsonType: 'object',
          properties: {
            agent: { bsonType: 'string' },
            token: { bsonType: 'string' },
          },
        },
      },
      isActive: { bsonType: 'bool' },
      verificationCode: { bsonType: 'string' },
      createdAt: { bsonType: 'date' },
      updatedAt: { bsonType: 'date' },
    },
  },
};
