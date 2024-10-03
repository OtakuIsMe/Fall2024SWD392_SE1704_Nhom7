// data.ts
import { Location } from './types';

export const locations: Location[] = [
  {
    id: '1',
    name: 'Địa Điểm A',
    imageUrl: '/path/to/image-a.jpg',
    description: 'Mô tả địa điểm A.',
    reviews: [
      { user: 'User 1', comment: 'Tuyệt vời!' },
      { user: 'User 2', comment: 'Rất đẹp!' }
    ]
  },
  // thêm các địa điểm khác
];
