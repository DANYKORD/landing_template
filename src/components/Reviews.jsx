import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Reviews() {
  const config = window.CONFIG;
  const images = config.reviews.map(r => r.avatarImage || r);

  return (
    <div className="bg-gray-50 py-8 border-b border-gray-200">
      <div className="px-4 mb-6 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-wide">{config.uiText.reviews.title}</h2>
        <div className="text-gray-700 mt-2 font-medium text-lg">{config.uiText.reviews.subtitle}</div>
        <div className="mt-3 bg-gray-200 h-2.5 rounded-full overflow-hidden mx-auto max-w-[250px]">
          <div className="bg-blue-500 h-full w-[98%]"></div>
        </div>
      </div>
      
      <div className="relative px-4">
        <div className="overflow-hidden rounded-2xl shadow-sm border border-gray-200 bg-white relative group">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            className="w-full"
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img 
                  src={img} 
                  alt={`${config.uiText.reviews.reviewAlt} ${idx + 1}`} 
                  className="w-full h-auto object-cover block"
                  draggable={false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-button-next, .swiper-button-prev {
          color: #eab308 !important;
          background-color: rgba(255, 255, 255, 0.9);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: bold;
        }
        .swiper-pagination-bullet {
          background-color: #d1d5db !important;
          opacity: 1 !important;
          width: 10px;
          height: 10px;
          margin-top: 10px;
        }
        .swiper-pagination-bullet-active {
          background-color: #111827 !important;
        }
      `}} />
    </div>
  );
}
