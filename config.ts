/**
 * Application configuration loaded from environment variables.
 * Sensitive Stripe identifiers are kept in env to avoid committing secrets.
 */

// function getEnv(name: string): string {
//   const value = process.env[name];
//   // console.log(`[DEBUG] Attempting to get env var: ${name}, Value: ${value}`); // Previous debug line
//   if (!value) {
//     throw new Error(`Missing environment variable: ${name}`);
//   }
//   return value;
// }

// New debug code to log all NEXT_PUBLIC_ variables on the client side
// if (typeof window !== 'undefined') {
//   console.log('[DEBUG] Client-side process.env snapshot:');
//   for (const key in process.env) {
//     if (key.startsWith('NEXT_PUBLIC_')) {
//       console.log(`[DEBUG] ${key}: ${process.env[key]}`);
//     }
//   }
// }

const config = {
  metadata: {
    title: "Saas Starter",
    description: "Saas Starter Kit for demo purpose ",
    keywords: ["Saas", "Starter Kit", "Demo", "Note Taking", "AI", "Chatbot"],
  },
  theme: {
    colors: {
      primary: '#5059FE',
      primaryHover: '#4048ed',
      border: '#E5E7EB',
      borderHover: '#D1D5DB',
    },
  },
  // Stripe plan configuration
  stripe: {
    free: {
      monthPrice: 0,
      yearPrice: 0,
      monthPriceId: '',
      yearPriceId: '',
      productId: '',
      name: 'Free',
      description: 'Free plan',
    },
    basic: {
      monthPrice: 9.9,
      yearPrice: 90,
      monthPriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_MONTH_PRICE_ID!,
      yearPriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_YEAR_PRICE_ID!,
      productId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRODUCT_ID!,
      name: 'Basic',
      description: 'Basic plan',
    },
    pro: {
      monthPrice: 29.9,
      yearPrice: 280,
      monthPriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTH_PRICE_ID!,
      yearPriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_YEAR_PRICE_ID!,
      productId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRODUCT_ID!,
      name: 'Pro',
      description: 'Pro plan',
    },
  },
  appName: "saas starter kit",
  socialLinks: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
  emailProvider: "nodemailer",
};

export default config;
