export type LandingMode = 'demo' | 'live';

export type IndustryCard = {
  id: string;
  name: string;
  jobs: string;
  icon: string;
};

export type CompanyCard = {
  id: string;
  name: string;
  jobs: string;
  img: string;
};

export type JobCard = {
  id: string;
  title: string;
  company: string;
  logo: string;
  salary: string;
  food?: string;
  deadline: string;
  location?: string;
  type?: string;
  isTrending?: boolean;
  isHot?: boolean;
};

export type LandingData = {
  industries: IndustryCard[];
  companies: CompanyCard[];
  jobs: JobCard[];
  trendingJob: JobCard;
  hotJobs: JobCard[];
};
