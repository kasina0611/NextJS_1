'use client';

import { useState,useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({data,handleTagClick}) => {
  return(
    <div className="mt-16 flex-center prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts,setPosts] = useState([]);
  const [allPosts,setAllPosts] = useState([]);
  
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setPosts(data);
    setAllPosts(data);
  }

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
  }

  useEffect(()=>{
    if(searchText.length>0){
      const newPosts =  posts.filter((post)=>{
        if(post.prompt.includes(searchText)){
          return true;
        }
        if(post.tag.includes(searchText)){
          return true;
        }
        if(post.creator.username.includes(searchText)){
          return true;
        }
        return false;
      })
      setPosts(newPosts);
    }else{
      setPosts(allPosts);
    }
  },[searchText])
  
  useEffect(()=>{
    fetchPosts();
  },[]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="search"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed