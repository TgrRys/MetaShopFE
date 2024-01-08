const CardMap = () => {
  return (
    <div className="relative w-full h-screen">
      <iframe
        className="top-0 left-0 w-full md:absolute h-1/2 md:h-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63245.984497713915!2d110.29690275340957!3d-7.803158274255978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5787bd5b6bc5%3A0x21723fd4d3684f71!2sYogyakarta%2C%20Kota%20Yogyakarta%2C%20Daerah%20Istimewa%20Yogyakarta!5e0!3m2!1sid!2sid!4v1702520418543!5m2!1sid!2sid"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
      <div className="flex flex-col items-end justify-center mt-4 md:flex-row md:justify-around md:pt-32 md:mt-0">
        <div className="relative flex-wrap hidden py-2 m-4 bg-white rounded shadow-md md:flex">
          <div className="px-6">
            <img
              src="https://lh5.googleusercontent.com/p/AF1QipMOgru7oLAD93SpKhMnHLFbaOR3O1jz6iiJ6Ovp=w408-h306-k-no"
              alt=""
            />
            <p className="mt-1 font-medium">
              Sleman, Yogyakarta, Indonesia
            </p>
          </div>
        </div>
        <div className="container flex px-5 mx-auto md:py-8">
          <div className="relative z-10 flex flex-col w-full p-8 mt-10 bg-white rounded-lg shadow-md md:w-1/2 md:ml-auto md:mt-0">
            <h2 className="mb-1 text-lg font-medium text-gray-900 title-font">
              Contact Us
            </h2>

            <div className="relative mb-4">
              <label htmlFor="email" className="text-sm leading-7 text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="text-sm leading-7 text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none resize-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
              ></textarea>
            </div>
            <button className="px-6 py-2 text-lg text-white bg-emerald-500 border-0 rounded focus:outline-none hover:bg-emerald-600">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMap;
