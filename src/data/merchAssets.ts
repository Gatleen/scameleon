// src/data/merchAssets.ts

// --- TUMBLER ---
import tumbler1 from "../assets/ScameleonMerch/Tumbler-1.png";
import tumbler2 from "../assets/ScameleonMerch/Tumbler-2.png";
import tumbler3 from "../assets/ScameleonMerch/Tumbler-3.png";

// --- PILLOW ---
import pillow1 from "../assets/ScameleonMerch/Pillow-1.png";

// --- PHONE CASE ---
import phoneCase1 from "../assets/ScameleonMerch/PhoneCase-1.png";

// --- HOODIE ---
import hoodie1 from "../assets/ScameleonMerch/Hoodie-1.png";
import hoodie2 from "../assets/ScameleonMerch/Hoodie-2.png";

// --- TOTE BAG ---
import toteBag1 from "../assets/ScameleonMerch/ToteBag-1.png";

// --- NOTEBOOK ---
import notebook1 from "../assets/ScameleonMerch/Notebook-1.png";

// --- STICKERS ---
import sticker1 from "../assets/ScameleonMerch/Sticker-1.png";

// --- T-SHIRTS ---
import tshirt1 from "../assets/ScameleonMerch/TShirt-1.png";
import tshirt2 from "../assets/ScameleonMerch/TShirt-2.png";

// --- MUG ---
import mug1 from "../assets/ScameleonMerch/Mug-1.png";

// --- PINS ---
import pins1 from "../assets/ScameleonMerch/EnamelPins-1.png";

// --- PLUSHIE ---
import plushie1 from "../assets/ScameleonMerch/Plushie-1.png";
import plushie2 from "../assets/ScameleonMerch/Plushie-2.png";
import plushie3 from "../assets/ScameleonMerch/Plushie-3.png";

// Map Product IDs (from JSON) to these imported images
export const MERCH_IMAGES: Record<string, string[]> = {
  merch_01: [tumbler1, tumbler2, tumbler3],
  merch_02: [pillow1],
  merch_03: [phoneCase1],
  merch_04: [hoodie1, hoodie2],
  merch_05: [toteBag1],
  merch_06: [notebook1],
  merch_07: [sticker1],
  merch_08: [tshirt1],
  merch_09: [tshirt2],
  merch_10: [mug1],
  merch_11: [pins1],
  merch_12: [plushie1, plushie2, plushie3],
};
