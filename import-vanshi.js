const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\meetl\\.gemini\\antigravity-ide\\scratch\\vaishnavi-birthday';
const destDir = path.join(process.cwd(), 'public', 'uploads');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const dbPath = './data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
db.memories = []; // Clear existing memories

const newMemories = [];

for (let i = 1; i <= 10; i++) {
  const filename = `photo_${i}.jpg`;
  const srcPath = path.join(srcDir, filename);
  
  if (fs.existsSync(srcPath)) {
    const destName = `vanshi_${i}_${Date.now()}.jpg`;
    const destPath = path.join(destDir, destName);
    
    fs.copyFileSync(srcPath, destPath);
    
    newMemories.push({
      id: Date.now().toString() + "-" + i,
      title: `Sweet Memory #${i}`,
      description: "Another beautiful moment captured in time. Every day spent with you is a gift that I cherish deeply.",
      image: `/uploads/${destName}`
    });
  }
}

// Prepend to the timeline
db.memories = [...newMemories, ...db.memories];

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("Successfully imported " + newMemories.length + " photos from the vanshi folder.");
