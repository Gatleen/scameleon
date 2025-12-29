import { ASSETS } from "./assets";

export const ROMANCE_SCRIPT: any = {
  start: {
    choices: [
      {
        label: "It’s okay, who are you trying to reach?",
        next: "intro_A",
        sys: null,
      },
      {
        label: "Wrong number, take care.",
        next: "end_safe_early",
        sys: "You ended the chat. Safest option.",
      },
      {
        label: "Support volunteer? Are you okay?",
        next: "intro_B",
        sys: null,
      },
    ],
  },
  intro_A: {
    response:
      "A friend of mine shared a cellphone number with me, to talk to someone, I’ve been going through a rough time recently. I must’ve mixed up the digits and accidentally texted you instead. I’m Denny, by the way, I work for the US Army.",
    choices: [
      {
        label:
          "Hi Denny, that’s cool! I’m [Name]. I’m sorry. Do you want to talk about it?",
        next: "tragic_story",
        needsName: true,
      },
    ],
  },
  intro_B: {
    response:
      "Yeah.. I haven’t been doing well lately, I’m currently deployed overseas, I work for the US Army. I just needed someone to talk to for a bit. I’m Denny, by the way.",
    choices: [
      {
        label:
          "Hey there Denny, I’m [Name]. That’s very interesting, would you like to talk to me about the things you are dealing with?",
        next: "tragic_story",
        needsName: true,
      },
    ],
  },
  tragic_story: {
    response: (name: string) =>
      `Nice to meet you, ${name}. Thank you, you are so kind. It just gets a little lonely sometimes, I don’t have anyone to talk to back home. My parents died in a car accident when I was in college. I’m an only child. And friends, well… they all move on with their own lives at some point right?`,
    choices: [
      {
        label:
          "Oh my, I am so sorry to hear that, I hope you are doing alright now. What made you join the army?",
        next: "army_reason",
      },
    ],
  },
  army_reason: {
    response:
      "After my parents’ death, I found it very difficult to cope with college, so I ended up dropping out. I started to get involved with the wrong friends, abused substances. I eventually seeked help, but I was unable to find a job due to my carelessness, which led me to join the army. I wanted to feel like I still could be a part of something.",
    choices: [
      {
        label:
          "Don’t worry, everybody makes mistakes. I think you’re pretty brave for taking this step in life, most people these days would just give up.",
        next: "flattery",
      },
    ],
  },
  flattery: {
    response:
      "Thanks, I appreciate it. Hey, you know, you have such a calming way of texting. It’s so nice, I feel like I can have a normal conversation with you.",
    choices: [{ label: "Oh Denny, you are too kind.", next: "meet_up" }],
  },
  meet_up: {
    response:
      "No, really, I mean it. If I ever make it home… I’d love to meet you.",
    timeJump: "2 Weeks Later",
    nextAuto: "love_bombing", // Automatically triggers next phase
  },
  love_bombing: {
    media: [
      { type: "audio", content: ASSETS.romance.voice_msg },
      { type: "image", content: ASSETS.romance_img },
    ],
    choices: [
      {
        label: "That’s sweet of you Denny, let’s do a video call soon?",
        next: "no_video",
      },
    ],
  },
  no_video: {
    response:
      "I can’t do video calls from here, security reasons and poor connection. Sorry love, I hope you understand. We can text all you want though, anything for the best girl in the world.",
    timeJump: "1 Month Later",
    nextAuto: "the_ask",
  },
  the_ask: {
    response:
      "Sweetheart… I am in a small predicament. I don’t know what to do… I need to send my personal belongings back home. The base won’t let me access my military account right now. Can you help me with a small fee of $3000?",
    choices: [
      {
        label: "I don’t think I should send money, my love.",
        next: "guilt_trip",
      },
      { label: "Can you provide details or proof, Denny?", next: "excuses" },
      {
        label: "This seems suspicious, I am reporting you.",
        next: "end_safe_late",
        sys: "You survived the scam! You identified the red flags.",
      },
    ],
  },
  guilt_trip: {
    response:
      "Please… I’ve opened up to you. Don’t be like everyone else. You are the only one that can help me here, I am begging you, dear.",
    choices: [
      {
        label: "Okay, I will send you the sum of money.",
        next: "end_scammed",
        isLongPress: true,
      },
    ],
  },
  excuses: {
    response:
      "I don’t have the documents on me right now dear, but I promise I will pay you back as soon as I get this sorted.",
    choices: [
      {
        label: "Okay, I will send you the sum of money.",
        next: "end_scammed",
        isLongPress: true,
      },
    ],
  },
  end_scammed: {
    isEnd: true,
    result: "SCAMMED",
    msg: 'You lost $3000. Romance scammers build trust over weeks or months ("Love Bombing") before inventing a crisis to ask for money. They often claim to be overseas (military, oil rig) to avoid meeting.',
  },
  end_safe_early: {
    isEnd: true,
    result: "SAFE",
    msg: 'Good job ending it early. Scammers often start with "wrong number" to initiate conversation.',
  },
  end_safe_late: {
    isEnd: true,
    result: "SURVIVED",
    msg: "Great job! You recognized the request for money as a red flag, despite the emotional connection.",
  },
};
