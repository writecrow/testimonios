export interface Repository {
  title: string;
  summary: string;
  author: string;
  category: string;
  topics: string;
  path: string;
  date: string;
}

export interface Facet {
  name: string;
  checked: boolean;
}
