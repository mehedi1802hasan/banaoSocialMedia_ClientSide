import React, { useContext, useEffect, useState } from 'react';
import { GiSelfLove } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Authentication/Provider';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const Media = () => {
  const {user}=useContext(AuthContext)
  const [media, setMedia] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const mediaPerPage = 5; 
  const totalPages = Math.ceil(media.length / mediaPerPage);
  const getmediaForCurrentPage = () => {
    const startIndex = (currentPage - 1) * mediaPerPage;
    const endIndex = startIndex + mediaPerPage;
    return media.slice(startIndex, endIndex);
  };
  useEffect(() => {
    // Fetch media data from the API link
    fetchComments()
  }, []);
  const fetchComments=()=>{
    fetch('https://banao-social-media-server-one.vercel.app/media')
      .then(response => response.json())
      .then(data => {
        // Sort the data by the "time" field in descending order
        data.sort((a, b) => new Date(b.time) - new Date(a.time));
        // Update the state with the fetched and sorted media data
        setMedia(data);
      })
      .catch(error => {
        console.error('Error fetching media data:', error);
      });
  }
  //////
const handleLike=(post)=>{
  console.log(post.like)
  const currentLike = parseInt(post.like, 10);
  console.log(currentLike)

 if(user){
   const addLike = {
    like: currentLike + 1,
  };
fetch(`https://banao-social-media-server-one.vercel.app/media/${post._id}`,{
    method:"PUT",
    headers:{
        'content-type':'application/json'
    },
    body:JSON.stringify(addLike)
})
.then(res=>res.json())
.then(data=>{
    console.log(data)
  if(data.modifiedCount>0){
    fetchComments();
    Swal.fire({
        title: ' send love!!',
        text: 'sending love  successfully ',
        icon: 'success',
        confirmButtonText: 'Okay'
      }) 
  }
})
///////////////



}
else{
  window.location.href = '/login';

}
 }


  return (
    <div className='mx-10 mt-5 mb-4'>
      <h3 className='text-center font-serif text-2xl font-semibold my-10 '>Total Available Post: {media.length}</h3>
      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-y-10 mb-8'>
        {getmediaForCurrentPage().map((post, index) => (
          <div className="card w-72 bg-base-100 shadow-xl " key={index}>
            <figure>
              <img className='h-44 w-64 hover:scale-105 duration-700' src={post.imageUrl} alt="image" />
            </figure>
            <div className='flex justify-between items-center mt-4 my-3 mx-5 72'>
              <h3 className="w-60">
                {post.textarea && post.textarea.split(' ').slice(0, 5).join(' ')}..
              </h3>
              <div className=" text-red-500">
                <button onClick={()=>handleLike(post)}  className='btn btn-outline rounded-3xl'>
                <span className='flex items-center gap-1'> <span className='text-md text-red-600'>{post.like}</span><span> <GiSelfLove /></span></span>
                </button>
              </div>
            </div>
            <Link to={`/media/${post._id}`} className='btn btn-outline btn-sm mb-3 w-1/2 mx-auto'>details</Link>

          </div>
        ))}
      </div>
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Media;
// disabled={buttonDisabled[index]}