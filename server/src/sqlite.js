const db = require('better-sqlite3')('db/data.sqlite');

db.prepare('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)').run();