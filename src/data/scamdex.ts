// src/data/scamdex.ts

// --- IMPORT ICONS ---
import phisherIcon from "../assets/ScamdexIcons/ThePhisher.png";
import smishingIcon from "../assets/ScamdexIcons/Smishing.png";
import hiMumIcon from "../assets/ScamdexIcons/HiMumHiDad.png";
import taxIcon from "../assets/ScamdexIcons/TaxImpersonator.png";
import cloneIcon from "../assets/ScamdexIcons/SocialMediaCloning.png";
import pigIcon from "../assets/ScamdexIcons/PigButchering.png";
import pumpIcon from "../assets/ScamdexIcons/CryptoPumpDump.png";
import loanIcon from "../assets/ScamdexIcons/FakeLoan.png";
import lotteryIcon from "../assets/ScamdexIcons/LotteryPrize.png";
import phantomIcon from "../assets/ScamdexIcons/PhantomSeller.png";
import deliveryIcon from "../assets/ScamdexIcons/DeliveryFailure.png";
import techIcon from "../assets/ScamdexIcons/TechSupportFraud.png";
import subIcon from "../assets/ScamdexIcons/SubscriptionTraps.png";
import rentalIcon from "../assets/ScamdexIcons/RentalListings.png";
import ceoIcon from "../assets/ScamdexIcons/CEOFraud.png";
import jobIcon from "../assets/ScamdexIcons/JobRecruitement.png";
import quishingIcon from "../assets/ScamdexIcons/Quishing.png";
import romanceIcon from "../assets/ScamdexIcons/RomanceScam.png";
import charityIcon from "../assets/ScamdexIcons/CharityFraud.png";
import verifyIcon from "../assets/ScamdexIcons/VerificationCode.png";

export const scams = [
  // --- COMMUNICATION & IMPERSONATION ---
  {
    id: 1,
    name: "The Phisher",
    type: "Email",
    riskLevel: "High",
    description:
      "An email looking like it's from your bank, Netflix, or Microsoft asking you to 'verify' your account.",
    pixelIcon: phisherIcon, // Fixed
    redFlags: [
      "Urgent action required",
      "Generic greetings ('Dear Customer')",
      "Suspicious links/URLs",
    ],
  },
  {
    id: 2,
    name: "Smishing (SMS Phishing)",
    type: "SMS/Text",
    riskLevel: "High",
    description:
      "Text messages claiming you have a bank alert, a fine to pay, or a prize to claim.",
    pixelIcon: smishingIcon, // Fixed
    redFlags: [
      "Links in text messages",
      "Messages from random numbers",
      "Requests for personal info via reply",
    ],
  },
  {
    id: 3,
    name: "The 'Hi Mum/Dad' Scam",
    type: "WhatsApp/SMS",
    riskLevel: "Medium",
    description:
      "A message from an unknown number claiming to be your child who 'lost their phone' and needs money for a bill immediately.",
    pixelIcon: hiMumIcon, // Fixed
    redFlags: [
      "Urgent request for money",
      "Refusal to voice call",
      "New number claiming to be family",
    ],
  },
  {
    id: 4,
    name: "The Tax Impersonator",
    type: "Phone/Email",
    riskLevel: "High",
    description:
      "Someone claiming to be from the Tax Office (IRS/LHDN) saying you owe back taxes and face arrest unless you pay now.",
    pixelIcon: taxIcon, // Fixed
    redFlags: [
      "Threats of immediate arrest",
      "Demand for payment via Gift Cards or Crypto",
      "Aggressive tone",
    ],
  },
  {
    id: 5,
    name: "Social Media Cloning",
    type: "Social Media",
    riskLevel: "Medium",
    description:
      "A duplicate profile of a friend requests to add you, then asks for money or sends suspicious links.",
    pixelIcon: cloneIcon, // Fixed
    redFlags: [
      "Friend request from someone you are already friends with",
      "Poor grammar",
      "Immediate request for money",
    ],
  },

  // --- FINANCIAL & INVESTMENT ---
  {
    id: 6,
    name: "Pig Butchering",
    type: "Investment",
    riskLevel: "Critical",
    description:
      "A 'friend' you met online (often accidentally) builds trust over weeks before convincing you to invest in a fake crypto platform.",
    pixelIcon: pigIcon, // Fixed
    redFlags: [
      "Relationship moves from casual to financial",
      "Guaranteed high returns",
      "Pressure to use specific unknown apps",
    ],
  },
  {
    id: 7,
    name: "The Crypto Pump & Dump",
    type: "Investment",
    riskLevel: "Critical",
    description:
      "Online gurus promoting a 'new' cryptocurrency that skyrockets in value, only for them to sell and leave you with nothing.",
    pixelIcon: pumpIcon, // Fixed
    redFlags: [
      "Hype on social media",
      "Promises of 'the next Bitcoin'",
      "Anonymous developers",
    ],
  },
  {
    id: 8,
    name: "Fake Loan Offers",
    type: "Financial",
    riskLevel: "High",
    description:
      "Offers for loans with low interest rates regardless of credit score, but they require an 'upfront fee' first.",
    pixelIcon: loanIcon, // Fixed
    redFlags: [
      "Guaranteed approval",
      "Upfront fees via wire transfer",
      "Company has no physical address",
    ],
  },
  {
    id: 9,
    name: "Lottery & Prize Scams",
    type: "Email/Phone",
    riskLevel: "Medium",
    description:
      "You are told you won a contest (that you never entered) but must pay taxes or shipping fees to claim the prize.",
    pixelIcon: lotteryIcon, // Fixed
    redFlags: [
      "You didn't enter the contest",
      "You must pay to get the prize",
      "Time pressure to claim",
    ],
  },

  // --- SHOPPING & SERVICES ---
  {
    id: 10,
    name: "The Phantom Seller",
    type: "Marketplace",
    riskLevel: "Medium",
    description:
      "Items on Facebook Marketplace or Craigslist priced suspiciously low. The seller demands payment via Zelle/Friends & Family before shipping.",
    pixelIcon: phantomIcon, // Fixed
    redFlags: [
      "Refusal to meet in person",
      "Price is 'too good to be true'",
      "Refusal to use secure payment methods",
    ],
  },
  {
    id: 11,
    name: "Delivery Failure Scam",
    type: "SMS/Email",
    riskLevel: "High",
    description:
      "A text saying your package cannot be delivered due to an 'incomplete address' or 'unpaid fee', with a link to fix it.",
    pixelIcon: deliveryIcon, // Fixed
    redFlags: [
      "Link asks for credit card details for a tiny fee ($0.50)",
      "Generic carrier name",
      "You weren't expecting a package",
    ],
  },
  {
    id: 12,
    name: "Tech Support Fraud",
    type: "Browser/Phone",
    riskLevel: "High",
    description:
      "A loud pop-up on your computer says you have a virus and must call a 'Microsoft' number immediately.",
    pixelIcon: techIcon, // Fixed
    redFlags: [
      "Loud alarms or frozen screen",
      "Number connects to a call center",
      "Request for remote access to your PC",
    ],
  },
  {
    id: 13,
    name: "Subscription Traps",
    type: "Online Service",
    riskLevel: "Low",
    description:
      "A 'free trial' for a skin cream or gadget that quietly signs you up for an expensive monthly subscription.",
    pixelIcon: subIcon, // Fixed
    redFlags: [
      "Hidden terms and conditions",
      "Requirement for credit card on 'free' items",
      "Difficulty cancelling",
    ],
  },
  {
    id: 14,
    name: "Rental Listings",
    type: "Real Estate",
    riskLevel: "High",
    description:
      "A beautiful apartment listed for rent at a bargain price, but the 'landlord' is out of town and wants a deposit before you see it.",
    pixelIcon: rentalIcon, // Fixed
    redFlags: [
      "Cannot view the property inside",
      "Landlord is 'missionary' or 'abroad'",
      "Deposit required via wire transfer",
    ],
  },

  // --- WORKPLACE & MODERN TECH ---
  {
    id: 15,
    name: "CEO Fraud (BEC)",
    type: "Work Email",
    riskLevel: "High",
    description:
      "An email appearing to be from your boss asking you to buy gift cards for a 'client' or 'event' urgently.",
    pixelIcon: ceoIcon, // Fixed
    redFlags: [
      "Boss is allegedly 'in a meeting'",
      "Request for gift cards (iTunes/Amazon)",
      "Slightly altered email address",
    ],
  },
  {
    id: 16,
    name: "Job Recruitment Scam",
    type: "LinkedIn/Email",
    riskLevel: "High",
    description:
      "A too-easy work-from-home job offer. They send you a 'check' to buy home office equipment, which later bounces.",
    pixelIcon: jobIcon, // Fixed
    redFlags: [
      "Interview is via text/chat only",
      "You are sent money immediately",
      "High pay for very little work",
    ],
  },
  {
    id: 17,
    name: "Quishing (QR Phishing)",
    type: "Physical/Digital",
    riskLevel: "Medium",
    description:
      "Fake QR codes pasted over real ones on parking meters or menus, leading to a fake payment site.",
    pixelIcon: quishingIcon, // Fixed
    redFlags: [
      "QR code is a sticker over another code",
      "URL looks strange after scanning",
      "Site asks for sensitive login info",
    ],
  },
  {
    id: 18,
    name: "Romance Scam",
    type: "Dating Apps",
    riskLevel: "High",
    description:
      "Someone you met on a dating site professes love quickly but needs money for a plane ticket, surgery, or visa.",
    pixelIcon: romanceIcon, // Fixed
    redFlags: [
      "Professes love very fast",
      "Never available for video chat",
      "Always has a tragedy requiring money",
    ],
  },
  {
    id: 19,
    name: "Charity Fraud",
    type: "Email/Phone",
    riskLevel: "Medium",
    description:
      "Fake charities popping up after a real natural disaster (earthquake/flood) asking for donations via non-standard methods.",
    pixelIcon: charityIcon, // Fixed
    redFlags: [
      "High pressure to give now",
      "Donations via cash/crypto/gift card",
      "Name sounds similar to real charities",
    ],
  },
  {
    id: 20,
    name: "Verification Code Scam",
    type: "SMS/Call",
    riskLevel: "High",
    description:
      "A fraudster triggers a login to your account (like Google or WhatsApp) and asks you to read them the code sent to your phone.",
    pixelIcon: verifyIcon, // Fixed
    redFlags: [
      "'I sent a code to the wrong number'",
      "Unexpected verification texts",
      "Sharing 6-digit codes with anyone",
    ],
  },
];
