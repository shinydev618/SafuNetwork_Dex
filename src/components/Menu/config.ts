import { MenuEntry } from '@spacegrimedex-uikit'

const config: MenuEntry[] = [
  {
    label: "Home",
    icon: "HomeIcon",
    href: "/",
  },
  {
    label: "Trade",
    icon: "TradeIcon",
    items: [
      {
        label: "Exchange",
        href: "https://exchange.pancakeswap.finance",
      },
      {
        label: "Liquidity",
        href: "https://exchange.pancakeswap.finance/#/pool",
      },
    ],
  },
  {
    label: "Earning",
    icon: "EarningIcon",
    href: "/farms",
  },
  {
    label: "NFT Marketplace",
    icon: "NFTIcon",
    href: "/syrup",
  },
  {
    label: "SpaceGrime Gallery",
    icon: "GalleryIcon",
    href: "/lottery",
  },
  {
    label: "Launchpad",
    icon: "LaunchpadIcon",
    href: "/nft",
  },
  {
    label: "Gamification",
    icon: "GamificationIcon",
    href: "/nft",
  },
  {
    label: "ETH2.0",
    icon: "ETHIcon",
    href: "/nft",
  },
  {
    label: "Info",
    icon: "InfoIcon",
    href: "/nft",
  },
  {
    label: "Contact",
    icon: "ContactIcon",
    items: [
      {
        label: "Twitter",
        href: "/teams",
      },
      {
        label: "Telegram",
        href: "/",
      },
    ],
    calloutClass: "rainbow",
  },
];
export default config
