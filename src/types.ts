export type View = "home" | "map" | "game" | "profile" | "halt";

export interface Choice {
  id: string; // 'a', 'b', 'c', 'd'
  text: string;
}

export interface Question {
  id: string; // e.g., 'q1'
  text: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
}

export interface LevelData {
  title: string;
  questions: Question[];
}

export interface AnsweredQuestion {
  q: string;
  answers: { k: string; t: string }[];
  correctKey: string;
  expl: string;
  imageUrl: string;
}

export interface Badge {
  id: string;
  name: string;
  desc: string;
  icon: string;
  type: "beginner" | "advanced" | "special";
}

export interface World {
  id: number;
  name: string;
  levels: number[];
  theme: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  bgImage: string;
  desc: string;
  victoryImage: string;
}

export interface VideoData {
  title: string;
  url: string;
  desc: string;
}

export interface UserProfile {
  name: string;
  username: string;
  email: string;
  profilePhoto: string;
}

// Map: { levelId: score }
export type LevelScores = { [key: number]: number };
