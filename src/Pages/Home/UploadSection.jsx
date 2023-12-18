// import React, {  } from 'react';
import React, {useContext, useRef, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

import Swal from 'sweetalert2';
import { AuthContext } from '../../Authentication/Provider';
// import { FaFolderPlus } from 'react-icons/fa';
// import { Fade } from 'react-awesome-reveal';
import { TypeAnimation } from 'react-type-animation';
const UploadSection = ({fetchComments}) => {
    const { user } = useContext(AuthContext);
    const [dateTime, setDateTime] = useState(new Date());
    const formRef = useRef(null); 
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const textarea = form.textarea.value;
        const like = form.like.value;
        const time = dateTime.toISOString();
        const image = form.image.files[0];
        const formData = new FormData();
        formData.append("image", image);
       
        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_KEY}`;
        fetch(url, {
            method: "POST",
            body: formData,
        })
        .then(res => res.json())
        .then(imageData => {
            const imageUrl = imageData.data.display_url;

            if (user) {
                const addMedia = {
                    textarea,
                    imageUrl,
                    like,
                    time,
                };
                console.log(addMedia);
                fetch(' https://banao-social-media-server-one.vercel.app/media', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(addMedia),
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        Swal.fire({
                            title: 'Great!',
                            text: 'Your media Successfully Posted',
                            icon: 'success',
                            confirmButtonText: 'Done'
                        }).then(() => {
                            // Call fetchComments after the Swal popup is closed
                            fetchComments();
                        });
                    }
                });
                

            } else {
                window.location.href = '/login';
            }
        })
        .catch(error => {
            console.log(error.message);
        });
        form.reset();
    };

    return (
      <div>
         {/* <h3 className='text-gray-600 mt-7 font-semibold font-serif text-2xl text-center'>
         <Fade duration={1400} cascade damping={1e-1}> Express Yourself with Photos and Text</Fade>
          </h3> */}

<div className="md:w-96 mx-auto mt-6 px-5">
  <TypeAnimation
    sequence={[
      'Express Yourself with Text📝',
      1000,
      'Text with Photos 📷📝',
      1000,
      'Express Yourself with Photos📷',
      () => {
        console.log('Sequence completed');
      },
    ]}
    wrapper="span"
    cursor={true}
    repeat={Infinity}
    style={{
      fontFamily: 'serif', // Replace with your desired font family
      fontSize: '20px',
      fontWeight: '600', // Set the font weight to "semibold"
      display: 'inline-block',
    }}
  />
</div>








          <div className='md:w-[450px] mx-auto '>
         
         <form onSubmit={handleSubmit} className='mt-2 mb-12 shadow-md shadow-orange-100 px-16 py-7'>
             <div>
                 <h3 className='mb-1 font-semibold font-serif'>Text:</h3>
                 <textarea placeholder="enter the text" name='textarea' className="textarea textarea-bordered textarea-sm w-full max-w-xs" required></textarea>
             </div>
             <div className="mb-4 hidden ">
          <DateTimePicker
            onChange={setDateTime}
            value={dateTime}
          />
        </div>
             <div className=''>
                 <input className='hidden' type="text" name="like" defaultValue='0' />
             </div>
             <div className='mt-1'>
             <h3 className='mb-1 font-semibold font-serif'>imageFile</h3>
                 <input name="image" accept='image/*' type="file" className=" file-input file-input-bordered file-input-warning w-full max-w-xs h-12" />
                {/* <p type='file' name="image" accept='image/*' type="file" > <FaFolderPlus/> <input type="" /></p> */}
             </div>
             <button className='btn btn-outline btn-md my-4' type='submit'>Submit</button>
         </form>
     </div>
      </div>
    );
};

export default UploadSection;
//name="image" accept='image/*' type="file" 
