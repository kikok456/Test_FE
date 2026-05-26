import {
  useEffect,
  useState,
} from "react";

export default function HargaBarangTable() {

  // =====================================
  // STATE
  // =====================================

  const [barangData, setBarangData] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // GET DATA
  // =====================================

  useEffect(() => {

    fetch(
      "https://test-be-chi-eight.vercel.app/api/dt_lampung_supabase"
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

  // =====================================
  // RENDER
  // =====================================

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-4
        md:p-6
      "
    >

      {/* HEADER */}
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
          max-h-[500px]
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
              sticky
              top-0
              z-10
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

                    {/* NAMA */}
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

                    {/* MAX */}
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

                    {/* MIN */}
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

                    {/* LAST */}
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
  );
}
