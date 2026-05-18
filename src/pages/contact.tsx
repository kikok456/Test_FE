import logo2 from "../assets/logo2.png";
import { Mail } from "lucide-react";

export default function Contactus() {
  return (
    <div className="w-full flex justify-center px-3 py-5">
      <div
        className="
          w-full
          backdrop-blur-md
          border
          border-white/30
          p-4 md:p-6
        "
      >
        <div
          className="
            flex
            flex-col
            sm:flex-row
            items-center
            gap-5
          "
        >
          {/* LOGO */}
          <div className="shrink-0">
            <div
              className="
                w-[90px]
                h-[90px]
                md:w-[110px]
                md:h-[110px]
                rounded-2xl
                bg-gradient-to-br
                from-[#6E1170]/10
                to-purple-100
                flex
                items-center
                justify-center
                shadow-inner
              "
            >
              <img
                src={logo2}
                alt="logo"
                className="
                  w-[60px]
                  md:w-[75px]
                  object-contain
                  drop-shadow-sm
                "
              />
            </div>
          </div>

          {/* CONTENT */}
          <div
            className="
              flex-1
              text-center
              sm:text-left
            "
          >
            {/* TITLE */}
            <div className="space-y-0.5">
              <h1
                className="
                  text-xl
                  md:text-2xl
                  font-black
                  tracking-tight
                  text-[#6E1170]
                  leading-tight
                "
              >
                Elkyas
              </h1>

              <h2
                className="
                  text-lg
                  md:text-xl
                  font-semibold
                  text-gray-800
                  leading-tight
                "
              >
                Karya Agung.
              </h2>
            </div>

            {/* LINE */}
            <div
              className="
                w-16
                h-[3px]
                bg-gradient-to-r
                from-[#6E1170]
                to-purple-400
                rounded-full
                mt-3
                mx-auto
                sm:mx-0
              "
            />

            {/* DESCRIPTION */}
            <p
              className="
                text-gray-500
                text-xs
                md:text-sm
                leading-relaxed
                mt-3
              "
            >
              Hubungi kami dibawah ini:.
            </p>

            {/* CONTACT */}
            <div
              className="
                mt-4
                flex
                flex-col
                gap-2.5
              "
            >
              {/* EMAIL */}
              <div
                className="
                  flex
                  items-center
                  gap-3
                  bg-white
                  rounded-xl
                  px-3
                  py-2.5
                  shadow-sm
                  border
                  border-gray-100
                "
              >
                <div
                  className="
                    w-8
                    h-8
                    rounded-lg
                    bg-[#6E1170]/10
                    flex
                    items-center
                    justify-center
                    text-[#6E1170]
                    text-sm
                    font-bold
                  "
                >
                 <Mail size={16} />
                </div>

                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-400">
                    Email
                  </span>

                  <span className="text-xs md:text-sm font-semibold text-gray-700 break-all">
                    elkyaskaryaagung@gmail.com
                  </span>
                </div>
              </div>

              {/* CONTACT */}
              <div
                className="
                  flex
                  items-center
                  gap-3
                  bg-white
                  rounded-xl
                  px-3
                  py-2.5
                  shadow-sm
                  border
                  border-gray-100
                "
              >
                <div
                  className="
                    w-8
                    h-8
                    rounded-lg
                    bg-[#6E1170]/10
                    flex
                    items-center
                    justify-center
                    text-[#6E1170]
                    text-sm
                    font-bold
                  "
                >
                  ☎
                </div>

                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-400">
                    Contact
                  </span>

                  <span className="text-xs md:text-sm font-semibold text-gray-700">
                    +62 851-5626-3100
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
