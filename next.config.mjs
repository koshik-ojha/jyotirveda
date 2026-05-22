/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // sweph ships prebuilt native binaries that node-gyp-build resolves at
  // runtime by walking up from its own file. Turbopack repackages the module
  // and breaks that resolution — keep it external so Node `require`s it
  // straight from node_modules.
  serverExternalPackages: ["sweph"],
  // node-gyp-build's runtime traversal is invisible to @vercel/nft, so the
  // prebuilt .node files are dropped from the deployment trace. Force-include
  // them so PaaS deploys (Hostinger, Vercel-style) ship the Linux binary.
  outputFileTracingIncludes: {
    "/*": ["node_modules/sweph/prebuilds/**/*"],
  },
};

export default nextConfig;
