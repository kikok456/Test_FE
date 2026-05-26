import {
  useEffect,
  useState,
} from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DailyLine() {

  const [chartData, setChartData] =
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

        // ==============================
        // GROUP BY TANGGAL
        // ==============================

        const grouped: any = {};

        res.forEach((item: any) => {

          const tanggal =
            String(item.waktu_pengeluaran)
              .split(" ")[0];

          const total =
            Number(item.total) || 0;

          if (!grouped[tanggal]) {
            grouped[tanggal] = 0;
          }

          grouped[tanggal] += total;
        });

        // ==============================
        // FORMAT CHART DATA
        // ==============================

        const formatted =
          Object.keys(grouped)
            .sort()
            .map((tanggal) => ({

              tanggal,
              total: grouped[tanggal],
            }));

        setChartData(formatted);
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

    return new Intl.NumberFormat(
      "id-ID"
    ).format(value);
  };

  // =====================================
  // RENDER
  // =====================================

  return (

    <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">

      {/* HEADER */}
      <div className="mb-4">

        <h2 className="text-xl font-bold">
          Pengeluaran Harian
        </h2>

        <p className="text-sm text-gray-500">
          Summary total pengeluaran per hari
        </p>
      </div>

      {/* LOADING */}
      {loading && (

        <div className="py-10 text-center">
          Loading...
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        chartData.length === 0 && (

        <div className="py-10 text-center">
          Tidak ada data
        </div>
      )}

      {/* CHART */}
      {!loading &&
        chartData.length > 0 && (

        <div style={{ width: "100%", height: 400 }}>

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart
              data={chartData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="tanggal"
              />

              <YAxis
                tickFormatter={(value) =>
                  rupiah(Number(value))
                }
              />

              <Tooltip
                formatter={(value: any) =>
                  `Rp ${rupiah(Number(value))}`
                }
              />

              <Line
                type="monotone"
                dataKey="total"
                stroke="#2563eb"
                strokeWidth={3}
              />

            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
