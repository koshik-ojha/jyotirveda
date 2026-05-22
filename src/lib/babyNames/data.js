// Curated Vedic/Sanskrit-origin baby names. Each name carries its starting
// syllable (used for nakshatra-pada matching), gender, and meaning.
// Syllables follow the standard Vedic nakshatra mapping (108 padas).

export const NAMES = [
  // A / Aa — Krittika pada 1, Aries
  { name: "Aarav",   gender: "boy",  syllable: "A",   meaning: "Peaceful, calm" },
  { name: "Aditya",  gender: "boy",  syllable: "A",   meaning: "Sun, son of Aditi" },
  { name: "Arjun",   gender: "boy",  syllable: "A",   meaning: "Bright, shining; Pandava prince" },
  { name: "Akash",   gender: "boy",  syllable: "A",   meaning: "Sky, open space" },
  { name: "Anika",   gender: "girl", syllable: "A",   meaning: "Grace, brilliance" },
  { name: "Aanya",   gender: "girl", syllable: "A",   meaning: "Limitless, gracious" },
  { name: "Aarohi",  gender: "girl", syllable: "A",   meaning: "Rising melody, ascending" },
  // I / Ii
  { name: "Ishaan",  gender: "boy",  syllable: "I",   meaning: "Lord Shiva; ruler of the NE" },
  { name: "Ishan",   gender: "boy",  syllable: "I",   meaning: "Sun, bestower of wealth" },
  { name: "Ira",     gender: "girl", syllable: "I",   meaning: "Earth; Saraswati" },
  { name: "Ishita",  gender: "girl", syllable: "I",   meaning: "Desired, supreme" },
  // U
  { name: "Uday",    gender: "boy",  syllable: "U",   meaning: "Sunrise, dawn" },
  { name: "Utkarsh", gender: "boy",  syllable: "U",   meaning: "Advancement, excellence" },
  { name: "Urvi",    gender: "girl", syllable: "U",   meaning: "Earth" },
  // E
  { name: "Eshan",   gender: "boy",  syllable: "E",   meaning: "Desirer of wealth" },
  // O / Va — Rohini
  { name: "Om",      gender: "boy",  syllable: "O",   meaning: "Sacred primordial sound" },
  { name: "Vihaan",  gender: "boy",  syllable: "Vi",  meaning: "Dawn, morning" },
  { name: "Vivaan",  gender: "boy",  syllable: "Vi",  meaning: "Full of life" },
  { name: "Vansh",   gender: "boy",  syllable: "Va",  meaning: "Lineage, family" },
  { name: "Vedant",  gender: "boy",  syllable: "Ve",  meaning: "Knowledge of Vedas" },
  { name: "Veer",    gender: "boy",  syllable: "Ve",  meaning: "Brave, courageous" },
  { name: "Vaibhav", gender: "boy",  syllable: "Vai", meaning: "Glory, prosperity" },
  { name: "Vidya",   gender: "girl", syllable: "Vi",  meaning: "Knowledge" },
  { name: "Vaani",   gender: "girl", syllable: "Va",  meaning: "Speech, Saraswati" },
  // K — Mrigashira / Punarvasu
  { name: "Krishna", gender: "boy",  syllable: "Kr",  meaning: "Dark, attractive; Vishnu's avatar" },
  { name: "Karan",   gender: "boy",  syllable: "Ka",  meaning: "Skilful, instrument" },
  { name: "Kabir",   gender: "boy",  syllable: "Ka",  meaning: "Great, noble" },
  { name: "Kunal",   gender: "boy",  syllable: "Ku",  meaning: "Lotus, golden bird" },
  { name: "Kavya",   gender: "girl", syllable: "Ka",  meaning: "Poem, wise" },
  { name: "Kiara",   gender: "girl", syllable: "Ki",  meaning: "Dark-haired; first ray of sun" },
  { name: "Kavita",  gender: "girl", syllable: "Ka",  meaning: "Poetry" },
  { name: "Komal",   gender: "girl", syllable: "Ko",  meaning: "Tender, soft" },
  // H — Punarvasu
  { name: "Harsh",   gender: "boy",  syllable: "Ha",  meaning: "Joy, happiness" },
  { name: "Hridhaan",gender: "boy",  syllable: "Hri", meaning: "Heart, wealthy" },
  { name: "Hiren",   gender: "boy",  syllable: "Hi",  meaning: "Lord of diamonds" },
  { name: "Hema",    gender: "girl", syllable: "He",  meaning: "Gold, goddess Parvati" },
  { name: "Hetal",   gender: "girl", syllable: "He",  meaning: "Friendly, loving" },
  // D — Ashlesha / Cancer
  { name: "Dev",     gender: "boy",  syllable: "De",  meaning: "Divine, god" },
  { name: "Daksh",   gender: "boy",  syllable: "Da",  meaning: "Capable, son of Brahma" },
  { name: "Dhruv",   gender: "boy",  syllable: "Dh",  meaning: "Pole star, steadfast" },
  { name: "Divij",   gender: "boy",  syllable: "Di",  meaning: "Heavenly, born of sky" },
  { name: "Dhriti",  gender: "girl", syllable: "Dh",  meaning: "Courage, patience" },
  { name: "Diya",    gender: "girl", syllable: "Di",  meaning: "Lamp, light" },
  { name: "Disha",   gender: "girl", syllable: "Di",  meaning: "Direction, guidance" },
  // M — Magha / Leo
  { name: "Mihir",   gender: "boy",  syllable: "Mi",  meaning: "Sun, ray of light" },
  { name: "Mohan",   gender: "boy",  syllable: "Mo",  meaning: "Charming, Krishna" },
  { name: "Manas",   gender: "boy",  syllable: "Ma",  meaning: "Mind, intellect" },
  { name: "Meera",   gender: "girl", syllable: "Me",  meaning: "Devotee of Krishna" },
  { name: "Mahi",    gender: "girl", syllable: "Ma",  meaning: "Earth, great" },
  { name: "Maya",    gender: "girl", syllable: "Ma",  meaning: "Illusion, magic" },
  { name: "Myra",    gender: "girl", syllable: "My",  meaning: "Beloved, admirable" },
  // T — P.Phalguni / Leo
  { name: "Tanish",  gender: "boy",  syllable: "Ta",  meaning: "Ambition, lord of gold" },
  { name: "Tushar",  gender: "boy",  syllable: "Tu",  meaning: "Snow, cool" },
  { name: "Tarun",   gender: "boy",  syllable: "Ta",  meaning: "Young, fresh" },
  { name: "Tanya",   gender: "girl", syllable: "Ta",  meaning: "Daughter, fairy princess" },
  { name: "Trisha",  gender: "girl", syllable: "Tr",  meaning: "Desire, thirst" },
  { name: "Tara",    gender: "girl", syllable: "Ta",  meaning: "Star" },
  // P / Pa — U.Phalguni / Virgo
  { name: "Parth",   gender: "boy",  syllable: "Pa",  meaning: "Arjuna; prince" },
  { name: "Pranav",  gender: "boy",  syllable: "Pr",  meaning: "Sacred syllable Om" },
  { name: "Priyansh",gender: "boy",  syllable: "Pr",  meaning: "Loved part of someone" },
  { name: "Priya",   gender: "girl", syllable: "Pr",  meaning: "Beloved" },
  { name: "Pari",    gender: "girl", syllable: "Pa",  meaning: "Fairy, angel" },
  { name: "Pooja",   gender: "girl", syllable: "Po",  meaning: "Worship, prayer" },
  // N — Hasta / Virgo / Anuradha
  { name: "Nakul",   gender: "boy",  syllable: "Na",  meaning: "Most handsome; Pandava" },
  { name: "Nihal",   gender: "boy",  syllable: "Ni",  meaning: "Blissful, content" },
  { name: "Naveen",  gender: "boy",  syllable: "Na",  meaning: "New, fresh" },
  { name: "Nisha",   gender: "girl", syllable: "Ni",  meaning: "Night" },
  { name: "Naina",   gender: "girl", syllable: "Na",  meaning: "Eyes" },
  { name: "Navya",   gender: "girl", syllable: "Na",  meaning: "Young, ever new" },
  // Sha / Sh — Hasta, Shatabhisha
  { name: "Shaurya", gender: "boy",  syllable: "Sha", meaning: "Bravery, valour" },
  { name: "Shivansh",gender: "boy",  syllable: "Shi", meaning: "Part of Lord Shiva" },
  { name: "Shanaya", gender: "girl", syllable: "Sha", meaning: "First ray of sun" },
  { name: "Shreya",  gender: "girl", syllable: "Sh",  meaning: "Auspicious, beautiful" },
  // R — Chitra / Libra
  { name: "Rohan",   gender: "boy",  syllable: "Ro",  meaning: "Ascending, blooming" },
  { name: "Rudra",   gender: "boy",  syllable: "Ru",  meaning: "Lord Shiva, fierce" },
  { name: "Reyansh", gender: "boy",  syllable: "Re",  meaning: "Ray of light" },
  { name: "Ridhima", gender: "girl", syllable: "Ri",  meaning: "Lucky, sound of music" },
  { name: "Riya",    gender: "girl", syllable: "Ri",  meaning: "Singer, graceful" },
  { name: "Rashi",   gender: "girl", syllable: "Ra",  meaning: "Zodiac, collection" },
  // Y / Ya — Jyeshtha
  { name: "Yash",    gender: "boy",  syllable: "Ya",  meaning: "Fame, glory" },
  { name: "Yuvraj",  gender: "boy",  syllable: "Yu",  meaning: "Crown prince" },
  { name: "Yogi",    gender: "boy",  syllable: "Yo",  meaning: "Saint, ascetic" },
  { name: "Yamini",  gender: "girl", syllable: "Ya",  meaning: "Night" },
  { name: "Yashika", gender: "girl", syllable: "Ya",  meaning: "Famous, successful" },
  // B / Bha — Mula / Sagittarius
  { name: "Bhuvan",  gender: "boy",  syllable: "Bhu", meaning: "Earth, world" },
  { name: "Bharat",  gender: "boy",  syllable: "Bha", meaning: "India; one who bears" },
  { name: "Bhavik",  gender: "boy",  syllable: "Bha", meaning: "Pious, devoted" },
  { name: "Bhavya",  gender: "girl", syllable: "Bha", meaning: "Grand, magnificent" },
  // J — Capricorn
  { name: "Jay",     gender: "boy",  syllable: "Ja",  meaning: "Victory" },
  { name: "Jignesh", gender: "boy",  syllable: "Ji",  meaning: "Intellectual curiosity" },
  { name: "Jeevan",  gender: "boy",  syllable: "Je",  meaning: "Life" },
  { name: "Janvi",   gender: "girl", syllable: "Ja",  meaning: "Daughter of Janak; Sita" },
  { name: "Jiya",    gender: "girl", syllable: "Ji",  meaning: "Heart, sweetheart" },
  // G — Dhanishta / Aquarius
  { name: "Ganesh",  gender: "boy",  syllable: "Ga",  meaning: "Lord Ganesha" },
  { name: "Gaurav",  gender: "boy",  syllable: "Ga",  meaning: "Pride, honour" },
  { name: "Girish",  gender: "boy",  syllable: "Gi",  meaning: "Lord of mountains; Shiva" },
  { name: "Gauri",   gender: "girl", syllable: "Ga",  meaning: "Fair; goddess Parvati" },
  { name: "Gargi",   gender: "girl", syllable: "Ga",  meaning: "Ancient woman scholar" },
  // S — Shatabhisha / Aquarius
  { name: "Sahil",   gender: "boy",  syllable: "Sa",  meaning: "Shore, guide" },
  { name: "Saurav",  gender: "boy",  syllable: "Sau", meaning: "Pleasant, fragrance" },
  { name: "Siddharth",gender: "boy", syllable: "Si",  meaning: "Accomplished; Buddha" },
  { name: "Sumit",   gender: "boy",  syllable: "Su",  meaning: "Well-measured, well-friend" },
  { name: "Saanvi",  gender: "girl", syllable: "Sa",  meaning: "Goddess Lakshmi" },
  { name: "Siya",    gender: "girl", syllable: "Si",  meaning: "Sita, Lakshmi" },
  { name: "Suhana",  gender: "girl", syllable: "Su",  meaning: "Pleasant, beautiful" },
  // Cha / Chi — Revati / Pisces
  { name: "Chirag",  gender: "boy",  syllable: "Chi", meaning: "Lamp, light" },
  { name: "Chinmay", gender: "boy",  syllable: "Chi", meaning: "Blissful, full of consciousness" },
  { name: "Charvi",  gender: "girl", syllable: "Ch",  meaning: "Beautiful woman" },
  // Da / Di — Pushya / Revati
  { name: "Darsh",   gender: "boy",  syllable: "Da",  meaning: "To see, sight" },
  { name: "Devansh", gender: "boy",  syllable: "De",  meaning: "Part of God" },
  { name: "Dia",     gender: "girl", syllable: "Di",  meaning: "Light, lamp" },
  // L — Aries (Le, Lo)
  { name: "Lakshya", gender: "boy",  syllable: "La",  meaning: "Aim, target" },
  { name: "Laksh",   gender: "boy",  syllable: "La",  meaning: "Aim; lakh" },
  { name: "Lavanya", gender: "girl", syllable: "La",  meaning: "Grace, beauty" },
  // Misc
  { name: "Aayush",  gender: "boy",  syllable: "A",   meaning: "Long life" },
  { name: "Ansh",    gender: "boy",  syllable: "A",   meaning: "Part, portion" },
  { name: "Atharv",  gender: "boy",  syllable: "A",   meaning: "Lord Ganesha; knowledge" },
  { name: "Avani",   gender: "girl", syllable: "A",   meaning: "Earth" },
];

// Rashi → letters mapping (standard Vedic association by Moon sign syllables).
export const RASHI_LETTERS = {
  Aries:       ["A", "L"],
  Taurus:      ["B", "V", "U"],
  Gemini:      ["K", "Ch", "Gh"],
  Cancer:      ["D", "H"],
  Leo:         ["M", "T"],
  Virgo:       ["P", "Th", "N"],
  Libra:       ["R", "T"],
  Scorpio:     ["N", "Y"],
  Sagittarius: ["B", "Dh", "Ph"],
  Capricorn:   ["Kh", "J"],
  Aquarius:    ["G", "S", "Sh"],
  Pisces:      ["D", "Ch", "Th"],
};
