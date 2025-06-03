import config from '@/config';
import PricingClient, { PlanData } from './PricingClient';

// Collect pricing data on the server so secret IDs remain server-side
const priceData = Object.entries(config.stripe).map(([type, data]) => ({
  type,
  ...data,
})) as PlanData[];

export default function Pricing() {
  return <PricingClient priceData={priceData} />;
}
