import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home(): JSX.Element {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const { description } = customFields as { description: string };

  return (
    <Layout title="Home" description={description}>
    </Layout>
  );
}
