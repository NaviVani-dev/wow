import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite abrir el servidor de desarrollo desde otro dispositivo de la red local.
  // allowedDevOrigins recibe sólo el hostname, sin protocolo ni puerto.
  allowedDevOrigins: ["192.168.1.74"],
};

export default nextConfig;
