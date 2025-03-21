import path from 'path'
/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    includePaths: ['styles'],
    // prependData: `@import "styles/_variables.scss"; @import "styles/_mixins.scss";`,
  },
}

export default nextConfig
