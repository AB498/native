import {LandingData} from '../types/landing';
import {MOCK_LANDING_DATA} from '../data/mockLandingData';

const API_BASE_URL = 'https://dev.bhcjobs.com';
const DEFAULT_LOGO =
  'https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/fig2code/image_assets/5fec8e5bb4b77e52b3bbbbe6b5353a017996d495.png';
const API_STORAGE_BASE_URL = 'https://api.bhcjobs.com/storage';

type JobApiCompany = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  country?: {
    id: number;
    name: string;
  } | null;
  industry?: {
    id: number;
    name: string;
  } | null;
};

type JobApiItem = {
  id: number;
  slug: string;
  job_title: string;
  company_name: string;
  industry_name: string;
  currency: string;
  min_salary: number | null;
  max_salary: number | null;
  food_option: string | null;
  food_amount: number | null;
  expiry: string;
  type: string;
  is_trending: number;
  is_hot: number;
  company: JobApiCompany | null;
  country?: {
    id: number;
    name: string;
  } | null;
};

type IndustryApiItem = {
  id: number;
  name: string;
  image: string | null;
  jobs_count: number;
};

type CompanyApiItem = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  jobs_count: number;
};

type ApiListResponse<T> = {
  status: boolean;
  message: string;
  data: T[];
};

function formatAvailableJobs(count: number) {
  return `${count} Available Jobs`;
}

function titleizeType(value: string | null | undefined) {
  if (!value) {
    return 'OVERSEAS';
  }

  return value.replace(/_/g, ' ').trim().toUpperCase();
}

function buildImageUrl(
  fileName: string | null | undefined,
  folder: 'company-image' | 'industry-image',
) {
  if (!fileName) {
    return DEFAULT_LOGO;
  }

  if (/^https?:\/\//i.test(fileName)) {
    return fileName;
  }

  return `${API_STORAGE_BASE_URL}/${folder}/${fileName}`;
}

function formatSalaryRange(currency: string, minimum: number | null, maximum: number | null) {
  if (minimum && maximum) {
    return `${currency} ${minimum.toLocaleString()} - ${maximum.toLocaleString()}`;
  }

  if (minimum) {
    return `${currency} ${minimum.toLocaleString()}`;
  }

  if (maximum) {
    return `${currency} ${maximum.toLocaleString()}`;
  }

  return 'Salary negotiable';
}

function formatFoodAllowance(foodOption: string | null, foodAmount: number | null, currency: string) {
  if (foodOption === 'provided') {
    return 'Provided';
  }

  if (foodOption === 'allowance' && foodAmount) {
    return `${currency} ${foodAmount.toLocaleString()}`;
  }

  return undefined;
}

function formatExpiryDate(expiry: string) {
  const date = new Date(expiry);

  if (Number.isNaN(date.getTime())) {
    return expiry || 'Open now';
  }

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function normalizeIndustry(item: IndustryApiItem) {
  return {
    id: String(item.id),
    name: item.name,
    jobs: formatAvailableJobs(item.jobs_count),
    icon: buildImageUrl(item.image, 'industry-image') || MOCK_LANDING_DATA.industries[0].icon,
  };
}

function normalizeCompany(item: CompanyApiItem) {
  return {
    id: String(item.id),
    name: item.name,
    jobs: formatAvailableJobs(item.jobs_count),
    img: buildImageUrl(item.image, 'company-image'),
  };
}

function normalizeJob(item: JobApiItem) {
  const salary = formatSalaryRange(item.currency, item.min_salary, item.max_salary);
  const food = formatFoodAllowance(item.food_option, item.food_amount, item.currency);
  const location = item.country?.name || item.company?.country?.name || 'Saudi Arabia';

  return {
    id: String(item.id),
    title: item.job_title,
    company: item.company_name || item.company?.name || 'BhcJobs Employer',
    logo: buildImageUrl(item.company?.image, 'company-image'),
    salary,
    food,
    deadline: formatExpiryDate(item.expiry),
    location,
    type: titleizeType(item.type),
    isTrending: item.is_trending === 1,
    isHot: item.is_hot === 1,
  };
}

async function fetchJson<T>(path: string): Promise<ApiListResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchLandingData(): Promise<LandingData> {
  const [industryPayload, jobPayload, companyPayload] = await Promise.all([
    fetchJson<IndustryApiItem>('/api/industry/get'),
    fetchJson<JobApiItem>('/api/job/get'),
    fetchJson<CompanyApiItem>('/api/company/get'),
  ]);

  const industries = industryPayload.data.map(normalizeIndustry);
  const companies = companyPayload.data.map(normalizeCompany);
  const normalizedJobs = jobPayload.data.map(normalizeJob);
  const trendingJob =
    normalizedJobs.find(job => job.isTrending) ??
    normalizedJobs[0] ??
    MOCK_LANDING_DATA.jobs[0];
  const hotJobs = normalizedJobs.filter(job => job.isHot);
  const recommendedJobs = normalizedJobs;

  if (industries.length === 0 && normalizedJobs.length === 0 && companies.length === 0) {
    throw new Error('No landing data found in API response');
  }

  return {
    industries: industries.length > 0 ? industries : MOCK_LANDING_DATA.industries,
    jobs: recommendedJobs.length > 0 ? recommendedJobs : MOCK_LANDING_DATA.jobs,
    companies: companies.length > 0 ? companies : MOCK_LANDING_DATA.companies,
    trendingJob,
    hotJobs: hotJobs.length > 0 ? hotJobs.slice(0, 3) : MOCK_LANDING_DATA.hotJobs,
  };
}
