export interface NasaApi {
    collection: Collection
  }
  
  export interface Collection {
    version: string
    href: string
    items: Item[]
    metadata: Metadata
    links: Link2[]
  }
  
  export interface Item {
    href: string
    data: Daum[]
    links: Link[]
  }
  
  export interface Daum {
    center: string
    date_created: string
    description?: string
    keywords?: string[]
    media_type: string
    nasa_id: string
    title: string
    description_508?: string
    album?: string[]
    location?: string
    secondary_creator?: string
    photographer?: string
  }
  
  export interface Link {
    href: string
    rel: string
    render?: string
    width?: number
    size?: number
    height?: number
  }
  
  export interface Metadata {
    total_hits: number
  }
  
  export interface Link2 {
    rel: string
    prompt: string
    href: string
  }
  