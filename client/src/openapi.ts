/* eslint-disable import/no-extraneous-dependencies */
import openapiTS from 'openapi-typescript';
import fs from 'node:fs';
import path from 'node:path';
import { assert } from './utils';

// @see https://github.com/drwpow/openapi-typescript/issues/1214#issuecomment-1957965890
(async function generateScheme() {
  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

  assert(baseUrl, 'REACT_APP_SERVER_BASE_URL이 비어있음');

  const url = `${baseUrl}/v3/api-docs `;

  const ast = await openapiTS(url, {
    transform(schemaObject, metadata) {
      if (schemaObject.format === 'binary') {
        if (metadata.path.endsWith('multipart/form-data') || metadata.path.endsWith('application/json')) {
          return schemaObject.nullable ? 'File | null' : 'File';
        }
        if (metadata.path.endsWith('application/octet-stream')) {
          return schemaObject.nullable ? 'Blob | null' : 'Blob';
        }
      }
      return undefined;
    },
  });

  await fs.promises.writeFile(path.join(__dirname, 'features', '@api', 'scheme.ts'), ast);

  // eslint-disable-next-line no-console
  console.log('🚀 openapi.ts: Done!');
})();
