import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import PostCard from '../components/PostCard';
import PostWidget from '../components/PostWidget';
import Categories from '../components/Categories';
import FeaturedPosts from '../sections/FeaturedPosts';
import {getPosts} from '../services';
import Header from '../components/Header';
import { Post,Slug } from '../types';
const Home:NextPage = ({posts}:any) => {
  return (
    <>
    <Header/>
    <div className="container mx-auto px-10 mb-8">
   <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post:any, index:any) => {
            console.log("post"+post.node.featuredImage.url);
            return <PostCard key={index} post={post.node} />
          }
            )}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
// Returning all posts.````````
export const getStaticProps:GetStaticProps = async() => {
const posts=(await getPosts()) || [];
return {
  props:{posts},
};
};
// get static paths 
export const getStaticPaths:GetStaticPaths = async() => {
const posts=(await getPosts()) || [];
return {
  paths:posts.map(({node:{slug}})=>({params:slug})),
    fallback:true
  };
};

export default Home;