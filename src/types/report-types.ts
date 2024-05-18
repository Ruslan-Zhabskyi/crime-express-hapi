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
  imageURL: string;
}

export interface Db {
  userStore: any;
  categoryStore: any;
  reportStore: any;
}

