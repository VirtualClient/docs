import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const serverApi: SidebarsConfig = {
  primary: [
    "README",
    {
      type: "category",
      label: "⚙ Plugin",
      collapsed: true,
      link: {
        type: "doc",
        id: "plugin/README",
      },
      items: [
        "plugin/README",
      ],
    },
    {
      type: "category",
      label: "💻 Protocol",
      collapsed: true,
      link: {
        type: "doc",
        id: "protocol/getting-started/README",
      },
      items: [

        {
          type: "category",
          label: "⭐ Getting Started",
          collapsed: true,
          link: {
            type: "doc",
            id: "protocol/getting-started/README",
          },
          items: [
            "protocol/getting-started/implementation-in-bungeecord",
            "protocol/getting-started/implementation-in-velocity",
            "protocol/getting-started/implementation-in-spigot"
          ]
        },
        "protocol/virtualclient-players",
        "protocol/disabling-mods",
        "protocol/discord-rpc",
        "protocol/info-indicators"

      ],
    },
  ],
};

export = serverApi;
