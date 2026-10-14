const nextConfig = {
  /* config options here */
  images: { remotePatterns: [ { protocol: "https", hostname: "rhegfmgnwzqhkctenrng.supabase.co", pathname: "/storage/v1/object/public/**", }, ], },


   turbopack: {
    rules: {
      "**/generated/prisma/internal/*.wasm": ["ignore"],
    },
  },

  

  
};

export default nextConfig;
