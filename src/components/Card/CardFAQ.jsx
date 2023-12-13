import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const faqs = [
  {
    question: '1. Apa itu Metashop?',
    answer: 'Metashop adalah platform Ecommerce yang menyediakan solusi end-to-end untuk memudahkan pengguna dalam membangun, mengelola, dan mengoptimalkan toko online mereka. Dengan Metashop, Anda dapat membuat toko online yang menarik dengan mudah, serta mengelola inventaris, pesanan, dan pelanggan secara efisien.'
  },
  {
    question: '2. Apakah Metashop mendukung berbagai jenis pembayaran?',
    answer: 'Ya, Metashop mendukung berbagai opsi pembayaran termasuk kartu kredit, transfer bank, dan pembayaran digital lainnya. Kami terus berusaha untuk menambahkan opsi pembayaran baru guna memenuhi kebutuhan bisnis Anda.'
  },
  {
    question: '3. Apakah Metashop memiliki aplikasi seluler?',
    answer: 'Ya, Metashop menyediakan aplikasi seluler yang memungkinkan Anda mengelola toko online Anda secara efisien dari perangkat seluler. Anda dapat memantau pesanan, mengelola inventaris, dan melacak analitik di mana pun Anda berada.'
  },
  {
    question: '4. Apakah Metashop mematuhi peraturan keamanan data dan privasi?',
    answer: 'Ya, Metashop memprioritaskan keamanan data dan privasi. Kami mengikuti standar keamanan industri dan peraturan privasi untuk melindungi informasi pelanggan dan data bisnis.'
  },
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <div className="py-6 grid place-items-center">
      <div className="max-w-full mx-2 sm:mx-8">
        <div className="bg-white p-5 sm:p-10 shadow-sm rounded-xl">
          <div className="">
            <h1 className="font-extrabold text-gray-800 text-2xl ml-5">FAQ&apos;s</h1>
            <div className="h-1 bg-blue-500 rounded-full w-1/6"></div>
          </div>
          <div className="mt-14 ml-4 sm:ml-24">
            {faqs.map((faq, index) => (
              <div key={index} className="transition">
                <div className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16" onClick={() => handleClick(index)}>
                  <FontAwesomeIcon icon={activeIndex === index ? faMinus : faPlus} className="text-blue-700" />
                  <h2 className="text-gray-700 font-semibold">{faq.question}</h2>
                </div>
                <div className={`accordion-content px-5 pt-0 overflow-hidden ${activeIndex === index ? 'max-h-screen' : 'max-h-0'} space-y-4 mr-4 text-sm`}>
                  <div className="flex flex-row ml-8 py-4">
                    <div className="flex w-1 bg-gradient-to-t from-blue-500 to-blue-400"></div>
                    <div className="flex-1 p-3">
                      <p className="pl-2 sm:pl-4 text-justify">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;