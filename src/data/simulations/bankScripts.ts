import type { CallScriptNode } from "../../types/simulationTypes";
import { ASSETS } from "./assets";

export const CALL_SCRIPTS: Record<string, Record<string, CallScriptNode>> = {
  BANK: {
    start: {
      id: "start",
      speaker: "Maybank Security",
      text: "This is an automated security alert from Maybank. We have detected a suspicious login to your account from an iPhone 15 in Johor Bahru. If this was not you, press 1 immediately.",
      audio: ASSETS.bank_scripts.intro,
      options: [
        { label: "Press 1 to connect.", nextId: "operator_intro", score: 0 },
        {
          label: "Hang up.",
          nextId: "end_safe",
          score: 1,
          feedback: "Correct. Check your app directly.",
        },
      ],
    },
    operator_intro: {
      id: "operator_intro",
      speaker: "Officer David (Fraud Dept)",
      text: 'This is David from Maybank Fraud Response. We see a transaction of RM 4,500 pending for "Rolex Watches". Did you authorize this?',
      audio: ASSETS.bank_scripts.unauth_login,
      options: [
        { label: "No! I am in Singapore!", nextId: "panic_tactic", score: 0 },
        {
          label: "What is the transaction ID?",
          nextId: "deflection",
          score: 1,
        },
      ],
    },
    deflection: {
      id: "deflection",
      speaker: "Officer David",
      text: "Sir, the system is locking your funds as we speak. To stop the transfer, I need your NRIC number for verification right now.",
      audio: ASSETS.bank_scripts.verify_id,
      options: [
        {
          label: "Give NRIC.",
          nextId: "panic_tactic",
          score: -1,
          feedback: "Never share NRIC with incoming callers.",
        },
        { label: "I will go to a branch.", nextId: "end_safe", score: 1 },
      ],
    },
    panic_tactic: {
      id: "panic_tactic",
      speaker: "Officer David",
      text: "Okay, I am blocking it. I sent a 6-digit TAC to your mobile to reverse the funds. Read it to me so I can refund you.",
      audio: ASSETS.bank_scripts.final_warning,
      options: [
        {
          label: "Read the TAC.",
          nextId: "end_fail",
          score: -1,
          feedback: "NEVER share TAC/OTP. Bank staff never ask for it.",
        },
        {
          label: "Refuse and hang up.",
          nextId: "end_safe",
          score: 1,
          feedback: "Good catch.",
        },
      ],
    },
    end_safe: {
      id: "end_safe",
      speaker: "System",
      text: "Call Ended. You avoided the scam.",
      options: [],
    },
    end_fail: {
      id: "end_fail",
      speaker: "System",
      text: "Money stolen via TAC.",
      options: [],
    },
  },
};
