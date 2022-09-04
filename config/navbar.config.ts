import { Navbar } from "@docusaurus/theme-common";

// don't specify style or hideOnScroll here, we want it to be dynamic
const navbar: Omit<Navbar, "style" | "hideOnScroll"> = {
  logo: {
    src: "img/V.png",
    width: 32,
    height: 32,
    alt: "VirtualClient Docs",
  },
  items: [
    {
      label: "Server-API",
      to: "/server-api",
      position: "left",
      activeBaseRegex: "(\\/server-api)(.+)?",
    },

    {
      href: "https://discord.com/invite/nGHykN7",
      className: "header-icon-link header-discord-link",
      position: "right",
    },
    {
      href: "https://github.com/VirtualClient",
      className: "header-icon-link header-github-link",
      position: "right",
    },
  ],
};

export default navbar;
