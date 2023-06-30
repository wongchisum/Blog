/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript:{
    ignoreBuildErrors:true // 后续处理类型错误后，关闭此特性
  }
}

module.exports = nextConfig
