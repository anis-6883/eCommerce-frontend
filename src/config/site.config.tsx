import { Metadata } from 'next';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'e-commerce',
  description: `Discover a seamless online shopping experience with [Your E-commerce Platform].`,
  mode: MODE.LIGHT,
};

export const metaObject = (title?: string, description: string = siteConfig.description): Metadata => {
  return {
    title: title ? `${title} - Ecommerce` : siteConfig.title,
    description,
  };
};
