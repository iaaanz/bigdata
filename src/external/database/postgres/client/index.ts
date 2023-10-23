import knex from 'knex';
import { attachPaginate } from 'knex-paginate';
import * as pg from 'pg';
import * as config from '../../../../../knexfile';

const PG_NUMERIC_ID = 1700;
pg.types.setTypeParser(PG_NUMERIC_ID, parseFloat);

const knexClient = knex(config.bigdataConnection);

attachPaginate();

export { knexClient };
