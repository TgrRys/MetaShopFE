// export const HeroSection = () => {
//   return (
//     <section>
//       <div className="sm:grid grid-cols-5 px-4 py-6 min-h-full space-y-6 sm:space-y-0 sm:gap-4">
//         <div className="h-72 col-span-4 bg-gradient-to-tr from-indigo-800 to-indigo-500 rounded-md flex items-center">
//           <div className="ml-20 w-80">
//             <h2 className="text-white text-4xl">Adsla</h2>
//             <p className="text-indigo-100 mt-4 capitalize font-thin tracking-wider leading-7">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
//               dolore?
//             </p>
//             <a
//               href="#"
//               className="uppercase inline-block mt-8 text-sm bg-white py-2 px-4 rounded font-semibold hover:bg-indigo-100"
//             >
//               get start
//             </a>
//           </div>
//         </div>
//         <div className="h-72 col-span-1 bg-white shadow-lg">
//           <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">
//             <input
//               type="text"
//               placeholder="seach"
//               className=" bg-gray-100 rounded-md  outline-none pl-2 ring-indigo-700 w-full mr-2 p-2"
//             />
//             <span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor "
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </span>
//           </div>
//           <div className="bg-white  rounded-md">
//             <h1 className="text-center text-xl my-4  bg-white py-2 rounded-md border-b-2 cursor-pointer  text-gray-600">
//               Category
//             </h1>
//             <div className="bg-white list-none  text-center ">
//               <li className="py-3 border-b-2">
//                 <a href="#" className="list-none  hover:text-indigo-600">
//                   Men
//                 </a>
//               </li>
//               <li className="py-3 border-b-2">
//                 <a href="#" className="list-none  hover:text-indigo-600">
//                   Women
//                 </a>
//               </li>
//               <li className="py-3 ">
//                 <a
//                   href="#"
//                   className="list-none border-b-2 hover:text-indigo-600"
//                 >
//                   Kid
//                 </a>
//               </li>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

export const HeroSection = () => {
  return (
    <div className="max-w-screen-xxl mx-auto my-2">
      <div className="flex flex-col items-center text-white bg-gray-900 shadow-lg to sm:flex-row">
        <img
          className="object-cover w-full h-72 sm:w-1/3"
          src="https://images.unsplash.com/photo-1637441511291-d5994ea09a6c?auto=format&fit=crop&q=80&w=1632&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />

        <div className="w-full px-4 py-32 mx-auto text-center sm:h-full sm:w-1/3 sm:py-4">
          <h1 className="text-3xl font-medium text-center uppercase sm:text-2xl lg:text-4xl xl:text-5xl">
            Buy&apos;s the best <br /> clothes for you
          </h1>
          <button
            type="button"
            className="mt-10 text-gray-200 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm px-8 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Show More
          </button>
        </div>

        <img
          className="object-cover w-full h-72 sm:w-1/3"
          src="https://images.unsplash.com/photo-1676372971824-ed309f425e21?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8"
          alt=""
        />
      </div>
    </div>
  );
};
