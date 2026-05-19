import { useEffect, useState } from "react";

type LantaiType = {
  lantai: number;
  panjang: string;
  lebar: string;
  samakanDengan: string;
};

export default function KalkulatorBangunan() {
  // jumlah lantai
  const [jumlahLantai, setJumlahLantai] =
    useState("1");

  const totalLantai = Number(
    jumlahLantai || 1
  );

  // data lantai
  const [lantaiData, setLantaiData] =
    useState<LantaiType[]>([
      {
        lantai: 1,
        panjang: "",
        lebar: "",
        samakanDengan: "",
      },
    ]);

  // generate lantai otomatis
  useEffect(() => {
    const newData: LantaiType[] = [];

    for (let i = 1; i <= totalLantai; i++) {
      const existing = lantaiData.find(
        (x) => x.lantai === i
      );

      newData.push(
        existing || {
          lantai: i,
          panjang: "",
          lebar: "",
          samakanDengan: "",
        }
      );
    }

    setLantaiData(newData);
  }, [totalLantai]);

  // update input
  const updateLantai = (
    lantai: number,
    field: keyof LantaiType,
    value: string
  ) => {
    setLantaiData((prev) =>
      prev.map((item) =>
        item.lantai === lantai
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  // samakan ukuran
  const handleSamakanUkuran = (
    currentLantai: number,
    targetLantai: string
  ) => {
    // manual mode
    if (targetLantai === "") {
      setLantaiData((prev) =>
        prev.map((item) =>
          item.lantai === currentLantai
            ? {
                ...item,
                samakanDengan: "",
              }
            : item
        )
      );

      return;
    }

    const target = lantaiData.find(
      (x) => x.lantai === Number(targetLantai)
    );

    if (!target) return;

    setLantaiData((prev) =>
      prev.map((item) =>
        item.lantai === currentLantai
          ? {
              ...item,
              samakanDengan: targetLantai,
              panjang: target.panjang,
              lebar: target.lebar,
            }
          : item
      )
    );
  };

  // total luas
  const totalLuas = lantaiData.reduce(
    (acc, item) => {
      return (
        acc +
        Number(item.panjang || 0) *
          Number(item.lebar || 0)
      );
    },
    0
  );

  // harga kerja dasar
  const hargakerja = 200000;

  // multiplier harga
  let multiplier = 1;

  if (
    totalLantai >= 2 &&
    totalLantai <= 3
  ) {
    multiplier = 1.1;
  } else if (
    totalLantai >= 4 &&
    totalLantai <= 5
  ) {
    multiplier = 1.2;
  } else if (
    totalLantai >= 6 &&
    totalLantai <= 7
  ) {
    multiplier = 1.3;
  }

  const finalHargaKerja =
    hargakerja * multiplier;

  const total_harga =
    totalLuas * finalHargaKerja;

  return (
  <div
    className="
      max-w-7xl
      mx-auto
      px-4 md:px-6
    "
  >
    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-3
        gap-6
        items-start
      "
    >

      {/* =========================
          LEFT CONTENT
      ========================== */}
      <div className="lg:col-span-2 space-y-6 max-h-[85vh] overflow-y-auto pr-2">

        {/* JUMLAH LANTAI */}
        <div
          className="
            bg-white/80
            backdrop-blur-md
            border border-gray-200
            rounded-3xl
            p-5 md:p-6
            shadow-lg
          "
        >
          <label
            className="
              font-semibold
              text-sm md:text-base
              text-gray-700
            "
          >
            Jumlah Lantai
          </label>

          <input
            type="number"
            min={1}
            value={jumlahLantai}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "") {
                setJumlahLantai("");
                return;
              }

              setJumlahLantai(value);
            }}
            className="
              w-full
              border border-gray-300
              rounded-2xl
              p-3
              mt-3
              text-sm md:text-base
              outline-none
              transition
              focus:ring-2
              focus:ring-purple-400
              focus:border-purple-400
            "
          />
        </div>

        {/* FORM PER LANTAI */}
        {lantaiData.map((item) => (
          <div
            key={item.lantai}
            className="
              bg-white/80
              backdrop-blur-md
              border border-gray-200
              rounded-3xl
              p-5 md:p-6
              shadow-lg
              space-y-5
            "
          >

            {/* HEADER */}
            <div className="flex items-center justify-between">
              <h2
                className="
                  text-xl md:text-2xl
                  font-black
                  text-gray-800
                "
              >
                Lantai {item.lantai}
              </h2>

              <div
                className="
                  px-4 py-1
                  rounded-full
                  bg-purple-100
                  text-[#8B5CF6]
                  text-sm
                  font-semibold
                "
              >
                {
                  (
                    Number(item.panjang || 0) *
                    Number(item.lebar || 0)
                  ).toFixed(2)
                } m²
              </div>
            </div>

            {/* DROPDOWN */}
            {item.lantai > 1 && (
              <div>
                <label
                  className="
                    font-semibold
                    text-sm md:text-base
                    text-gray-700
                  "
                >
                  Samakan Ukuran
                </label>

                <select
                  value={item.samakanDengan}
                  onChange={(e) =>
                    handleSamakanUkuran(
                      item.lantai,
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border border-gray-300
                    rounded-2xl
                    p-3
                    mt-3
                    text-sm md:text-base
                    outline-none
                    transition
                    focus:ring-2
                    focus:ring-purple-400
                    focus:border-purple-400
                  "
                >
                  <option value="">
                    Manual
                  </option>

                  {lantaiData
                    .filter(
                      (x) =>
                        x.lantai < item.lantai
                    )
                    .map((x) => (
                      <option
                        key={x.lantai}
                        value={x.lantai}
                      >
                        Lantai {x.lantai}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* GRID INPUT */}
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
              "
            >

              {/* PANJANG */}
              <div>
                <label
                  className="
                    font-semibold
                    text-sm md:text-base
                    text-gray-700
                  "
                >
                  Panjang Ruangan (m)
                </label>

                <input
                  type="number"
                  value={item.panjang}
                  disabled={
                    item.samakanDengan !== ""
                  }
                  onChange={(e) =>
                    updateLantai(
                      item.lantai,
                      "panjang",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border border-gray-300
                    rounded-2xl
                    p-3
                    mt-3
                    text-sm md:text-base
                    outline-none
                    transition
                    focus:ring-2
                    focus:ring-purple-400
                    focus:border-purple-400
                    disabled:bg-gray-100
                    disabled:cursor-not-allowed
                  "
                />
              </div>

              {/* LEBAR */}
              <div>
                <label
                  className="
                    font-semibold
                    text-sm md:text-base
                    text-gray-700
                  "
                >
                  Lebar Ruangan (m)
                </label>

                <input
                  type="number"
                  value={item.lebar}
                  disabled={
                    item.samakanDengan !== ""
                  }
                  onChange={(e) =>
                    updateLantai(
                      item.lantai,
                      "lebar",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border border-gray-300
                    rounded-2xl
                    p-3
                    mt-3
                    text-sm md:text-base
                    outline-none
                    transition
                    focus:ring-2
                    focus:ring-purple-400
                    focus:border-purple-400
                    disabled:bg-gray-100
                    disabled:cursor-not-allowed
                  "
                />
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* =========================
          RIGHT SIDEBAR
      ========================== */}
      <div className="lg:col-span-1">

        <div
          className="
            sticky
            top-28
            bg-white
            border border-gray-200
            rounded-3xl
            p-6
            shadow-xl
            space-y-6
          "
        >

          {/* TITLE */}
          <div>
            <h2
              className="
                text-2xl
                font-black
                text-gray-900
              "
            >
              Estimasi Harga
            </h2>

            <div
              className="
                w-16
                h-1
                bg-[#8B5CF6]
                rounded-full
                mt-4
              "
            ></div>
          </div>

          {/* TOTAL LUAS */}
          <div
            className="
              bg-gray-50
              rounded-2xl
              p-5
            "
          >
            <p className="text-sm text-gray-500">
              Total Luas
            </p>

            <h3
              className="
                text-3xl
                font-black
                mt-1
                text-gray-900
              "
            >
              {totalLuas.toFixed(2)} m²
            </h3>
          </div>

          {/* ESTIMASI */}
          <div
            className="
              bg-[#8B5CF6]
              rounded-2xl
              p-5
              text-white
            "
          >
            <p className="text-sm opacity-90">
              Estimasi Harga
            </p>

            <h3
              className="
                text-2xl md:text-3xl
                font-black
                mt-2
                break-words
              "
            >
              Rp
              {total_harga.toLocaleString(
                "id-ID"
              )}
            </h3>
          </div>

          {/* NOTE */}
          <div
            className="
              bg-blue-50
              border border-blue-200
              rounded-2xl
              p-4
            "
          >
            <p
              className="
                font-bold
                text-sm
                text-blue-700
                mb-2
              "
            >
              Noted
            </p>

            <p
              className="
                text-sm
                leading-relaxed
                text-gray-600
              "
            >
              Harga dapat berubah tergantung
              desain, kualitas material,
              kondisi lapangan, dan faktor
              lainnya. Silakan hubungi
              contact person untuk informasi
              lebih lanjut.
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
);
}
