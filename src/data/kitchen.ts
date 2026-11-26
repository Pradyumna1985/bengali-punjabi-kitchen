import bengaliThaliImg from "@/assets/bengali-thali.jpg";
import bengaliSnacksImg from "@/assets/bengali-sweets-snacks.jpg";
import punjabiTadkaImg from "@/assets/punjabi-tadka.jpg";

export const KITCHEN_INFO = {
  name: "Maach & Makki",
  tagline: "Authentic Bengali Cuisine & Punjabi Tadka Masala",
  whatsappDigits: "918336068750",
  whatsappDisplay: "+91 83360 68750",
  deliveryZones: ["Kanchrapara", "Kalyani", "Halisahar"] as const,
  deliverySummary: "Delivering only across Kanchrapara, Kalyani & Halisahar",
  demoUpiId: "maachandmakki.demo@upi",
  hours: "Daily, 11:30 AM – 10:30 PM",
};

export type DeliveryZone = (typeof KITCHEN_INFO.deliveryZones)[number];

export interface MenuItem {
  id: string;
  name: string;
  cuisine: "bengali" | "punjabi";
  price: number;
  isVeg: boolean;
  description: string;
  image: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { id: "shorshe-ilish", name: "Shorshe Ilish", cuisine: "bengali", price: 360, isVeg: false, description: "Fresh Hilsa simmered in golden stone-ground mustard paste and green chillies.", image: bengaliThaliImg },
  { id: "kosha-mangsho", name: "Kosha Mangsho & 4 Luchi", cuisine: "bengali", price: 340, isVeg: false, description: "Slow-braised dark spiced mutton paired with four hot, puffed golden luchis.", image: bengaliThaliImg },
  { id: "bhetki-fry", name: "Kolkata Bhetki Fish Fry", cuisine: "bengali", price: 220, isVeg: false, description: "Crispy crumb-coated diamond Bhetki fillet served with tangy Bengali kasundi.", image: bengaliSnacksImg },
  { id: "basanti-pulao", name: "Basanti Pulao & Aloo Dum", cuisine: "bengali", price: 210, isVeg: true, description: "Fragrant saffron gobindobhog rice with gently spiced baby potato curry.", image: bengaliThaliImg },
  { id: "mishti-doi", name: "Matir Bhar Mishti Doi", cuisine: "bengali", price: 95, isVeg: true, description: "Creamy caramelized sweet curd set in traditional earthen clay pots.", image: bengaliSnacksImg },
  { id: "dal-tadka", name: "Punjabi Dal Tadka Masala", cuisine: "punjabi", price: 190, isVeg: true, description: "Slow-cooked yellow lentils finished with sizzling desi ghee, garlic, and red chilli tadka.", image: punjabiTadkaImg },
  { id: "paneer-masala", name: "Paneer Tikka Butter Masala", cuisine: "punjabi", price: 260, isVeg: true, description: "Char-grilled cottage cheese cubes in a velvety spiced tomato-cashew gravy.", image: punjabiTadkaImg },
  { id: "butter-chicken", name: "Amritsari Butter Chicken", cuisine: "punjabi", price: 295, isVeg: false, description: "Tandoori chicken simmered in rich fenugreek-scented makhani masala.", image: punjabiTadkaImg },
  { id: "chole-kulcha", name: "Pindi Chole & 2 Butter Kulcha", cuisine: "punjabi", price: 220, isVeg: true, description: "Hearty dark chickpea masala paired with soft, warm tandoori butter kulchas.", image: punjabiTadkaImg },
  { id: "garlic-naan", name: "Tandoori Garlic Butter Naan (2 pcs)", cuisine: "punjabi", price: 90, isVeg: true, description: "Blistered clay-oven flatbread brushed with roasted garlic and melted butter.", image: punjabiTadkaImg },
];

export interface CustomerFeedback {
  id: string;
  name: string;
  area: DeliveryZone;
  rating: number;
  comment: string;
  dateLabel: string;
}

export const INITIAL_FEEDBACKS: CustomerFeedback[] = [
  { id: "fb-1", name: "Ananya Chatterjee", area: "Kalyani", rating: 5, comment: "Shorshe Ilish tasted just like Sunday lunch at grandma's house, and it arrived piping hot.", dateLabel: "2 days ago" },
  { id: "fb-2", name: "Harpreet Singh", area: "Kanchrapara", rating: 5, comment: "Proper dhaba-style Punjabi Dal Tadka and soft garlic naan. My kids and parents both loved it.", dateLabel: "4 days ago" },
  { id: "fb-3", name: "Subrata Bose", area: "Halisahar", rating: 5, comment: "Ordering on WhatsApp was so easy even for a 72-year-old like me. Crisp Fish Fry and great packaging.", dateLabel: "1 week ago" },
  { id: "fb-4", name: "Riya Dasgupta", area: "Kalyani", rating: 4, comment: "Kosha Mangsho with luchi and Mishti Doi made our family dinner effortless and joyful.", dateLabel: "1 week ago" },
];

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${KITCHEN_INFO.whatsappDigits}?text=${encodeURIComponent(message)}`;
}