import { Trees, Waves, Mountain, AlertTriangle, Building2 } from "lucide-react";
import type { World, Badge, LevelData, AnsweredQuestion } from "../types";

import world1Json from "./world1-email_forest.json";
import world2Json from "./world2-sms_desert_dune.json";
import world3Json from "./world3-call_of_the_ocean.json";
import world4Json from "./world4-web_trap_jungle.json";
import world5Json from "./world5-social_scam_city.json";

// ==========================================
// CONFIGURATION
// ==========================================

export const HEARTS_MAX = 3;
export const REFILL_TIME_MS = 3 * 60 * 60 * 1000; // 3 Hours
export const PASS_SCORE = 100; // Score needed to unlock next level
export const PLAYER_NAME = "Scam Hunter";

// --- Asset Paths ---
export const ASSET_PATHS = {
  WORLD_IMAGES: {
    1: "src/assets/QuizWorlds/world1-email_forest.png",
    2: "src/assets/QuizWorlds/world2-sms_desert_dune.png",
    3: "src/assets/QuizWorlds/world3-call_of_the_ocean.png",
    4: "src/assets/QuizWorlds/world4-web_trap_jungle.png",
    5: "src/assets/QuizWorlds/world5-social_scam_city.png",
  },
  LEVEL_IMAGES: {
    1: "src/assets/QuizBanners/Level1.png",
    2: "src/assets/QuizBanners/Level2.png",
    3: "src/assets/QuizBanners/Level3.png",
    4: "src/assets/QuizBanners/Level4.png",
    5: "src/assets/QuizBanners/Level5.png",
    6: "src/assets/QuizBanners/Level6.png",
    7: "src/assets/QuizBanners/Level7.png",
    8: "src/assets/QuizBanners/Level8.png",
    9: "src/assets/QuizBanners/Level9.png",
    10: "src/assets/QuizBanners/Level10.png",
    11: "src/assets/QuizBanners/Level11.png",
    12: "src/assets/QuizBanners/Level12.png",
    13: "src/assets/QuizBanners/Level13.png",
    14: "src/assets/QuizBanners/Level14.png",
    15: "src/assets/QuizBanners/Level15.png",
    16: "src/assets/QuizBanners/Level16.png",
    17: "src/assets/QuizBanners/Level17.png",
    18: "src/assets/QuizBanners/Level18.png",
    19: "src/assets/QuizBanners/Level19.png",
    20: "src/assets/QuizBanners/Level20.png",
  },
  // Using paths relative to your project's public directory
  WORLD_VIDEOS: {
    1: {
      title: "Welcome to the Email Forest!",
      url: "src/assets/QuizWorlds/villianworld1-phishy_the_fish.mp4",
      desc: "Watch out for typos and fake sender names! The Email Forest is dense with deceit.",
    },
    2: {
      title: "Surviving the SMS Desert Dune",
      url: "src/assets/QuizWorlds/villianworld2-dusty_the_dune_worm.mp4",
      desc: "Urgency is the SMS scammer's main weapon. Don't click that link in the hot sands!",
    },
    3: {
      title: "Will you answer the Call of the Ocean?",
      url: "src/assets/QuizWorlds/villianworld3-claws_the_crab.mp4",
      desc: "Scam callers use fear and authority to pressure you. Hang up if they ask for sensitive info.",
    },
    4: {
      title: "Don't Fall for the Web Trap Jungle!",
      url: "src/assets/QuizWorlds/villianworld4-web_widow_the_spider.mp4",
      desc: "Fake websites and pop-ups are everywhere. Verify the URL bar before logging in!",
    },
    5: {
      title: "Get Entangled in Social Scam City",
      url: "src/assets/QuizWorlds/villianworld5-svana_the_swan.mp4",
      desc: "The city never sleeps, and neither do the romance and job scammers. Be skeptical of strangers.",
    },
  },
};

export const WORLD_VIDEOS = ASSET_PATHS.WORLD_VIDEOS;
// --- BADGE DEFINITIONS (Omitted for brevity) ---
export const BADGES: Badge[] = [
  {
    id: "world1",
    name: "Bug Squasher",
    desc: "Complete World 1",
    icon: "src/assets/QuizBadges/BugSquasher.png",
    type: "beginner",
  },
  {
    id: "world2",
    name: "Dust Survivor",
    desc: "Complete World 2",
    icon: "src/assets/QuizBadges/DustStormSurvivor.png",
    type: "beginner",
  },
  {
    id: "world3",
    name: "Echo Breaker",
    desc: "Complete World 3",
    icon: "src/assets/QuizBadges/EchoBreaker.png",
    type: "beginner",
  },
  {
    id: "world4",
    name: "Web Warrior",
    desc: "Finish World 4",
    icon: "src/assets/QuizBadges/WebWarrior.png",
    type: "advanced",
  },
  {
    id: "heart_protector",
    name: "Heart Protector",
    desc: "Perfect score in Lvl 17",
    icon: "src/assets/QuizBadges/HeartProtector.png",
    type: "advanced",
  },
  {
    id: "clean5",
    name: "No Lives Lost",
    desc: "Clear 5 levels without losing a heart",
    icon: "src/assets/QuizBadges/NoLivesLost.png",
    type: "special",
  },
  {
    id: "sharp10",
    name: "Sharp-Eyed",
    desc: "Get 10 correct answers in a row",
    icon: "src/assets/QuizBadges/SharpEyed.png",
    type: "special",
  },
  {
    id: "terminator",
    name: "Scam Terminator",
    desc: "Pass Level 20 with 3 stars",
    icon: "src/assets/QuizBadges/ScamTerminator.png",
    type: "special",
  },
];

// --- WORLD DEFINITIONS (Omitted for brevity) ---
export const WORLDS: World[] = [
  {
    id: 1,
    name: "Email Forest",
    levels: [1, 2, 3, 4],
    theme: "emerald",
    icon: Trees,
    bgImage: ASSET_PATHS.WORLD_IMAGES[1],
    desc: "Bright, leafy world where scam emails hide.",
    victoryImage: "./DefeatedScamVillains/PhishyTheFishDefeated.png",
  },
  {
    id: 2,
    name: "SMS Desert Dunes",
    levels: [5, 6, 7, 8],
    theme: "orange",
    icon: Waves,
    bgImage: ASSET_PATHS.WORLD_IMAGES[2],
    desc: "Hot, sandy terrain where scam SMS blow in.",
    victoryImage: "./DefeatedScamVillains/DustyTheDuneWormDefeated.png",
  },
  {
    id: 3,
    name: "Call of the Ocean",
    levels: [9, 10, 11, 12],
    theme: "red",
    icon: Mountain,
    bgImage: ASSET_PATHS.WORLD_IMAGES[3],
    desc: "Echoing canyon where scam callers mimic voices.",
    victoryImage: "./DefeatedScamVillains/ClawsTheCrabDefeated.png",
  },
  {
    id: 4,
    name: "Web Trap Jungle",
    levels: [13, 14, 15, 16],
    theme: "teal",
    icon: AlertTriangle,
    bgImage: ASSET_PATHS.WORLD_IMAGES[4],
    desc: "Thick jungle where fake sites lurk.",
    victoryImage: "./DefeatedScamVillains/WebWidowtheDefeated.png",
  },
  {
    id: 5,
    name: "Social Scam City",
    levels: [17, 18, 19, 20],
    theme: "violet",
    icon: Building2,
    bgImage: ASSET_PATHS.WORLD_IMAGES[5],
    desc: "Neon city filled with social engineering traps.",
    victoryImage: "./DefeatedScamVillains/SvanaTheSwanDefeated.png",
  },
];

// --- LEVEL TITLES (Omitted for brevity) ---
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

// --- RAW LEVEL DATA MAP (Built from imported JSONs) ---
// This map uses the numeric level ID as the key and merges all questions.
const RAW_LEVEL_DATA = [
  ...(world1Json.levels || []),
  ...(world2Json.levels || []),
  ...(world3Json.levels || []),
  ...(world4Json.levels || []),
  ...(world5Json.levels || []),
].reduce((acc: { [key: number]: LevelData }, level: any) => {
  // Assuming levelId is like "level-1" or "level-13"
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
    // FIX: Convert levelId (number) to string to correctly index LEVEL_IMAGES
    imageUrl:
      ASSET_PATHS.LEVEL_IMAGES[
        levelId.toString() as unknown as keyof typeof ASSET_PATHS.LEVEL_IMAGES
      ],
  }));
};
