
export enum VideoStyle {
  Cinematic = 'Cinematic',
  Anime = 'Anime',
  Documentary = 'Documentary',
  PixelArt = 'Pixel Art',
  Fantasy = 'Fantasy',
}

export interface GalleryItem {
  url: string;
  prompt: string;
}
