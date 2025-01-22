import axios from 'axios';

const searchAddress = async (query) => {
  try {
    const response = await axios.get(`https://search.goong.io/v1/geocode`, {
      params: {
        address: query,
        access_token: 'KYtVeY4vFFh6CikELetXppZhfK1OzEK6BrNand4u',  // Thay thế với token của bạn
      },
    });
    console.log(response.data);  // Kết quả tìm kiếm
  } catch (error) {
    console.error('Error:', error);
  }
};

export default searchAddress;
