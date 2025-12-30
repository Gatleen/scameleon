import { Trees, Waves, Mountain, AlertTriangle, Building2 } from "lucide-react";
import type { World, Badge, LevelData, AnsweredQuestion } from "../types";

import world1Json from "./world1-email_forest.json";
import world2Json from "./world2-sms_desert_dune.json";
import world3Json from "./world3-call_of_the_ocean.json";
import world4Json from "./world4-web_trap_jungle.json";
import world5Json from "./world5-social_scam_city.json";

// ==========================================
// ASSET IMPORTS (FIXED)
// ==========================================

// --- WORLD IMAGES ---
import world1Img from "../assets/QuizWorlds/world1-email_forest.png";
import world2Img from "../assets/QuizWorlds/world2-sms_desert_dune.png";
import world3Img from "../assets/QuizWorlds/world3-call_of_the_ocean.png";
import world4Img from "../assets/QuizWorlds/world4-web_trap_jungle.png";
import world5Img from "../assets/QuizWorlds/world5-social_scam_city.png";

// --- LEVEL IMAGES (BANNERS) ---
import level1 from "../assets/QuizBanners/Level1.png";
import level2 from "../assets/QuizBanners/Level2.png";
import level3 from "../assets/QuizBanners/Level3.png";
import level4 from "../assets/QuizBanners/Level4.png";
import level5 from "../assets/QuizBanners/Level5.png";
import level6 from "../assets/QuizBanners/Level6.png";
import level7 from "../assets/QuizBanners/Level7.png";
import level8 from "../assets/QuizBanners/Level8.png";
import level9 from "../assets/QuizBanners/Level9.png";
import level10 from "../assets/QuizBanners/Level10.png";
import level11 from "../assets/QuizBanners/Level11.png";
import level12 from "../assets/QuizBanners/Level12.png";
import level13 from "../assets/QuizBanners/Level13.png";
import level14 from "../assets/QuizBanners/Level14.png";
import level15 from "../assets/QuizBanners/Level15.png";
import level16 from "../assets/QuizBanners/Level16.png";
import level17 from "../assets/QuizBanners/Level17.png";
import level18 from "../assets/QuizBanners/Level18.png";
import level19 from "../assets/QuizBanners/Level19.png";
import level20 from "../assets/QuizBanners/Level20.png";

// --- WORLD VIDEOS (VILLAIN INTROS) ---
import world1Vid from "../assets/QuizWorlds/villianworld1-phishy_the_fish.mp4";
import world2Vid from "../assets/QuizWorlds/villianworld2-dusty_the_dune_worm.mp4";
import world3Vid from "../assets/QuizWorlds/villianworld3-claws_the_crab.mp4";
import world4Vid from "../assets/QuizWorlds/villianworld4-web_widow_the_spider.mp4";
import world5Vid from "../assets/QuizWorlds/villianworld5-svana_the_swan.mp4";

// --- VICTORY IMAGES (DEFEATED VILLAINS) ---
// Assuming these are in src/assets/DefeatedScamVillains/
import victory1 from "../assets/DefeatedScamVillains/PhishyTheFishDefeated.png";
import victory2 from "../assets/DefeatedScamVillains/DustyTheDuneWormDefeated.png";
import victory3 from "../assets/DefeatedScamVillains/ClawsTheCrabDefeated.png";
import victory4 from "../assets/DefeatedScamVillains/WebWidowtheDefeated.png";
import victory5 from "../assets/DefeatedScamVillains/SvanaTheSwanDefeated.png";

// --- BADGE ICONS ---
import badgeBug from "../assets/QuizBadges/BugSquasher.png";
import badgeDust from "../assets/QuizBadges/DustStormSurvivor.png";
import badgeEcho from "../assets/QuizBadges/EchoBreaker.png";
import badgeWeb from "../assets/QuizBadges/WebWarrior.png";
import badgeHeart from "../assets/QuizBadges/HeartProtector.png";
import badgeLives from "../assets/QuizBadges/NoLivesLost.png";
import badgeSharp from "../assets/QuizBadges/SharpEyed.png";
import badgeTerminator from "../assets/QuizBadges/ScamTerminator.png";

// ==========================================
// CONFIGURATION
// ==========================================

export const HEARTS_MAX = 3;
export const REFILL_TIME_MS = 3 * 60 * 60 * 1000; // 3 Hours
export const PASS_SCORE = 100; // Score needed to unlock next level
export const PLAYER_NAME = "Scam Hunter";

// --- Asset Paths Map ---
export const ASSET_PATHS = {
  WORLD_IMAGES: {
    1: world1Img,
    2: world2Img,
    3: world3Img,
    4: world4Img,
    5: world5Img,
  },
  LEVEL_IMAGES: {
    1: level1,
    2: level2,
    3: level3,
    4: level4,
    5: level5,
    6: level6,
    7: level7,
    8: level8,
    9: level9,
    10: level10,
    11: level11,
    12: level12,
    13: level13,
    14: level14,
    15: level15,
    16: level16,
    17: level17,
    18: level18,
    19: level19,
    20: level20,
  },
  WORLD_VIDEOS: {
    1: {
      title: "Welcome to the Email Forest!",
      url: world1Vid,
      desc: "Watch out for Phisy the Fish! The Email Forest is dense with deceit.",
    },
    2: {
      title: "Surviving the SMS Desert Dune",
      url: world2Vid,
      desc: "Urgency is the Dusty the Dune Worm's main weapon. Don't click that link in the hot sands!",
    },
    3: {
      title: "Will you answer the Call of the Ocean?",
      url: world3Vid,
      desc: "Claws the Crab uses fear and authority to pressure you. Hang up if he asks for sensitive info.",
    },
    4: {
      title: "Don't Fall for the Web Trap Jungle!",
      url: world4Vid,
      desc: "Fake websites and pop-ups are everywhere. Be careful of Web Widow the Spider!",
    },
    5: {
      title: "Get Entangled in Social Scam City",
      url: world5Vid,
      desc: "The city never sleeps, and neither does Svana the Swan. Be skeptical of strangers.",
    },
  },
};

export const WORLD_VIDEOS = ASSET_PATHS.WORLD_VIDEOS;

// --- BADGE DEFINITIONS ---
export const BADGES: Badge[] = [
  {
    id: "world1",
    name: "Bug Squasher",
    desc: "Complete World 1",
    icon: badgeBug,
    type: "beginner",
  },
  {
    id: "world2",
    name: "Dust Survivor",
    desc: "Complete World 2",
    icon: badgeDust,
    type: "beginner",
  },
  {
    id: "world3",
    name: "Echo Breaker",
    desc: "Complete World 3",
    icon: badgeEcho,
    type: "beginner",
  },
  {
    id: "world4",
    name: "Web Warrior",
    desc: "Finish World 4",
    icon: badgeWeb,
    type: "advanced",
  },
  {
    id: "heart_protector",
    name: "Heart Protector",
    desc: "Perfect score in Lvl 17",
    icon: badgeHeart,
    type: "advanced",
  },
  {
    id: "clean5",
    name: "No Lives Lost",
    desc: "Clear 5 levels without losing a heart",
    icon: badgeLives,
    type: "special",
  },
  {
    id: "sharp10",
    name: "Sharp-Eyed",
    desc: "Get 10 correct answers in a row",
    icon: badgeSharp,
    type: "special",
  },
  {
    id: "terminator",
    name: "Scam Terminator",
    desc: "Pass Level 20 with 3 stars",
    icon: badgeTerminator,
    type: "special",
  },
];

// --- WORLD DEFINITIONS ---
export const WORLDS: World[] = [
  {
    id: 1,
    name: "Email Forest",
    levels: [1, 2, 3, 4],
    theme: "emerald",
    icon: Trees,
    bgImage: ASSET_PATHS.WORLD_IMAGES[1],
    desc: "Bright, leafy world where scam emails hide.",
    victoryImage: victory1,
  },
  {
    id: 2,
    name: "SMS Desert Dunes",
    levels: [5, 6, 7, 8],
    theme: "orange",
    icon: Waves,
    bgImage: ASSET_PATHS.WORLD_IMAGES[2],
    desc: "Hot, sandy terrain where scam SMS blow in.",
    victoryImage: victory2,
  },
  {
    id: 3,
    name: "Call of the Ocean",
    levels: [9, 10, 11, 12],
    theme: "red",
    icon: Mountain,
    bgImage: ASSET_PATHS.WORLD_IMAGES[3],
    desc: "Echoing canyon where scam callers mimic voices.",
    victoryImage: victory3,
  },
  {
    id: 4,
    name: "Web Trap Jungle",
    levels: [13, 14, 15, 16],
    theme: "teal",
    icon: AlertTriangle,
    bgImage: ASSET_PATHS.WORLD_IMAGES[4],
    desc: "Thick jungle where fake sites lurk.",
    victoryImage: victory4,
  },
  {
    id: 5,
    name: "Social Scam City",
    levels: [17, 18, 19, 20],
    theme: "violet",
    icon: Building2,
    bgImage: ASSET_PATHS.WORLD_IMAGES[5],
    desc: "Neon city filled with social engineering traps.",
    victoryImage: victory5,
  },
];

// --- LEVEL TITLES ---
export const LEVEL_TITLES: { [key: number]: string } = {
  1: "Basics of Scam Emails",
  2: "Recognizing Suspicious Senders",
  3: "Fake Links & URLs",
  4: "Attachments & Malware",
  5: "SMS Warning Signs",
  6: "Urgent! Pressure Tactics",
  7: "Parcel/Delivery Scams",
  8: "Bank SMS Scams",
  9: "Common Scam Call Patterns",
  10: "Government Calls",
  11: "Tech Support Calls",
  12: "Investment / Crypto Calls",
  13: "Fake Shopping Sites",
  14: "Fake Login Pages",
  15: "Phishing Pop-ups",
  16: "Payment Red Flags",
  17: "Romance Scams",
  18: "Friend in Trouble",
  19: "Impersonation & Jobs",
  20: "Final Boss: Multi-Layered",
};

// --- RAW LEVEL DATA MAP ---
const RAW_LEVEL_DATA = [
  ...(world1Json.levels || []),
  ...(world2Json.levels || []),
  ...(world3Json.levels || []),
  ...(world4Json.levels || []),
  ...(world5Json.levels || []),
].reduce((acc: { [key: number]: LevelData }, level: any) => {
  const id = parseInt(level.levelId.split("-")[1], 10);
  acc[id] = {
    title: level.title,
    questions: level.questions,
  };
  return acc;
}, {});

// ==========================================
// QUESTION GENERATOR UTILITY
// ==========================================

export const getQuestions = (levelId: number): AnsweredQuestion[] => {
  const levelData = RAW_LEVEL_DATA[levelId];

  if (!levelData) {
    console.error(`Error: Level ID ${levelId} not found in RAW_LEVEL_DATA.`);
    return [];
  }

  return levelData.questions.map((q) => ({
    q: q.text,
    answers: q.choices.map((c: any) => ({ k: c.id, t: c.text })),
    correctKey: q.correctChoiceId,
    expl: q.explanation,
    // FIX: Using the mapped images from the top of the file
    imageUrl:
      ASSET_PATHS.LEVEL_IMAGES[
        levelId.toString() as unknown as keyof typeof ASSET_PATHS.LEVEL_IMAGES
      ],
  }));
};
