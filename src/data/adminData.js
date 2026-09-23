// Mock Data for Admin Portal & User Profile

export const adminKPIs = {
  totalRevenue: 48250,
  revenueGrowth: "+14.2%",
  totalOrders: 384,
  ordersGrowth: "+8.5%",
  activeProducts: 24,
  stockAlerts: 3,
  atelierClients: 1290,
  clientsGrowth: "+12.8%"
};

export const weeklyRevenueData = [
  { day: "Mon", amount: 4800, height: "45%" },
  { day: "Tue", amount: 6200, height: "60%" },
  { day: "Wed", amount: 5400, height: "52%" },
  { day: "Thu", amount: 7900, height: "78%" },
  { day: "Fri", amount: 9400, height: "92%" },
  { day: "Sat", amount: 10800, height: "100%" },
  { day: "Sun", amount: 8100, height: "80%" }
];

export const initialOrders = [
  {
    id: "LUNE-8941",
    customer: "Elena Rostova",
    email: "elena.r@luxury.com",
    date: "2026-09-22",
    items: 2,
    total: 605,
    paymentStatus: "Paid",
    shippingStatus: "In Transit",
    method: "Credit Card",
    address: "75 Boulevard Saint-Germain, Paris"
  },
  {
    id: "LUNE-8940",
    customer: "Camille Dubois",
    email: "camille@atelier.fr",
    date: "2026-09-22",
    items: 1,
    total: 345,
    paymentStatus: "Paid",
    shippingStatus: "Processing",
    method: "Apple Pay",
    address: "12 Rue de la Paix, Paris"
  },
  {
    id: "LUNE-8939",
    customer: "Marcus Vance",
    email: "marcus.v@studio.co",
    date: "2026-09-21",
    items: 3,
    total: 820,
    paymentStatus: "Paid",
    shippingStatus: "Delivered",
    method: "Google Pay",
    address: "450 5th Avenue, New York"
  },
  {
    id: "LUNE-8938",
    customer: "Sophia Al-Mansoor",
    email: "sophia.m@emirates.ae",
    date: "2026-09-20",
    items: 1,
    total: 260,
    paymentStatus: "Paid",
    shippingStatus: "Delivered",
    method: "Credit Card",
    address: "Downtown Boulevard, Dubai"
  },
  {
    id: "LUNE-8937",
    customer: "Amélie Laurent",
    email: "amelie.l@vogue.fr",
    date: "2026-09-19",
    items: 2,
    total: 510,
    paymentStatus: "Refunded",
    shippingStatus: "Cancelled",
    method: "PayPal",
    address: "8 Avenue Montaigne, Paris"
  }
];

export const initialCategories = [
  {
    id: "cat-1",
    name: "Women's Collection",
    slug: "women",
    itemCount: 48,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    status: "Active",
    description: "Flowing dresses, silk tailoring, and delicate separates."
  },
  {
    id: "cat-2",
    name: "Men's Tailoring",
    slug: "men",
    itemCount: 32,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
    status: "Active",
    description: "Understated suiting, wool blazers, and luxury essentials."
  },
  {
    id: "cat-3",
    name: "New Autumn/Winter 2026",
    slug: "new",
    itemCount: 24,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
    status: "Active",
    description: "The seasonal atelier runway capsule."
  },
  {
    id: "cat-4",
    name: "Fine Leather Goods",
    slug: "accessories",
    itemCount: 16,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=600&q=80",
    status: "Active",
    description: "Handcrafted Tuscan calfskin totes and belts."
  }
];

export const initialPromotions = [
  {
    id: "promo-1",
    code: "LUNE10",
    discount: "10% OFF",
    type: "Percentage",
    minSpend: 150,
    usedCount: 142,
    maxUsage: 500,
    expiryDate: "2026-12-31",
    status: "Active"
  },
  {
    id: "promo-2",
    code: "AUTUMN2026",
    discount: "$50 OFF",
    type: "Fixed Amount",
    minSpend: 300,
    usedCount: 88,
    maxUsage: 200,
    expiryDate: "2026-11-15",
    status: "Active"
  },
  {
    id: "promo-3",
    code: "FREESHIP",
    discount: "Free Shipping",
    type: "Shipping",
    minSpend: 0,
    usedCount: 320,
    maxUsage: 1000,
    expiryDate: "2026-12-31",
    status: "Active"
  },
  {
    id: "promo-4",
    code: "VIPATELIER",
    discount: "20% OFF",
    type: "Percentage",
    minSpend: 500,
    usedCount: 45,
    maxUsage: 50,
    expiryDate: "2026-10-01",
    status: "Expiring Soon"
  }
];

export const userProfileData = {
  fullName: "Elena Rostova",
  email: "elena.rostova@atelier.com",
  phone: "+33 6 12 34 56 78",
  membership: "VIP Atelier Patron",
  joinDate: "January 2026",
  loyaltyPoints: 1250,
  defaultAddress: {
    street: "75 Boulevard Saint-Germain, Apt 4B",
    city: "Paris",
    postalCode: "75005",
    country: "France"
  },
  recentOrders: [
    {
      id: "LUNE-8941",
      date: "Sep 22, 2026",
      items: "2 Items (L'Aurore Wool Coat, Sérénité Dress)",
      total: "$605.00",
      status: "In Transit"
    },
    {
      id: "LUNE-7622",
      date: "Aug 15, 2026",
      items: "1 Item (Palazzo Pleated Trousers)",
      total: "$185.00",
      status: "Delivered"
    }
  ]
};
