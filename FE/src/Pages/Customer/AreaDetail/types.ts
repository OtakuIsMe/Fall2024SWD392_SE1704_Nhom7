import { type } from "os";

export interface Review {
    user: string;
    comment: string;
  }
  
  export interface Location {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    reviews: Review[];
  }
  export default type;