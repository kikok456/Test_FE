import Vizdat from "./datviz";
import AboutUs from "./aboutus";
import UploadEx from "../pages/uploadEx";
import Contactus from "../pages/contact";
import KalkulatorBangunan from "../pages/calc";

type Props = { isLogin: boolean };

export default function Content({ isLogin }: Props) {
  return (
    <div className="space-y-16 px-4 md:px-8 lg:px-12 py-6">

      {/* About Us */}
<section
  id="about-us"
  className="scroll-mt-24"
>
  <div className="mb-10 max-w-4xl">

    <h2
      className="
        text-4xl md:text-6xl
        font-black
        leading-[1.1]
        tracking-tight
        text-gray-900
      "
    >
      Bangun proyek
      <br />

      <span className="text-[#8B5CF6]"> 
        tanpa kompromi
      </span>
    </h2>

    <div className="w-24 h-[4px] bg-[#8B5CF6] rounded-full mt-7"></div>

  </div>

  <AboutUs />
</section>



      {/* Check Harga */}
      <section
        id="check-harga"
        className="scroll-mt-24"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800">
            Check Harga
          </h2>

          <p className="mt-2 text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
            Cek estimasi harga material bangunan secara cepat dan praktis.
          </p>

          <div className="w-24 h-1 bg-[#8B5CF6] mx-auto rounded-full mt-4"></div>
        </div>

        <KalkulatorBangunan />
      </section>

      {/* Check Data */}
      <section
        id="check-data"
        className="scroll-mt-24"
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
      </section>

      {/* Upload Data */}
      {isLogin && (
        <section
          id="upload-data"
          className="scroll-mt-24"
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
        className="scroll-mt-24"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800">
            Hubungi Kami
          </h2>

          <p className="mt-2 text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
            Hubungi tim kami untuk konsultasi, pemesanan,
            maupun pertanyaan lainnya.
          </p>

          <div className="w-24 h-1 bg-[#8B5CF6] mx-auto rounded-full mt-4"></div>
        </div>

        <Contactus />
      </section>
    </div>
  );
}
