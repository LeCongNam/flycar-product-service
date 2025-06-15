export const ELASTICSEARCH_CONSTANTS = {
  INDEX: 'products',
  MODEL_NAME: 'Product',
  MAPPING: {
    properties: {
      id: { type: 'keyword' },
      name: { type: 'text', analyzer: 'standard' },
      description: { type: 'text', analyzer: 'standard' },
      price: { type: 'float' },
      stock: { type: 'integer' },
      images: { type: 'keyword' },
      thumbnail: { type: 'keyword' },
      categoryId: { type: 'keyword' },
      isActive: { type: 'boolean' },
    },
  },
};
