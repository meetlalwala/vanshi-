const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\meetl\\Downloads\\vanshi';
const destDir = path.join(process.cwd(), 'public', 'uploads');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const dbPath = './data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Clear existing memories to ensure we don't mix Vaishnavi or older memories
db.memories = [];

const files = fs.readdirSync(srcDir);
const newMemories = [];

const descriptions = [
  { title: "My Favorite View", desc: "No matter where we are, my eyes always find their way back to you. You are my favorite view in the whole world." },
  { title: "Pure Happiness", desc: "The sound of your laughter is my favorite song. Thank you for bringing so much light and joy into my life." },
  { title: "Hand in Hand", desc: "Holding your hand makes me feel like I can conquer the world. I want to walk through all of life's paths right beside you." },
  { title: "Stolen Glances", desc: "I catch myself smiling just looking at you when you aren't paying attention. You have my whole heart." },
  { title: "Warm Embraces", desc: "In your arms is the safest, warmest place in the universe. I never want to let you go." },
  { title: "Sweet Escape", desc: "Every moment spent with you feels like a beautiful escape from the rest of the world." },
  { title: "Endless Love", desc: "My love for you grows stronger with every passing second. You are my today, my tomorrow, and my forever." },
  { title: "A Perfect Day", desc: "Any day spent with you is instantly a perfect day. You make the ordinary feel absolutely extraordinary." },
  { title: "Together Forever", desc: "No distance or time can change how much you mean to me. We are written in the stars." },
  { title: "Your Beautiful Smile", desc: "Your smile has the power to brighten even the darkest of days. Never stop smiling, my love." },
  { title: "Making Memories", desc: "Collecting beautiful moments with you is my favorite hobby. Here is to a lifetime of more memories." },
  { title: "My Safe Haven", desc: "You are my peace, my home, and my safe haven. Being with you is all I'll ever need." },
  { title: "Our Secret World", desc: "We have our own little world of inside jokes and sweet glances, and I wouldn't trade it for anything." },
  { title: "Heart to Heart", desc: "Our hearts speak the same language. I am so incredibly lucky to have you in my life." },
  { title: "Cherished Moments", desc: "Every single second with you is a memory I will cherish for the rest of my days." },
  { title: "My Whole World", desc: "You are the center of my universe. Thank you for being my constant source of love and support." },
  { title: "Laughter and Love", desc: "With you, life is full of laughter, silliness, and the deepest love I have ever known." },
  { title: "True Connection", desc: "What we share is rare and beautiful. I will protect and nurture our bond forever." },
  { title: "My Sweetheart", desc: "You are the sweetest part of my life. I love you more than words could ever express." },
  { title: "Brightening My Life", desc: "You walked into my life and made everything so much brighter, softer, and more beautiful." }
];

let descIndex = 0;

files.forEach((file) => {
  // Simple duplicate check for (1), (2), etc. in names
  const cleanName = file.replace(/\s*\(\d+\)\s*/g, '');
  if (cleanName !== file && files.includes(cleanName)) {
    console.log("Skipping duplicate: " + file);
    return;
  }
  
  const srcPath = path.join(srcDir, file);
  
  if (fs.statSync(srcPath).isFile()) {
    const ext = path.extname(file);
    const destName = `vanshi_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`;
    const destPath = path.join(destDir, destName);
    
    fs.copyFileSync(srcPath, destPath);
    
    const isVideo = ext.toLowerCase() === '.mp4';
    const currentDesc = descriptions[descIndex % descriptions.length];
    descIndex++;
    
    newMemories.push({
      id: Date.now().toString() + "-" + Math.random().toString(36).substring(2, 5),
      title: isVideo ? "Moving Moment: " + currentDesc.title : currentDesc.title,
      description: currentDesc.desc,
      image: `/uploads/${destName}`
    });
  }
});

// Group videos at the top
const videos = newMemories.filter(m => m.image.toLowerCase().endsWith('.mp4'));
const images = newMemories.filter(m => !m.image.toLowerCase().endsWith('.mp4'));

db.memories = [...videos, ...images];

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("Successfully imported " + db.memories.length + " real Vanshi memories (including " + videos.length + " videos)!");
