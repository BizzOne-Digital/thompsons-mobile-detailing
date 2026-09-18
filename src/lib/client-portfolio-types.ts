export type PortfolioMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; alt: string };

export type ExteriorPortfolioProject = {
  id: string;
  vehicle: string;
  serviceLabel: string;
  caption: string;
  coverSrc: string;
  media: PortfolioMedia[];
};
