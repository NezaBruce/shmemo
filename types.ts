export interface Post {
  slug:string,
  title:string,
  featuredImage:FeaturedImage[],
  createdAt:Date
}
export interface position {
  slug:string,
  LEFT?:string,
  RIGHT?:string
}
export interface Author {
  name:string,
  photo:Photo[],
  bio:string
  
}
export interface Slug{
  slug:string
}
export interface Comment{
  name:string,
  createdAt:string,
  comment:string
}

export interface FeaturedImage{
  id:number,
  url:string
}
export interface Photo{
  id:number,
  url:string
}