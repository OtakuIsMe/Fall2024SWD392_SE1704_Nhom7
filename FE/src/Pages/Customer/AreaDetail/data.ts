// data.ts
import { Location } from './types';
import workpodImage from '../../../Assets/workpod.png';

export const locations: Location[] = [
  {
    id: '1',
    name: '166B Nguyễn Sĩ Sách Phường 15, Quận Tân Bình',
    imageUrl: workpodImage, // Sử dụng biến đã import
    description: 'The WorkChill Hub là một không gian làm việc hiện đại và sáng tạo nằm tại trung tâm Quận 1, TP. Hồ Chí Minh. Với mục tiêu cung cấp môi trường làm việc yên tĩnh, linh hoạt và hiệu quả cho cả cá nhân và nhóm nhỏ, WorkChill Hub thiết kế hệ thống POD tiên tiến, giúp người dùng dễ dàng đặt chỗ và sử dụng các cabin làm việc riêng biệt, đầy đủ tiện nghi',
    reviews: [
      { user: 'Nguyễn Văn A', comment: 'Tuyệt vời!' },
      { user: 'Nguyễn Văn B', comment: 'Đây là 1 nơi tuyệt vời để làm việc' }
    ]
  },
  {
    id: '2',
    name: '166B Nguyễn Sĩ Sách Phường 15, Quận Tân Bình',
    imageUrl: workpodImage, // Sử dụng biến đã import
    description: 'Mô tả địa điểm A.',
    reviews: [
      { user: 'Nguyễn Văn A', comment: 'Tuyệt vời!' },
      { user: 'User 2', comment: 'Rất đẹp!' }
    ]
  },
  {
    id: '3',
    name: '166B Nguyễn Sĩ Sách Phường 15, Quận Tân Bình',
    imageUrl: workpodImage, // Sử dụng biến đã import
    description: 'Mô tả địa điểm A.',
    reviews: [
      { user: 'Nguyễn Văn A', comment: 'Tuyệt vời!' },
      { user: 'User 2', comment: 'Rất đẹp!' }
    ]
  },
  // thêm các địa điểm khác
];
