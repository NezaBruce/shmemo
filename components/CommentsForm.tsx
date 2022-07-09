import React, { useEffect, useState } from 'react'
import {SubmitComment} from '../services';
import { Slug } from '../types';

const CommentsForm = ({slug} : {slug : Slug}) => {
  const [error,setError]=useState(false);
  // const [localStorage,setLocalStorage]=useState(null);
  const [showSuccessMessage,setShowSuccessMessage]=useState(false);
  const [formData,setFormData]=useState({name:null,email:null,comment:null,storeData:false});
  useEffect(()=>{
  // setLocalStorage(window.localStorage);
    const initialFormData:any={
    name:window.localStorage.getItem('name'),
    email:window.localStorage.getItem('email'),
    storeData:window.localStorage.getItem("name")||window.localStorage.getItem("email")
  }
  setFormData(initialFormData);
  },[]);
  const onInputChange=(e:any)=>{
    const {target}=e;
    if(target.type == "checkbox"){
      setFormData((prevState)=>({
        ...prevState,
        [target.name]:target.checked
      }))
    }else{
      setFormData((prevState)=>({
        ...prevState,
        [target.name]:target.value
      }));
    }
  }
  const handleResponse=()=>{
    // const messagee=formData.comment;
    const auth="token";
    fetch('/api/comments',{
      method:"GET",
      headers:{'authorization':"bearer"+auth,'Content-type':"application/json"}
    }).then(json=>{
      return json.json();
    }).then(data=>{
      console.log(data);
      data.stringFy();
    })
  }
  const handlePostSubmission=()=>{
    setError(false);
    const {name,email,comment,storeData}=formData;
    if(!name || !email || !comment){
      setError(true);
      return;
    }
    const commentObj={
      name,email,comment,storeData,slug
    }
    if(storeData){
      window.localStorage.setItem("name",name);
      window.localStorage.setItem("email",email);
    }else{
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    SubmitComment(commentObj)
    .then((res)=>{
      if(res.createComment){
        if(!storeData){
          formData.name='';
          formData.email="";
        }
        formData.comment='';
        setFormData((prevState)=>({
          ...prevState,
          ...formData
        }));
        setShowSuccessMessage(true);
        setTimeout(()=>{
          setShowSuccessMessage(false)
        },3000);
      }
    })
  }
  // value={formData.name}
  // value={formData.email}
  return (
      <>
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
        <h3 className="text-xl font-semibold mb-8 border-b border-red-700 pb-4">Leave a reply</h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <textarea value={formData.message} onChange={onInputChange} className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-100 text-gray-700" name="comment" placeholder="Comment" id="" cols="30" rows="10"/>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <input type="text" onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-100 text-gray-700" placeholder="Name" name="name"/>
          <input type="text" onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-100 text-gray-700" placeholder="Email" name="email"/>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <input onChange={onInputChange} checked={formData.storeData} type="checkbox" id="storeData" name="storeData" value="true"/>
            <label className="text-gray-500 cursor-pointer " htmlFor="storeData">Save credentials for next time</label>
          </div>
        </div>
        {error &&<p className=" text-xs text-red-500">All fields are mandatory</p>}
        <div className="mt-8">
          <button onClick={handlePostSubmission} className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Comment</button>
          {showSuccessMessage &&<span className="text-xl float-right font-semibold mt-1 text-green-800">Comment submitted successfully waiting for review</span>}
        </div>
    </div>
        <div className="bg-indigo-700 mt-4 mb-4 pt-4 h-500 w-300 rounded-lg focus:ring-2 focus:ring-gray-800">
          <p className="p-8 cursor-pointer h-full w-full transition duration-700 ease">Hello there</p>
          {/* <p className="mt-3 p-4">Yeah {formData.comment}</p>           */}
        </div>
        </>
  )
}

export default CommentsForm