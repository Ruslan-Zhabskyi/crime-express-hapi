export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
}

export interface Category {
  categoryName: string;
  _id: string;
}

export interface Report {
  reportName: string;
  description: string;
  category: Category | string;
  reporter: User | string;
  lat: number;
  lng: number;
  temperature: string;
  code: string;
  windSpeed: string;
  pressure: string;
  windDirection: string;
  timestamp: string;
  imageURL: string;
}

export interface Db {
  userStore: any;
  categoryStore: any;
  reportStore: any;
}

