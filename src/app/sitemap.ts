import { MetadataRoute } from "next";
import { properties } from "@/data/properties";
import { articles } from "@/data/articles";

const BASE = "https://www.ampario.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/proprietes",
    "/vendre",
    "/estimation",
    "/simulateur",
    "/comparateur",
    "/gestion-locative",
    "/agences",
    "/contact",
    "/infoline",
    "/actualites",
    "/avis",
    "/faq",
    "/favoris",
    "/connexion",
    "/inscription",
    "/mentions-legales",
  ].map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const propertyRoutes = properties.map((p) => ({
    url: `${BASE}/proprietes/${p.id}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${BASE}/actualites/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...propertyRoutes, ...articleRoutes];
}
