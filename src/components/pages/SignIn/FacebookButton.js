import React from 'react';

const FacebookLoginButton = () => {
  return (
    <button 
      className=" flex justify-center items-center w-[50%] bg-layout-second text-white
      rounded-lg shadow-md px-6 py-2 text-sm font-medium transition-all
      hover:bg-primary/50"
      type='button'
    >
      <svg
        className="h-6 w-6 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 320 512"
      >
        <path
          d="M279.14 288l14.22-92.66h-88.91V141.34c0-25.35 12.42-50.06 52.24-50.06H293V6.26S262.19 0 231.36 0c-73.22 0-121.36 44.38-121.36 124.72V195.3H73.21V288h36.79v224h92.66V288z"
          fill="#1877F2"
        />
      </svg>
      <span>Facebook</span>
    </button>
  );
};

export default FacebookLoginButton;
