import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import gambar1 from "../assets/g1.jpg";
import gambar2 from "../assets/g2.jpg";
import gambar3 from "../assets/g3.jpg";
import gambar4 from "../assets/g4.jpg";

const images = [gambar1, gambar2, gambar3, gambar4];

export default function AboutUs() {
  return (
    <div className="space-y-6">
      <div className="w-full flex gap-6">

        {/* Box 1 */}
        <div className="basis-[50%] rounded-2xl">
            <div className="mb-10 max-w-4xl">

    <h2
      className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight text-gray-900">
      Bangun proyek
      <br />

      <span className="text-[#8B5CF6]"> 
        tanpa kompromi
      </span>
    </h2>

    <div className="w-24 h-[4px] bg-[#8B5CF6] rounded-full mt-7"></div>

  </div>
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
        <div className="basis-[50%] min-w-0 rounded-2xl overflow-hidden">
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
