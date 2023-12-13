const CardMap = () => {
  return (
    <div className="relative w-full h-screen">
      <iframe
        className="top-0 left-0 w-full md:absolute h-1/2 md:h-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38007.753094675754!2d-2.3515436080914704!3d53.45979950804628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bade198f6a2ab%3A0xa06b7a1e162e18f9!2sOld%20Trafford%2C%20Stretford%2C%20Manchester%2C%20UK!5e0!3m2!1sen!2sid!4v1694784327856!5m2!1sen!2sid"
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
              src="https://lh5.googleusercontent.com/p/AF1QipMB1NzNokckzZLlCuX3fFa0c-GiiMGwSuUushcl=w408-h306-k-no"
              alt=""
            />
            <p className="mt-1 font-medium">
              Old Trafford, Stretford, Manchester, UK
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
            <button className="px-6 py-2 text-lg text-white bg-blue-500 border-0 rounded focus:outline-none hover:bg-blue-600">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMap;
