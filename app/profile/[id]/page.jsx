"use client"

import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import Profile from '@/components/Profile'

const OtherProfile = ({params}) => {

    const {data:session} = useSession();
    const [posts,setPosts] = useState([]);
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');

    useEffect(()=>{
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${params.id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        }
        if(session?.user.id) fetchPosts();
      },[]);

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s page`}
            data={posts}
            handleEdit={()=>{}}
            handleDelete={()=>{}}
        />
    )
}

export default OtherProfile