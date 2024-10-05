// data.ts
import { Location } from './types';
import workpodImage from '../../../Assets/workpod.png';

export const locations: Location[] = [
  {
    id: '1',
    name: 'Địa Điểm A',
    imageUrl: workpodImage, // Sử dụng biến đã import
    description: 'Mô tả địa điểm A.',
    reviews: [
      { user: 'User 1', comment: 'Tuyệt vời!' },
      { user: 'User 2', comment: 'Rất đẹp!' }
    ]
  },
  // thêm các địa điểm khác
];
