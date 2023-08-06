const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite',
  },
  useNullAsDefault: true,
})

module.exports = knex

const createTable = async () => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('site')
    table.string('email')
    table.string('nickname')
    table.string('description')
    table.string('date')
  })
}

const insertUser = async (user) => {
  createTable()
  // clearTable()
  await knex('users').insert(user)
}

const getUsers = async () => {
  const users = await knex.select().from('users')
  return users
}

const clearTable = async () => {
  try {
    // await knex('users').del() - очищает
    // await knex.schema.dropTableIfExists('users') - удаляет
  } catch (error) {
    console.error(error)
  } finally {
    knex.destroy()
  }
}

module.exports = {
  createTable,
  insertUser,
  getUsers,
  clearTable,
}
