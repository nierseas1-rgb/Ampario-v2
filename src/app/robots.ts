import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/compte", "/connexion", "/inscription"],
    },
    sitemap: "https://www.ampario.fr/sitemap.xml",
  };
}
