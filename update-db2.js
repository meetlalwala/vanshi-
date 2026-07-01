const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\meetl\\.gemini\\antigravity-ide\\brain\\90de55e1-9906-498e-a3f9-072c30a30bba';
const destDir = path.join(process.cwd(), 'public', 'uploads');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const filesToCopy = [
  { src: 'media__1782931749881.jpg', dest: 'pic1.jpg', title: 'Golden Hour Bliss', desc: 'That perfect afternoon where time stood still. The warm sun in our eyes and the gentle breeze made everything feel like a dream. Every moment with you is a treasure I hold close to my heart.' },
  { src: 'media__1782931749920.jpg', dest: 'pic2.jpg', title: 'Sunny Day Smiles', desc: 'A beautiful day made even brighter by your smile. Whether we are exploring new places or just standing still under the blue sky, my favorite place is always right by your side.' },
  { src: 'media__1782931774974.jpg', dest: 'pic3.jpg', title: 'Cruising Together', desc: 'Even the simplest car rides turn into the best adventures when I\'m with you. Watching the world go by with my favorite person makes every journey unforgettable.' },
  { src: 'media__1782931774981.jpg', dest: 'pic4.jpg', title: 'Looking Gorgeous', desc: 'Just a quick mirror selfie, but you always manage to take my breath away. Your effortless beauty shines through in every single moment.' },
  { src: 'media__1782931775009.jpg', dest: 'pic5.jpg', title: 'Tropical Love', desc: 'Surrounded by nature, but you\'re the only beautiful view I see. This day was perfectly captured with a heart, just like the one you hold of mine.' },
  { src: 'media__1782931775027.jpg', dest: 'pic6.jpg', title: 'My Pretty Flower', desc: 'With a delicate flower in your hair and that gorgeous smile, you light up my entire world. This is a memory I\'ll always keep close to my heart.' }
];

const dbPath = './data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
if (!db.memories) db.memories = [];

const newMemories = [];

filesToCopy.forEach((item, index) => {
  const srcPath = path.join(srcDir, item.src);
  const destPath = path.join(destDir, item.dest);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    newMemories.push({
      id: Date.now().toString() + "-" + index,
      title: item.title,
      description: item.desc,
      image: '/uploads/' + item.dest
    });
  }
});

// Add new memories to the beginning (reverse so the first one stays first)
db.memories = [...newMemories, ...db.memories];

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("Successfully added " + newMemories.length + " memories!");
