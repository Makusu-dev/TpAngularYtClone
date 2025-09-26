export type ColorApi = Color[]

export interface Color {
  id: number
  title: string
  userName: string
  numViews: number
  numVotes: number
  numComments: number
  numHearts: number
  rank: number
  dateCreated: string
  hex: string
  rgb: Rgb
  hsv: Hsv
  description: string
  url: string
  imageUrl: string
  badgeUrl: string
  apiUrl: string
}

export interface Rgb {
  red: number
  green: number
  blue: number
}

export interface Hsv {
  hue: number
  saturation: number
  value: number
}
