// Tạo một file mới hoặc thêm vào file kiểu hiện có, ví dụ `types.ts`
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
  