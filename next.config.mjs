/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "127.0.0.1",
      "localhost",
      "svgrepo.com",
      "www.google.com",
      "www.lottemart.vn",
      "cdn4.iconfinder.com",
      "static.vecteezy.com",
      "cdn3.iconfinder.com",
      "cdn-icons-png.flaticon.com",
      "hcm.fstorage.vn",
      'via.placeholder.com',
      'img.tripi.vn',
      'cdnphoto.dantri.com.vn',
      'png.pngtree.com',
      'anhdephd.vn',
      'encrypted-tbn0.gstatic.com',
      'chothuenhapho.vn'
    ], // Correct domains for direct image URLs
  },
};

export default nextConfig;
