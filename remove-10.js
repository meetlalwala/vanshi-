const fs = require('fs');
const dbPath = './data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (db.memories && db.memories.length > 0) {
  const removed = db.memories.splice(0, 10);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log("Removed " + removed.length + " memories.");
} else {
  console.log("No memories to remove.");
}
