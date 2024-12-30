/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  cacheOnFrontendNav: true,
  cacheStartUrl: "/",
  fallbacks:{
    document: "/~offline",
  },
  manifestDefaults: {
    prompt_message: "Add to Home Screen"
  }
});

export default withPWA({

    
  });


