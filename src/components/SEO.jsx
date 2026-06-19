import { Helmet } from "react-helmet-async";

function SEO() {
  return (
    <Helmet>
      <title>
        InrCircle | Creative Collective, Events & Culture in Abuja
      </title>

      <meta
        name="description"
        content="InrCircle is a creative collective building community through culture, curated events, fashion and creative experiences in Abuja."
      />

      <meta
        name="keywords"
        content="InrCircle, Abuja events, creative collective Abuja, fashion Abuja, youth culture Nigeria, InrCircle Nights, creative community Abuja"
      />

      <meta
        property="og:title"
        content="InrCircle | Building Community Through Culture"
      />

      <meta
        property="og:description"
        content="Creative collective. Curated experiences. Fashion. Community."
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:site_name"
        content="InrCircle"
      />
    </Helmet>
  );
}

export default SEO;