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
        max-w-3xl
        mx-auto
        p-4 md:p-6
        rounded-2xl
        shadow-lg
        bg-white/40
        space-y-6
        max-h-[85vh]
        overflow-y-auto
        scroll-smooth
      "
    >
      {/* JUMLAH LANTAI */}
      <div>
        <label className="font-semibold text-sm md:text-base">
          Jumlah Lantai
        </label>

        <input
          type="number"
          min={1}
          value={jumlahLantai}
          onChange={(e) => {
            const value =
              e.target.value;

            if (value === "") {
              setJumlahLantai("");
              return;
            }

            setJumlahLantai(value);
          }}
          className="
            w-full
            border
            rounded-xl
            p-3
            mt-2
            text-sm
            md:text-base
          "
        />
      </div>

      {/* FORM PER LANTAI */}
      {lantaiData.map((item) => (
        <div
          key={item.lantai}
          className="
            border
            rounded-2xl
            p-4 md:p-5
            bg-white
            space-y-4
          "
        >
          <h2 className="text-lg md:text-xl font-bold">
            Lantai {item.lantai}
          </h2>

          {/* dropdown samakan ukuran */}
          {item.lantai > 1 && (
            <div>
              <label className="font-semibold text-sm md:text-base">
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
                  border
                  rounded-xl
                  p-3
                  mt-2
                  text-sm
                  md:text-base
                "
              >
                <option value="">
                  Manual
                </option>

                {lantaiData
                  .filter(
                    (x) =>
                      x.lantai <
                      item.lantai
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

          {/* panjang */}
          <div>
            <label className="font-semibold text-sm md:text-base">
              Panjang Ruangan (m)
            </label>

            <input
              type="number"
              value={item.panjang}
              disabled={
                item.samakanDengan !==
                ""
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
                border
                rounded-xl
                p-3
                mt-2
                text-sm
                md:text-base
                disabled:bg-gray-100
                disabled:cursor-not-allowed
              "
            />
          </div>

          {/* lebar */}
          <div>
            <label className="font-semibold text-sm md:text-base">
              Lebar Ruangan (m)
            </label>

            <input
              type="number"
              value={item.lebar}
              disabled={
                item.samakanDengan !==
                ""
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
                border
                rounded-xl
                p-3
                mt-2
                text-sm
                md:text-base
                disabled:bg-gray-100
                disabled:cursor-not-allowed
              "
            />
          </div>

          {/* luas */}
          <div className="bg-gray-100 rounded-xl p-3">
            <p className="text-sm md:text-base">
              Luas :
              <b>
                {" "}
                {(
                  Number(
                    item.panjang || 0
                  ) *
                  Number(
                    item.lebar || 0
                  )
                ).toFixed(2)}{" "}
                m²
              </b>
            </p>
          </div>
        </div>
      ))}

      {/* OUTPUT */}
      <div className="bg-gray-100 rounded-2xl p-4 md:p-5 space-y-4">
        <div className="space-y-2">
          <p className="text-base md:text-lg">
            Total Luas :
            <b>
              {" "}
              {totalLuas.toFixed(2)} m²
            </b>
          </p>

          {/* <p className="text-base md:text-lg">
            Harga Kerja / m² :
            <b>
              {" "}
              Rp
              {finalHargaKerja.toLocaleString(
                "id-ID"
              )}
            </b>
          </p> */}

          <p className="text-base md:text-lg">
            Estimasi Harga :
            <b>
              {" "}
              Rp
              {total_harga.toLocaleString(
                "id-ID"
              )}
            </b>
          </p>
        </div>

        {/* NOTE */}
        <div
          className="
            bg-yellow-100
            border
            border-yellow-300
            p-4
            rounded-xl
          "
        >
          <p className="font-semibold text-sm md:text-base">
            Noted :
          </p>

          <p className="text-xs md:text-sm">
            Harga bisa berubah tergantung
            design, kualitas material,
            kondisi lapangan, dan
            faktor lainnya, harap hubungi contact person yang tertera
          </p>
        </div>
      </div>
    </div>
  );
}
