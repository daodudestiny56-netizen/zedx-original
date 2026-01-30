/**
 * ZedX Original - Configuration & Constants
 */

export const CONFIG = {
  APP_NAME: "ZedX Original",
  CURRENCY: "$",
  COCOBASE_ENABLED: true, // Official integration active
  MOCK_DB_DELAY: 800,
  STORAGE_KEYS: {
    CART: "zedx_cart_items",
    WISHLIST: "zedx_wishlist_items",
    THEME: "zedx_theme",
    USER: "zedx_user_session",
  },
};

export const PRODUCTS = [
  {
    id: "p1",
    name: "ZedX Phantom Pro",
    category: "smartphones",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351af9dc?q=80&w=1000&auto=format&fit=crop",
    description: "Next-generation hologram display with neural processing architecture.",
    features: ["8K Holographic Display", "Quantum CPU", "1000MP Sensor"],
    badge: "New",
    featured: true,
  },
  {
    id: "p2",
    name: "Aether Blade Laptop",
    category: "laptops",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1000&auto=format&fit=crop",
    description: "Ultra-thin liquid metal cooling system with carbon-fiber chassis.",
    features: ["RTX 6090 Ti", "64GB Liquid RAM", "Flexible OLED"],
    badge: "Hot",
    featured: true,
  },
  {
    id: "p3",
    name: "Sonic Pulse G7",
    category: "audio",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    description: "Bone conduction technology with immersive spatial audio experience.",
    features: ["Spatial Audio", "48h Battery", "Noise Isolation"],
    badge: "Sale",
    featured: true,
  },
  {
    id: "p4",
    name: "Neural Link V2",
    category: "wearables",
    price: 549.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    description: "Biometric tracking with integrated AR HUD projection.",
    features: ["AR Interface", "Health Sync", "Solar Powered"],
    badge: "Futuristic",
    featured: false,
  },
  {
    id: "p5",
    name: "Titan Gaming Rig",
    category: "laptops",
    price: 3899.99,
    image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?q=80&w=1000&auto=format&fit=crop",
    description: "Desktop-grade power in a portable armored form factor.",
    features: ["Mechanical Keys", "140W GPU", "480Hz Screen"],
    badge: "Pro",
    featured: false,
  },
  {
    id: "p6",
    name: "Infinity Buds",
    category: "audio",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop",
    description: "Self-charging case with graphene driver technology.",
    features: ["Touch Control", "Waterproof", "ANC"],
    badge: "",
    featured: false,
  },
];

export const cocobaseConfig = {
  apiKey: "akuIheujJtCOqHlgU1PmrDjpSGJs4cauTeymKYXe",
  projectId: "87779b61-17ab-4ff8-82c6-b3993559ebf4",
  baseUrl: "https://api.cocobase.buzz"
};
