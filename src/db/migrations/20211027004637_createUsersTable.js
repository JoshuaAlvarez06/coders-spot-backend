exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username');
      table.string('first_name')
      table.string('last_name')
      table.string('email').unique().notNullable();
      table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};