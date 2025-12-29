import React from "react";

export type ScenarioType =
  | "HOME"
  | "ROMANCE_SCAM"
  | "INBOX_BLITZ"
  | "POPUP_ADS"
  | "SHOPPING_INVESTIGATOR"
  | "BANK_FRAUD_CALL";

export interface CallScriptNode {
  id: string;
  speaker: string;
  text: string;
  audio?: string;
  options: {
    label: string;
    nextId: string;
    score: number;
    feedback?: string;
  }[];
}

export interface EmailItem {
  id: number;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  profileImage?: string;
  body: React.ReactNode;
  isScam: boolean;
  explanation: string;
  type: "plain" | "brand" | "official";
  brandColor?: string;
  brandIcon?: React.ElementType;
}
