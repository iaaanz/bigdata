const bigdataConnection = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  },
  migrations: {
    directory: 'src/external/database/postgres/migrations',
  },
  seeds: {
    directory: 'src/external/database/postgres/seeds',
  },
};

const clippfacilConnection = {
  client: 'mysql',
  connection: {
    host: process.env.CLIPPFACIL_DB_HOST,
    database: process.env.CLIPPFACIL_DB_DATABASE,
    user: process.env.CLIPPFACIL_DB_USER,
    password: process.env.CLIPPFACIL_DB_PASSWORD,
    port: Number(process.env.CLIPPFACIL_DB_PORT),
  },
  migrations: {
    directory: 'src/external/database/postgres/migrations',
  },
};

const onUpdateTrigger = (table: string) => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `;

export { bigdataConnection, clippfacilConnection, onUpdateTrigger };
