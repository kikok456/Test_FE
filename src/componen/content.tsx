import Vizdat from "../pages/dataviz";
import AboutUs from "./aboutus";
import UploadEx from "../pages/uploadEx";
import Contactus from "../pages/contact";
import KalkulatorBangunan from "../pages/calc";


type Props = { 
  isLogin: boolean;
  status: string; 
};

export default function Content({ isLogin, status, }: Props) {
  
  return (
    <div className="px-4 md:px-8 lg:px-12 py-6">

      {/* About Us */}
      <section id="about-us" className="scroll-mt-24">
        <AboutUs />
      </section>

      {/* Check Harga */}
      <section id="check-harga" className="scroll-mt-24 mt-[300px]">
        <div className="mb-10 max-w-4xl">

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4 py-2
              rounded-full
              bg-purple-100
              text-[#6E1170]
              text-sm
              font-semibold
              mb-5
            "
          >
            Estimasi Harga Bangunan
          </div>

          <h2
            className="
              text-4xl md:text-6xl
              font-black
              leading-[1.05]
              tracking-tight
              text-gray-900
            "
          >
            Hitung biaya
            <br />

            <span className="text-[#6E1170]">
              proyek Anda
            </span>
          </h2>

          <p
            className="
              mt-6
              text-base md:text-lg
              leading-relaxed
              text-gray-600
              max-w-2xl
            "
          >
            Estimasi cepat untuk membantu
            perencanaan pembangunan secara
            lebih praktis dan efisien.
          </p>

          <div
            className="
              w-24 h-[4px]
              bg-gradient-to-r
              from-[#6E1170]
              to-purple-400
              rounded-full
              mt-7
            "
          ></div>

        </div>

        <KalkulatorBangunan />
      </section>

      {/* Check Data */}
      {isLogin && status === "Admin" &&  (
      <section
        id="check-data"
        className="scroll-mt-24 mt-32"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800">
            Check Data
          </h2>

          <p className="mt-2 text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
            Visualisasi data material dan informasi pendukung lainnya.
          </p>

          <div className="w-24 h-1 bg-[#8B5CF6] mx-auto rounded-full mt-4"></div>
        </div>

        <Vizdat />
      </section>)}

      {/* Upload Data */}
      {isLogin && status === "Admin" &&  (
        <section
          id="upload-data"
          className="scroll-mt-24 mt-32"
        >
          <div className="mb-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800">
              Upload Data
            </h2>

            <p className="mt-2 text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
              Upload file Excel atau CSV untuk memperbarui data material.
            </p>

            <div className="w-24 h-1 bg-[#8B5CF6] mx-auto rounded-full mt-4"></div>
          </div>

          <UploadEx />
        </section>
      )}
            {/* Contact Us */}
        <section
          id="contact-us"
          className="scroll-mt-24 mt-32"
        >
          <div className="mb-12 max-w-4xl">

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4 py-2
                rounded-full
                bg-purple-100
                text-[#6E1170]
                text-sm
                font-semibold
                mb-5
              "
            >
              Konsultasi Proyek
            </div>

            <h2
              className="
                text-4xl md:text-6xl
                font-black
                leading-[1.05]
                tracking-tight
                text-gray-900
              "
            >
              Mari wujudkan
              <br />

              <span className="text-[#6E1170]">
                proyek Anda
              </span>
            </h2>

            <p
              className="
                mt-6
                text-base md:text-lg
                leading-relaxed
                text-gray-600
                max-w-2xl
              "
            >
              Diskusikan kebutuhan pembangunan,
              estimasi biaya, maupun konsultasi
              material bersama tim kami.
            </p>

            <div
              className="
                w-24 h-[4px]
                bg-gradient-to-r
                from-[#6E1170]
                to-purple-400
                rounded-full
                mt-7
              "
            ></div>

          </div>

          <Contactus />
        </section>
    </div>
  );
}
