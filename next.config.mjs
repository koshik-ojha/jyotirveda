/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // sweph ships prebuilt native binaries that node-gyp-build resolves at
  // runtime by walking up from its own file. Turbopack repackages the module
  // and breaks that resolution — keep it external so Node `require`s it
  // straight from node_modules.
  serverExternalPackages: ["sweph"],
};

export default nextConfig;
