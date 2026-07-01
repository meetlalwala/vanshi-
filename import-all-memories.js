const fs = require('fs');
const path = require('path');

const vanshiSrcDir = 'C:\\Users\\meetl\\Downloads\\vanshi';
const vaishnaviSrcDir = 'C:\\Users\\meetl\\.gemini\\antigravity-ide\\scratch\\vaishnavi-birthday';
const destDir = path.join(process.cwd(), 'public', 'uploads');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const dbPath = './data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Initialize memories array empty to rebuild cleanly
db.memories = [];

const vanshiFiles = fs.readdirSync(vanshiSrcDir);
const vanshiDescriptions = [
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

let vanshiDescIndex = 0;
const vanshiItems = [];

vanshiFiles.forEach((file) => {
  // Simple duplicate check for (1), (2), etc. in names
  const cleanName = file.replace(/\s*\(\d+\)\s*/g, '');
  if (cleanName !== file && vanshiFiles.includes(cleanName)) {
    return;
  }
  
  const srcPath = path.join(vanshiSrcDir, file);
  
  if (fs.statSync(srcPath).isFile()) {
    const ext = path.extname(file);
    const destName = `vanshi_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`;
    const destPath = path.join(destDir, destName);
    
    fs.copyFileSync(srcPath, destPath);
    
    const isVideo = ext.toLowerCase() === '.mp4';
    const currentDesc = vanshiDescriptions[vanshiDescIndex % vanshiDescriptions.length];
    vanshiDescIndex++;
    
    vanshiItems.push({
      id: "vanshi-" + Date.now() + "-" + Math.random().toString(36).substring(2, 5),
      title: isVideo ? "Moving Moment: " + currentDesc.title : currentDesc.title,
      description: currentDesc.desc,
      image: `/uploads/${destName}`,
      isVideo: isVideo
    });
  }
});

// Group vanshi items: videos first
const vanshiVideos = vanshiItems.filter(m => m.isVideo);
const vanshiImages = vanshiItems.filter(m => !m.isVideo);

// 2. Copy and Add 6 Chat images
const chatMemories = [
  { src: 'media__1782931749881.jpg', dest: 'pic1.jpg', title: 'Golden Hour Bliss', desc: 'That perfect afternoon where time stood still. The warm sun in our eyes and the gentle breeze made everything feel like a dream. Every moment with you is a treasure I hold close to my heart.' },
  { src: 'media__1782931749920.jpg', dest: 'pic2.jpg', title: 'Sunny Day Smiles', desc: 'A beautiful day made even brighter by your smile. Whether we are exploring new places or just standing still under the blue sky, my favorite place is always right by your side.' },
  { src: 'media__1782931774974.jpg', dest: 'pic3.jpg', title: 'Cruising Together', desc: 'Even the simplest car rides turn into the best adventures when I\'m with you. Watching the world go by with my favorite person makes every journey unforgettable.' },
  { src: 'media__1782931774981.jpg', dest: 'pic4.jpg', title: 'Looking Gorgeous', desc: 'Just a quick mirror selfie, but you always manage to take my breath away. Your effortless beauty shines through in every single moment.' },
  { src: 'media__1782931775009.jpg', dest: 'pic5.jpg', title: 'Tropical Love', desc: 'Surrounded by nature, but you\'re the only beautiful view I see. This day was perfectly captured with a heart, just like the one you hold of mine.' },
  { src: 'media__1782931775027.jpg', dest: 'pic6.jpg', title: 'My Pretty Flower', desc: 'With a delicate flower in your hair and that gorgeous smile, you light up my entire world. This is a memory I\'ll always keep close to my heart.' }
];

const brainDir = 'C:\\Users\\meetl\\.gemini\\antigravity-ide\\brain\\90de55e1-9906-498e-a3f9-072c30a30bba';
const chatItems = [];
chatMemories.forEach((item, index) => {
  const srcPath = path.join(brainDir, item.src);
  const destPath = path.join(destDir, item.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
  }
  chatItems.push({
    id: "chat-" + index + "-" + Date.now(),
    title: item.title,
    description: item.desc,
    image: "/uploads/" + item.dest
  });
});

// 3. Copy and Add 10 Vaishnavi photos
const vaishnaviItems = [];
for (let i = 1; i <= 10; i++) {
  const filename = `photo_${i}.jpg`;
  const srcPath = path.join(vaishnaviSrcDir, filename);
  if (fs.existsSync(srcPath)) {
    const destName = `vaishnavi_${i}.jpg`;
    const destPath = path.join(destDir, destName);
    fs.copyFileSync(srcPath, destPath);
    
    vaishnaviItems.push({
      id: "vaishnavi-" + i + "-" + Date.now(),
      title: `Vaishnavi's Memory #${i}`,
      description: "A beautiful celebration and a moment of pure joy. Looking back at this day always brings a warm smile to my face.",
      image: `/uploads/${destName}`
    });
  }
}

// Assemble all memories:
// Order: Vanshi Videos -> Chat Images -> Vanshi Images -> Vaishnavi Images
db.memories = [...vanshiVideos, ...chatItems, ...vanshiImages, ...vaishnaviItems];

// Strip the temporary 'isVideo' helper field
db.memories.forEach(m => delete m.isVideo);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("Successfully rebuilt database with all memories (Vanshi: " + vanshiItems.length + ", Chat: " + chatItems.length + ", Vaishnavi: " + vaishnaviItems.length + ")");
