import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
// import {useRouter} from 'next/router';

import { grpahCMSImageLoader } from '../utils';
import { getRecentPosts, getSimilarPosts } from '../services';
import { Slug } from '../types';
const PostWidget = ({categories}:any,{slug}:{slug:Slug}) => {
    const [relatedPosts,setrelatedPosts]=useState([]);
    useEffect(()=>{
        if(slug){
            getSimilarPosts(categories,slug).then((result)=>{
                setrelatedPosts(result);
            })
        }
        else if(slug == "react-testing"){
            getSimilarPosts(categories,slug).then((result)=>{
                setrelatedPosts(result);
            })        
        }
        else if(slug == "sport"){
            getSimilarPosts(categories,slug).then((result)=>{
                setrelatedPosts(result);
                console.log(result.title);
                console.log(result.title.slice(0,5));
            })
        }
        else{
            getRecentPosts().then((result)=>{
                setrelatedPosts(result);
            });
        }
    },[slug]);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
        <h3 className="text-xl mb-8 font-semibold-border-b-pb-4">
            {slug ? "Related Posts":"Recent posts"}
        </h3>
        {relatedPosts.map((post,index)=>(
            <div className="flex items-center w-full mb-4" key={index}>
                <div className="w-16 flex-none">
                    <Image
                    loader={grpahCMSImageLoader}
                    alt={post.title}
                    height="60px"
                    width="60px"
                    unoptimized
                    className="align-middle rounded-full"
                    src={post.featuredImage.url}
                    >

                    </Image>
                </div>
                <div className="flex-grow ml-4">
                    <p className="text-gray-500 font-xs">{moment(post.createdAt).format("MMM DD, YYYY")}</p>
                    <Link href={`/post/${post.slug}`} className="text-md" key={index}>{post.title}</Link>        
                </div>
            </div>
        ))}
    </div>
  )
}

export default PostWidget;