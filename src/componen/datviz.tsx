import React, {useEffect, useState,} from "react";

export default function Vizdat() {
    const [barangData, setBarangData] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // GET DATA
  // =====================================

  useEffect(() => {

    fetch(
      "https://test-be-chi-eight.vercel.app/api/data_lampung_summary"
    )
      .then(async (res) => {

        if (!res.ok) {
          throw new Error(
            "Gagal ambil data"
          );
        }

        return res.json();
      })
      .then((res) => {

        setBarangData(res);
      })
      .catch((err) => {

        console.error(err);

        alert(
          "Gagal ambil data"
        );
      })
      .finally(() => {

        setLoading(false);
      });

  }, []);

  // =====================================
  // FORMAT RUPIAH
  // =====================================

  const rupiah = (
    value: number
  ) => {

    return Number(value)
      .toLocaleString(
        "id-ID"
      );
  };
  return (
    <div className="space-y-6">
      {/* Top Box */}
      <div className="w-full flex flex-col md:flex-row gap-6">

        {/* Box 1 */}
      <div className="flex-1 bg-white rounded-2xl shadow-md p-4 md:p-6">
        <div
          className="
            flex
            items-center
            justify-between
            mb-4
          "
        >

          <h1
            className="
              text-2xl
              font-bold
            "
          >
            Data Harga Barang
          </h1>

          <div
            className="
              text-sm
              text-gray-500
            "
          >
            Total:
            {" "}
            {barangData.length}
            {" "}
            barang
          </div>
        </div>

        {/* TABLE */}
        <div
          className="
            overflow-auto
          "
        >

          <table
            className="
              w-full
              border
              border-gray-300
              text-sm
            "
          >

            <thead
              className="
                bg-gray-100
              "
            >

              <tr>

                <th
                  className="
                    border
                    px-3
                    py-2
                    text-left
                  "
                >
                  Nama Barang
                </th>

                <th
                  className="
                    border
                    px-3
                    py-2
                    text-left
                  "
                >
                  Harga Tertinggi
                </th>

                <th
                  className="
                    border
                    px-3
                    py-2
                    text-left
                  "
                >
                  Harga Terendah
                </th>

                <th
                  className="
                    border
                    px-3
                    py-2
                    text-left
                  "
                >
                  Pembelian Terakhir
                </th>

                <th
                  className="
                    border
                    px-3
                    py-2
                    text-left
                  "
                >
                  Nama Toko
                </th>

              </tr>
            </thead>

            <tbody>

              {/* LOADING */}
              {loading && (

                <tr>

                  <td
                    colSpan={5}
                    className="
                      border
                      px-3
                      py-6
                      text-center
                    "
                  >
                    Loading...
                  </td>
                </tr>
              )}

              {/* EMPTY */}
              {!loading &&
                barangData.length === 0 && (

                <tr>

                  <td
                    colSpan={5}
                    className="
                      border
                      px-3
                      py-6
                      text-center
                    "
                  >
                    Tidak ada data
                  </td>
                </tr>
              )}

              {/* DATA */}
              {!loading &&
                barangData.map(
                  (
                    item,
                    i
                  ) => (

                    <tr
                      key={i}
                      className="
                        hover:bg-gray-50
                      "
                    >

                      {/* NAMA BARANG */}
                      <td
                        className="
                          border
                          px-3
                          py-2
                        "
                      >
                        {
                          item.nama_barang
                        }
                      </td>

                      {/* HARGA TERTINGGI */}
                      <td
                        className="
                          border
                          px-3
                          py-2
                        "
                      >
                        Rp
                        {" "}
                        {rupiah(
                          item.harga_tertinggi
                        )}
                      </td>

                      {/* HARGA TERENDAH */}
                      <td
                        className="
                          border
                          px-3
                          py-2
                        "
                      >
                        Rp
                        {" "}
                        {rupiah(
                          item.harga_terendah
                        )}
                      </td>

                      {/* PEMBELIAN TERAKHIR */}
                      <td
                        className="
                          border
                          px-3
                          py-2
                        "
                      >
                        {
                          item.waktu_pengeluaran
                        }
                      </td>

                      {/* TOKO */}
                      <td
                        className="
                          border
                          px-3
                          py-2
                        "
                      >
                        {
                          item.nama_toko
                        }
                      </td>

                    </tr>
                  )
                )}

            </tbody>
          </table>
        </div>
      </div>

      {/* Box 2 */}
      <div className="flex-1 bg-white rounded-2xl shadow-md p-4 md:p-6">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Box 3 */}
      <div className="flex-1 bg-white rounded-2xl shadow-md p-4 md:p-6">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

    </div>
    
      {/* Bottom Grid */}
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

    </div>
    </div>
  );
}
