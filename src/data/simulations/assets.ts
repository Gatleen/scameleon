// --- AUDIO IMPORTS ---
import correctSound from "../../assets/sounds/Ding.mp3";
import popSound from "../../assets/sounds/WindowsError.mp3";
import ringtoneSound from "../../assets/sounds/CellphoneRinging.mp3";
import msgSentSound from "../../assets/sounds/OutgoingWhatsAppText.mp3";
import msgReceivedSound from "../../assets/sounds/IncomingWhatsAppText.mp3";

// Bank Scripts
import mbIntro from "../../assets/sounds/MBAutomatedMessage.mp3";
import mbUnauth from "../../assets/sounds/MBDavid-1.mp3";
import mbVerify from "../../assets/sounds/MBDavid-3.mp3";
import mbWarning from "../../assets/sounds/MBDavid-2.mp3";

// Romance Scripts
import dennyVoice from "../../assets/sounds/Denny-1.mp3";

// --- IMAGE IMPORTS ---
import iphoneImg from "../../assets/iPhone15.jpg";
import shopLogo from "../../assets/ShopLogo.jpg";
import maybankLogo from "../../assets/Logos/MaybankLogo.png";
import dennyImg from "../../assets/Denny.png";

export const ASSETS = {
  // Audio placeholders
  correct: correctSound,
  pop_sound: popSound,
  ringtone: ringtoneSound,
  msg_sent: msgSentSound,
  msg_received: msgReceivedSound,

  bank_scripts: {
    intro: mbIntro,
    unauth_login: mbUnauth,
    verify_id: mbVerify,
    final_warning: mbWarning,
  },

  romance: {
    voice_msg: dennyVoice,
  },

  // Image placeholders
  iphone: iphoneImg,
  shop_profile: shopLogo,
  maybank_logo: maybankLogo,
  romance_img: dennyImg,
};
