// src/data/reportLinks.ts

// --- LOGO IMPORTS ---
// Ensure these match your filename cases exactly!
import nsrcLogo from "../assets/Logos/NSRCLogo.png";
import pdrmLogo from "../assets/Logos/PDRMLogo.png";
import mcmcLogo from "../assets/Logos/MCMCLogo.png";
import maybankLogo from "../assets/Logos/MaybankLogo.png";
import cimbLogo from "../assets/Logos/CIMBLogo.png";
import publicBankLogo from "../assets/Logos/PublicBankLogo.png";
import kpdnLogo from "../assets/Logos/KPDNLogo.jpg";

export type ReportLink = {
  name: string;
  description: string;
  link: string;
  hotline?: string;
  scamTypes: string[];
  urgent?: boolean;
  image?: string;
};

/* ================================
   NATIONAL & LAW ENFORCEMENT
   ================================ */

export const nationalAuthorities: ReportLink[] = [
  {
    name: "National Scam Response Centre",
    description:
      "Malaysia’s central response centre. Contact immediately if money was transferred.",
    link: "https://nfcc.jpm.gov.my/index.php/en/about-nsrc",
    hotline: "997",
    scamTypes: ["Bank transfer", "E-wallet", "Investment", "Impersonation"],
    urgent: true,
    image: nsrcLogo, // Fixed
  },
  {
    name: "Royal Malaysia Police (PDRM)",
    description:
      "Report cybercrime and fraud cases for official investigation and police reports.",
    link: "https://semakmule.rmp.gov.my/",
    hotline: "999",
    scamTypes: ["Online fraud", "Identity theft", "Romance scam"],
    image: pdrmLogo, // Fixed
  },
];

/* ================================
   COMMUNICATIONS & ONLINE PLATFORMS
   ================================ */

export const communicationsAuthorities: ReportLink[] = [
  {
    name: "MCMC (SKMM)",
    description:
      "Report scams involving phone calls, SMS, WhatsApp, or fake ads.",
    link: "https://aduan.mcmc.gov.my",
    hotline: "1800-188-030",
    scamTypes: ["SMS scam", "Phone call", "Fake ads"],
    image: mcmcLogo, // Fixed
  },
];

/* ================================
   BANKS & FINANCIAL INSTITUTIONS
   ================================ */

export const banks: ReportLink[] = [
  {
    name: "Maybank",
    description:
      "Contact immediately if your Maybank account or MAE wallet is affected.",
    link: "https://www.maybank2u.com.my/maybank2u/malaysia/en/personal/frequent_queries/scam-awareness/report-scam.page",
    hotline: "1-300-88-6688",
    scamTypes: ["Bank transfer", "Credit card", "E-wallet"],
    urgent: true,
    image: maybankLogo, // Fixed
  },
  {
    name: "CIMB Bank",
    description:
      "Report suspicious transactions or phishing attempts related to CIMB.",
    link: "https://www.cimb.com.my/en/personal/help-support/customer-help-centre.html",
    hotline: "+603-6204 7788",
    scamTypes: ["Phishing", "Unauthorized transactions"],
    urgent: true,
    image: cimbLogo, // Fixed
  },
  {
    name: "Public Bank",
    description:
      "Get support for scams involving Public Bank accounts or cards.",
    link: "https://www.pbebank.com/en/digital-banking/pbe-online-banking/report-fraud/",
    hotline: "03-2179 9999",
    scamTypes: ["Bank transfer", "Card fraud"],
    urgent: true,
    image: publicBankLogo, // Fixed
  },
];

/* ================================
   CONSUMER & MARKETPLACE SCAMS
   ================================ */

export const consumerProtection: ReportLink[] = [
  {
    name: "KPDN (Ministry of Domestic Trade)",
    description:
      "Report fake sellers, online shopping scams, or deceptive business.",
    link: "https://eaduan.kpdn.gov.my",
    scamTypes: ["Online shopping", "Fake seller"],
    image: kpdnLogo, // Fixed
  },
];
