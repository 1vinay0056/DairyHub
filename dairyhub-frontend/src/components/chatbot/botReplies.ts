export const botReplies: {
  keywords: string[];
  reply: string;
}[] = [
  {
    keywords: ["hi", "hello", "hey"],
    reply:
      "👋 Hello! Welcome to DairyHub.\nHow can I help you today?",
  },

  {
    keywords: ["milk", "cow milk", "buffalo milk"],
    reply:
      "🥛 We provide Fresh Cow Milk, Buffalo Milk, Organic Milk and Toned Milk with daily home delivery.",
  },

  {
    keywords: ["paneer"],
    reply:
      "🧀 Fresh Paneer is available in different sizes. Please visit the Products page to check today's price.",
  },

  {
    keywords: ["ghee"],
    reply:
      "🫙 We offer Pure Desi Ghee made from high-quality milk with guaranteed freshness.",
  },

  {
    keywords: ["curd", "dahi"],
    reply:
      "🥣 Fresh Curd is available every day. Check the Products section for sizes and prices.",
  },

  {
    keywords: ["butter"],
    reply:
      "🧈 We have Fresh Butter and White Butter prepared from premium quality milk.",
  },

  {
    keywords: ["cheese"],
    reply:
      "🧀 We provide fresh Cheese in multiple varieties.",
  },

  {
    keywords: ["lassi"],
    reply:
      "🥛 Sweet and Salted Lassi are available during the season.",
  },

  {
    keywords: ["subscription"],
    reply:
      "📅 DairyHub offers Daily, Weekly and Monthly milk subscription plans.",
  },

  {
    keywords: ["delivery"],
    reply:
      "🚚 We provide fast doorstep delivery. Delivery time depends on your location.",
  },

  {
    keywords: ["payment", "upi", "cod"],
    reply:
      "💳 We accept UPI, Debit Card, Credit Card and Cash on Delivery.",
  },

  {
    keywords: ["order"],
    reply:
      "📦 You can place an order from the Products page and track it from My Orders.",
  },

  {
    keywords: ["track"],
    reply:
      "📍 Please open My Orders to check your latest order status.",
  },

  {
    keywords: ["cancel"],
    reply:
      "❌ Orders can be cancelled before they are shipped.",
  },

  {
    keywords: ["contact"],
    reply:
      "☎ Phone: +91 9876543210\n📧 support@dairyhub.com",
  },

  {
    keywords: ["address"],
    reply:
      "📍 DairyHub Pvt Ltd\nSector 62, Noida\nUttar Pradesh, India",
  },

  {
    keywords: ["time", "working hours"],
    reply:
      "🕘 Our support team is available from 6:00 AM to 10:00 PM every day.",
  },

  {
    keywords: ["price", "cost"],
    reply:
      "💰 Please visit the Products page to view the latest prices.",
  },

  {
    keywords: ["thank", "thanks"],
    reply:
      "😊 You're welcome! Happy to help.",
  },
];

export const defaultReply =
  "🤖 Sorry, I couldn't understand that.\n\nYou can ask me about:\n\n🥛 Products\n📦 Orders\n📅 Subscription\n🚚 Delivery\n💳 Payment\n☎ Contact";