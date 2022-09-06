import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import vsDark from "prism-react-renderer/themes/vsDark";
import navbar from "./config/navbar.config";
import footer from "./config/footer.config";
import { env } from "process";
import { Config } from "@docusaurus/types";
import { Options } from "@docusaurus/plugin-content-docs";

const preview = env.VERCEL_ENV === "preview";

const url = (preview && env.VERCEL_URL) || "https://docs.virtualclient.gg";

const docsCommon: Options = {
  breadcrumbs: true,
  editUrl: ({ docPath }) => `https://github.com/VirtualClient/docs/blob/main/docs/server-api/${docPath}`,
  editCurrentVersion: true,
  remarkPlugins: [remarkA11yEmoji],
  showLastUpdateAuthor: true,
  showLastUpdateTime: true,
};

const config: Config = {
  title: "VirtualClient Documentation",
  tagline: "",
  url: url,
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  onDuplicateRoutes: "warn",
  favicon: "img/favicon.ico",
  trailingSlash: false,
  noIndex: preview,
  baseUrlIssueBanner: false,
  clientModules: [require.resolve("../src/css/custom.css")],

  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve("esbuild-loader"),
      options: {
        loader: "tsx",
        target: isServer ? "node12" : "es2017",
      },

    }),
  },

  themes: ["@docusaurus/theme-classic"],

  plugins: [
    'docusaurus-plugin-image-zoom',

    [
      "content-docs",
      {
        ...docsCommon,
        id: "serverApi",
        path: "docs/server-api",
        routeBasePath: "server-api",
        sidebarPath: require.resolve("./config/sidebar.serverApi"),
        lastVersion: "current",
        versions: {
          current: {
            label: "0.0.13",
            path: "",
          },
        },
      },
    ],

    [
      "content-pages",
      {
        remarkPlugins: [remarkA11yEmoji],
      },
    ],

    [
      "@docusaurus/plugin-sitemap",
      {
        ignorePatterns: ["**/cat/**"],
      },
    ],
    "@docusaurus/plugin-debug",
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)'
      },
      // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
      config: {
      }
    },
    image: "img/og-image.png",
    metadata: [
      {
        name: "og:type",
        content: "website",
      },
      {
        name: "og:image:alt",
        content: "VirtualClient Logo",
      },
    ],
    navbar: navbar,
    footer: footer,
    prism: {
      additionalLanguages: [
        "batch",
        "bash",
        "git",
        "java",
        "javastacktrace",
        "kotlin",
        "groovy",
        "log",
        "toml",
        "properties",
      ],
      theme: vsDark,
    },
  },
};

export = config;
