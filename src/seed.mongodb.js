// Select the database to use.
use('greenThumb')

// db.createCollection('users')

db.users.drop()
db.users.insertMany([
    { name: 'John' },
    { name: 'David' }
])