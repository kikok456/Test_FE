import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import gambar2 from "../assets/bb.jpg";
import gambar3 from "../assets/bb2.webp";
import gambar4 from "../assets/bb3.jpg";

const images = [gambar2, gambar3, gambar4];

export default function AboutUs() {
  return (
    <div className="space-y-6">
      <div className="w-full flex gap-6">

        {/* Box 1 */}
        <div className="basis-[30%] rounded-2xl">
          <p
            className="
              mt-6
              text-base md:text-xl
              leading-relaxed
              text-gray-600
              max-w-2xl
            "
          >
            Material berkualitas dan tenaga profesional
            untuk membantu proyek berjalan lebih cepat,
            kuat, dan terpercaya.
          </p>
        </div>

        {/* Box 2 */}
        <div className="basis-[70%] min-w-0 rounded-2xl overflow-hidden">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            loop={true}

            autoplay={{
              delay: 3000, // jeda antar slide
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}

            speed={800} // durasi animasi slide

            className="w-full rounded-2xl"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`slide-${index}`}
                  className="
                    w-full
                    h-[250px]
                    object-cover
                    rounded-xl
                  "
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </div>
  );
}
