import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

const SEO = ({ 
  title, 
  description, 
  canonical, 
  ogType = "website",
  ogImage = "https://bioforte.com.br/og-image.png" 
}: SEOProps) => {
  const siteTitle = "Bioforte Controle de Pragas";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = "Bioforte: especialista em controle de pragas há 15 anos. Dedetização residencial e comercial com profissionais certificados.";
  const metaDescription = description || defaultDescription;
  const url = "https://bioforte.com.br";
  const fullCanonical = canonical ? `${url}${canonical}` : url;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
