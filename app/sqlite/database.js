const Sqlite = require('nativescript-sqlite');

// Función para abrir o crear la base de datos
const openDatabase = async () => {
  return new Promise((resolve, reject) => {
    new Sqlite('mydatabase.db', (err, db) => {
      if (err) {
        reject(err);
      } else {
        console.log("open ",db)
        resolve(db);
      }
    });
  });
};

/* init() {
  (new Sqlite("my.db")).then(db => {
      db.execSQL("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)").then(id => {
          context.commit("init", { database: db })
      }, error => {
          console.log("CREATE TABLE ERROR", error)
      });
  }, error => {
      console.log("OPEN DB ERROR", error)
  })
} */

/* async function createTable(){
  const sqlite = await new Sqlite("my.db")
  let database = await sqlite.execSQL("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)")
  console.log("juan piña ",database)
} */

// Función para crear la tabla
const createTable = async () => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    db.execSQL('CREATE TABLE IF NOT EXISTS mytable (id INTEGER PRIMARY KEY, name TEXT)', [], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

/* async function openDatabase(){
    try {
      const database = await Sqlite('mydatabase.db')
      console.log('()=> ',database)
    } catch (error) {
      console.log('error db: ',error)
    }

} */

module.exports = {
  createTable
}
