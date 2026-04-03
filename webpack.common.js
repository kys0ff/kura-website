import { resolve } from 'path';

export const entry = {
    app: './ts/app.ts',
};
export const output = {
    path: resolve(__dirname, 'dist'),
    clean: true,
    filename: './ts/app.ts',
};
