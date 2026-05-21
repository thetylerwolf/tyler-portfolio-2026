import { Helmet } from "react-helmet-async";

/** Default SEO for portfolio pages (not /writing). */
const SiteSeo = () => (
  <Helmet>
    <title>Tyler Wolf — Senior Platform &amp; Infrastructure Engineer</title>
    <meta
      name="description"
      content="Senior platform and infrastructure engineer specializing in backend systems where reliability and correctness aren't optional. Cloud-native, bare-metal, and distributed systems including blockchain infrastructure. Based in Stockholm."
    />
    <meta name="author" content="Tyler Wolf" />
    <link rel="canonical" href="https://tylernwolf.com" />

    <meta
      property="og:title"
      content="Tyler Wolf — Senior Platform & Infrastructure Engineer"
    />
    <meta
      property="og:description"
      content="Backend and infrastructure engineering for companies with hard problems — cloud-native platforms, distributed systems, and production blockchain infrastructure. Based in Stockholm, available globally."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://tylernwolf.com" />
    <meta property="og:image" content="https://tylernwolf.com/favicon@2x.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Tyler Wolf — Senior Engineer" />
    <meta
      name="twitter:description"
      content="Senior engineer specializing in backend systems, infrastructure, and technical leadership."
    />
    <meta name="twitter:image" content="https://tylernwolf.com/favicon@2x.png" />
  </Helmet>
);

export default SiteSeo;
