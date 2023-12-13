import FAQ from "../../components/Card/CardFaq";
import CardMap from "../../components/Card/CardMap";
import { HeroSection } from "../../components/Hero/Index";

const Home = () => {
  return (
    <div>
      <HeroSection />
        <div className="flex justify-center items-center">
          <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
            <div className="flex flex-col jusitfy-center items-center space-y-10">
              <h1 className="font-bold text-5xl">Product Categories</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 w-full">
                <div className="relative group flex justify-center items-center h-full w-full">
                  <img
                    className="object-center object-cover h-full w-full"
                    src="https://images.unsplash.com/photo-1588117260148-b47818741c74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                    alt="Photo by Mike Von on Unsplash"
                  />
                  <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 rounded py-3 w-36 bg-gray-200">
                    Women&apos;s
                  </button>
                  <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
                </div>
                <div className="flex flex-col space-y-4 md:space-y-8 mt-4 md:mt-0">
                  <div className="relative group flex justify-center items-center h-full w-full">
                    <img
                      className="object-center object-cover h-full w-full"
                      src="https://images.unsplash.com/photo-1527289631404-6b929d0a126f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGtpZCUyMG5pa2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=80"
                      alt="Kid image"
                    />
                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-gray-200 rounded">
                      Kids&apos;
                    </button>
                    <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
                  </div>
                  <div className="relative group flex justify-center items-center h-full w-full">
                    <img
                      className="object-center object-cover h-full w-full"
                      src="https://image.made-in-china.com/202f0j00oJqlmrCjwszH/Custom-Men-Women-Kids-Tracksuit-Solid-Matching-Family-Clothes.jpg"
                      alt="watch-image"
                    />
                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 rounded bg-gray-200">
                      ALL PRODUCTS
                    </button>
                    <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-gray-200 bg-opacity-50"></div>
                  </div>
                </div>
                <div className="relative group justify-center items-center h-full w-full hidden lg:flex">
                  <img
                    className="object-center object-cover h-full w-full"
                    src="https://i.pinimg.com/236x/80/33/18/803318ed61b44f69843712e17f7a72ac.jpg"
                    alt="Photo by Tyrell James on Unsplash"
                  />
                  <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-gray-200 rounded-lg">
                    Men&apos;s
                  </button>
                  <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-gray-200 rounded-lg bg-opacity-50"></div>
                </div>
                <div className="relative group flex justify-center items-center h-full w-full mt-4 md:hidden md:mt-8 lg:hidden">
                  <img
                    className="object-center object-cover h-full w-full hidden md:block"
                    src="https://i.pinimg.com/236x/80/33/18/803318ed61b44f69843712e17f7a72ac.jpg"
                    alt="Photo by Tyrell James on Unsplash"
                  />
                  <img
                    className="object-center object-cover h-full w-full md:hidden"
                    src="https://images.unsplash.com/photo-1606106040060-3c4322aaecda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2"
                  />
                  <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-gray-200 rounded-lg">
                    Men&apos; s
                  </button>
                  <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
                </div>
              </div>
              <div className="relative group hidden md:flex justify-center items-center h-full w-full mt-4 md:mt-8 lg:hidden">
                <img
                  className="object-center object-cover h-full w-full hidden md:block"
                  src="https://images.unsplash.com/photo-1606105961732-6332674f4ee6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                  alt="Photo by Tyrell James on Unsplash"
                />
                <img
                  className="object-center object-cover h-full w-full sm:hidden"
                  src="https://i.pinimg.com/236x/80/33/18/803318ed61b44f69843712e17f7a72ac.jpg"
                  alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2"
                />
                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                  Men&apos;
                </button>
                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      <section className="">
        <div className="mx-auto max-w-md sm:max-w-lg md:max-w-screen-xl">
          <div className="px-4 py-4 md:px-6 md:py-12 lg:px-20">
            <h1 className="text-center text-3xl font-semibold text-gray-800 lg:text-4xl">
              Our Best Selling Collection
            </h1>

            <div className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-3 lg:gap-8">
              <article className="bg-slate-50 p-8">
                <div className="">
                  <h2 className="text-xl text-gray-600">Mens &apos; Scotch</h2>
                  <p className="mt-2 text-xl font-semibold text-gray-800"></p>
                </div>
                <div className="mt-8 flex items-center justify-center md:mt-24">
                  <img
                    className=""
                    src="https://lzd-img-global.slatic.net/g/p/2988a6c53252186aa62dbd84545a5554.jpg_720x720q80.jpg"
                    alt=""
                  />
                </div>
              </article>
              <article className="bg-slate-50 p-8">
                <div className="">
                  <h2 className="text-xl text-gray-600">Mens&apos; Red</h2>
                  <p className="mt-2 text-xl font-semibold text-gray-800"></p>
                </div>
                <div className="mt-8 flex items-center justify-center md:mt-24">
                  <img
                    className=""
                    src="https://lzd-img-global.slatic.net/g/p/2988a6c53252186aa62dbd84545a5554.jpg_720x720q80.jpg"
                    alt=""
                  />
                </div>
              </article>
              <article className="bg-slate-50 p-8">
                <div className="">
                  <h2 className="text-xl text-gray-600">Mens&apos; Punk</h2>
                  <p className="mt-2 text-xl font-semibold text-gray-800"></p>
                </div>
                <div className="mt-8 flex items-center justify-center md:mt-24">
                  <img
                    src="https://lzd-img-global.slatic.net/g/p/2988a6c53252186aa62dbd84545a5554.jpg_720x720q80.jpg"
                    alt=""
                  />
                </div>
              </article>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-5 md:mt-6 md:grid-cols-2 md:gap-6 lg:mt-8 lg:gap-8">
              <article className="bg-slate-50 p-8">
                <div>
                  <h2 className="text-xl text-gray-600">Mens&apos; Black</h2>
                  <p className="mt-2 text-xl font-semibold text-gray-800"></p>
                </div>
                <div className="mt-28 flex items-center justify-center md:mt-3">
                  <img
                    src="https://lzd-img-global.slatic.net/g/p/2988a6c53252186aa62dbd84545a5554.jpg_720x720q80.jpg"
                    alt=""
                  />
                </div>
              </article>
              <article className="bg-slate-50 p-8">
                <div>
                  <h2 className="text-xl text-gray-600">Womens &apos; Brown</h2>
                  <p className="mt-2 text-xl font-semibold text-gray-800"></p>
                </div>
                <div className="mt-28 flex items-center justify-center md:mt-1">
                  <img
                    src="https://lzd-img-global.slatic.net/g/p/2988a6c53252186aa62dbd84545a5554.jpg_720x720q80.jpg"
                    alt=""
                  />
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-blueGray-50 py-2">
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Discover Your Style With Us.
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    Explore our wide range of clothing for Men, Women, and Kids.
                    Experience the best online shopping with us.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>
        <div className="container mx-auto px-4 pb-32 pt-32">
          {/* create div for title section make it bold and center and responsive */}
          <div className="flex flex-wrap text-center justify-center">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold">Our Service</h2>
              <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                We provide a wide range of high-quality clothes for Men, Women,
                and Kids. Enjoy fast shipping, easy returns, and quality
                guaranteed.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap pt-5">
            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                    <i className="fas fa-shipping-fast"></i>
                  </div>
                  <h6 className="text-xl font-semibold">Fast Shipping</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    We make sure you get your products as soon as possible
                    today. Fast and reliable shipping.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                    <i className="fas fa-exchange-alt"></i>
                  </div>
                  <h6 className="text-xl font-semibold">Easy Returns</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    We make sure you can return your products easily if you are
                    not satisfied with them.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                    <i className="fas fa-check"></i>
                  </div>
                  <h6 className="text-xl font-semibold">Quality Guaranteed</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    We make sure you get the best quality products from us.
                    Guaranteed quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="items-center my-5 mx-2 sm:mx-8 max-w-screen-2xl px-4 gap-4 md:flex xl:px-10 xl:gap-12 bg-gradient-to-l from-blue-500 to-blue-700 py-14 rounded-xl">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h1 className="text-2xl text-gray-100 font-semibold lg:text-3xl">
            Get notified when we launch new products
          </h1>
          <p className="text-gray-200 leading-relaxed text-center text-sm md:text-justify md:pr-12">
            We&apos;ll send you an email or text when we have new products in
            our store.
          </p>
        </div>
        <div className="mt-5 md:mt-0 flex-1 px-0 sm:px-4">
          <form className="items-center justify-center sm:flex">
            <input
              type="email"
              placeholder="Enter e-mail"
              className="text-gray-500 w-full p-2 rounded-md border outline-none focus:border-blue-800"
            />
            <button className="w-full mt-3 px-5 py-2 rounded-md text-white bg-blue-400 hover:bg-blue-600 outline-none shadow-md focus:shadow-none focus:ring-2 ring-offset-2 ring-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto">
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-200">
            Product updates, announcements, and discounts
          </p>
        </div>
      </section>
      <FAQ />
      <CardMap />
    </div>
  );
};

export default Home;
