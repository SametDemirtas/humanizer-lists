import { createHash } from 'node:crypto';

/** Hex SHA-256 of a text in UTF-8, as stored in the corpus metadata files. */
export const sha256 = (text) => createHash('sha256').update(text, 'utf8').digest('hex');
