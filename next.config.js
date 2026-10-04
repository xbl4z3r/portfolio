/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/roadplanner",
        destination: "https://github.com/xbl4z3r/roadplanner",
        permanent: true,
      },
      {
        source: "/discord",
        destination: "https://discord.com/users/678559901789978624",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/xbl4z3r/",
        permanent: true,
      },
      {
        source: "/x",
        destination: "https://x.com/xbl4z3r/",
        permanent: true,
      },
      {
        source: "/sponsor",
        destination: "https://patreon.com/xbl4z3r/",
        permanent: true,
      },
      {
        source: "/hyperbot/invite",
        destination: "https://discord.com/oauth2/authorize?client_id=710425933391200276",
        permanent: true,
      },
      {
        source: "/hyperbot/vote",
        destination: "https://top.gg/bot/710425933391200276/vote",
        permanent: true,
      },
      {
        source: "/spotuya/download",
        destination: "https://github.com/xbl4z3r/spotuya/releases",
        permanent: true,
      },
      {
        source: "/spotuya/github",
        destination: "https://github.com/xbl4z3r/spotuya",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
