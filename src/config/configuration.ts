import { snakeCase } from 'lodash';

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
    },
    api_key: process.env.API_KEY,
    app_key: process.env.APP_KEY,
    app_name: process.env.APP_NAME || 'NestJs',
    cookie_access_key: snakeCase('access_token_' + (process.env.COOKIE_ACCESS_KEY || process.env.APP_NAME || 'NestJs')),
    cookie_refresh_key: snakeCase(
        'refresh_token_' + (process.env.COOKIE_ACCESS_KEY || process.env.APP_NAME || 'NestJs'),
    ),
});
