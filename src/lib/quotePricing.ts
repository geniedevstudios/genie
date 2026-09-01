export type Service = 'uiux' | 'web' | 'consulting' | 'mobile' | 'security';
export type Timeframe = '1-3-weeks' | '1-3-months' | '3-6-months' | 'not-sure';
export type Budget = 'starter' | 'standard' | 'complex' | 'enterprise';
export type BudgetFit = 'within-budget' | 'scope-exceeds-budget';
export type Complexity = 'low' | 'medium' | 'high';

export type QuoteResult = {
  calculated: number;
  estimate: string;
  complexity: Complexity;
  budgetFit: BudgetFit;
  rushApplied: boolean;
  message: string;
};

const SERVICE_BASES: Record<Service, number> = {
  uiux: 2500,
  web: 3500,
  consulting: 3000,
  mobile: 7500,
  security: 5000,
};

export const SERVICE_LABELS: Record<Service, string> = {
  uiux: 'UI/UX Designs',
  web: 'Website and Web Apps Development',
  consulting: 'IT Consultancy',
  mobile: 'Mobile Apps Development',
  security: 'Cybersecurity',
};

export const SERVICE_ORDER: Service[] = ['web', 'uiux', 'mobile', 'security', 'consulting'];

export const TIMEFRAME_LABELS: Record<Timeframe, string> = {
  '1-3-weeks': '1-3 weeks',
  '1-3-months': '1-3 months',
  '3-6-months': '3-6 months',
  'not-sure': 'Not sure yet',
};

export const TIMEFRAME_ORDER: Timeframe[] = ['1-3-weeks', '1-3-months', '3-6-months', 'not-sure'];

export const BUDGET_BANDS = {
  starter: { min: 2500, max: 5000, label: 'GH₵2,500–GH₵5,000' },
  standard: { min: 5000, max: 10000, label: 'GH₵5,000–GH₵10,000' },
  complex: { min: 10000, max: 20000, label: 'GH₵10,000–GH₵20,000' },
  enterprise: { min: 20000, max: Infinity, label: 'GH₵20,000+' },
} as const;

export const BUDGET_ORDER: Budget[] = ['starter', 'standard', 'complex', 'enterprise'];

const PRICE_BANDS = [
  { min: 2500, upperExclusive: 5000, label: 'GH₵2,500–GH₵5,000' },
  { min: 5000, upperExclusive: 10000, label: 'GH₵5,000–GH₵10,000' },
  { min: 10000, upperExclusive: 20000, label: 'GH₵10,000–GH₵20,000' },
  { min: 20000, upperExclusive: Infinity, label: 'GH₵20,000+' },
] as const;

export const FEATURE_PRICES: Record<string, number> = {
  'Custom E-commerce': 2500,
  'Portfolio / Corporate Site': 1000,
  'Web Portal': 2500,
  'SaaS Platform': 5000,
  'Admin Dashboard': 1500,
  'User Accounts': 1000,
  Payments: 1000,
  'AI Features': 3500,

  Wireframing: 500,
  'High-fidelity Mockups': 1000,
  'Interactive Prototypes': 1000,
  'Design System': 2000,
  'User Research': 1500,
  'Usability Testing': 1500,

  'iOS Native': 4000,
  'Android Native': 4000,
  'Cross-Platform': 2500,
  'App Store Submission': 750,
  'Push Notifications': 1000,
  'Offline Mode': 1500,
  'In-App Purchases': 1500,
  'Location Services': 1000,

  'Vulnerability Assessment': 2000,
  'Penetration Testing': 5000,
  'Security Audit': 3000,
  'Compliance Consulting': 3500,
  'Data Encryption': 2000,
  'Threat Modeling': 2500,

  'Tech Stack Assessment': 1000,
  'Architecture Design': 3000,
  'Cloud Migration': 4000,
  'Vendor Selection': 1000,
  'Team Augmentation': 5000,
  'API Strategy': 2000,
};

export const ALLOWED_FEATURES: Record<Service, readonly string[]> = {
  web: [
    'Custom E-commerce',
    'Portfolio / Corporate Site',
    'Web Portal',
    'SaaS Platform',
    'Admin Dashboard',
    'User Accounts',
    'Payments',
    'AI Features',
  ],
  uiux: [
    'Wireframing',
    'High-fidelity Mockups',
    'Interactive Prototypes',
    'Design System',
    'User Research',
    'Usability Testing',
  ],
  mobile: [
    'iOS Native',
    'Android Native',
    'Cross-Platform',
    'App Store Submission',
    'Push Notifications',
    'Offline Mode',
    'In-App Purchases',
    'Location Services',
  ],
  security: [
    'Vulnerability Assessment',
    'Penetration Testing',
    'Security Audit',
    'Compliance Consulting',
    'Data Encryption',
    'Threat Modeling',
  ],
  consulting: [
    'Tech Stack Assessment',
    'Architecture Design',
    'Cloud Migration',
    'Vendor Selection',
    'Team Augmentation',
    'API Strategy',
  ],
};

const QUOTE_INPUT_ERRORS = new Set([
  'Invalid service',
  'Invalid budget',
  'Select at least one capability',
  'Invalid capability for selected service',
]);

export function isQuoteInputError(error: unknown): error is Error {
  return error instanceof Error && QUOTE_INPUT_ERRORS.has(error.message);
}

export function calculateQuote(input: {
  service: Service;
  features: string[];
  timeframe: Timeframe;
  budget: Budget;
}): QuoteResult {
  const { service, timeframe, budget } = input;
  const features = [...new Set(input.features)];
  if (!SERVICE_BASES[service]) throw new Error('Invalid service');
  if (!BUDGET_BANDS[budget]) throw new Error('Invalid budget');
  if (features.length === 0) throw new Error('Select at least one capability');
  if (features.some((f) => !ALLOWED_FEATURES[service].includes(f))) {
    throw new Error('Invalid capability for selected service');
  }

  const subtotal =
    SERVICE_BASES[service] +
    features.reduce((sum, feature) => sum + FEATURE_PRICES[feature], 0);

  const rushMultiplier = timeframe === '1-3-weeks' && subtotal >= 5000 ? 1.2 : 1;
  const calculated = Math.ceil((subtotal * rushMultiplier) / 500) * 500;
  const estimateBand =
    PRICE_BANDS.find((band) => calculated >= band.min && calculated < band.upperExclusive) ??
    PRICE_BANDS[PRICE_BANDS.length - 1];

  const selectedBudget = BUDGET_BANDS[budget];
  const budgetFit: BudgetFit =
    calculated <= selectedBudget.max ? 'within-budget' : 'scope-exceeds-budget';
  const complexity: Complexity =
    calculated < 5000 ? 'low' : calculated < 10000 ? 'medium' : 'high';

  return {
    calculated,
    estimate: estimateBand.label,
    complexity,
    budgetFit,
    rushApplied: rushMultiplier > 1,
    message:
      budgetFit === 'scope-exceeds-budget'
        ? `The selected scope is estimated at ${estimateBand.label}, which is above the selected ${selectedBudget.label} budget. We can discuss reducing the scope or phasing the project.`
        : `The selected scope appears compatible with the ${selectedBudget.label} budget.`,
  };
}
