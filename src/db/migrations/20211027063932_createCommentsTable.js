exports.up = function(knex) {
  return knex.schema.createTable('comments', (table) => {
      table.increments('comment_id').primary();
      table.integer('post_id');
      table
        .foreign('post_id')
        .references('post_id')
        .inTable('posts')
        .onDelete('cascade');
      table.integer('user_id')
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table.text('comment_content');
      table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
