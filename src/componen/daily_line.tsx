import {
  useEffect,
  useState,
} from "react";

import * as Recharts from "recharts";

export default function DailyLine() {

  const [chartData, setChartData] =
    useState<any[]>([]);

  useEffect(() => {

    fetch(
      "https://test-be-chi-eight.vercel.app/api/dt_lampung_supabase"
    )
      .then((res) => res.json())
      .then((res) => {

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

        const formatted =
          Object.keys(grouped)
            .sort()
            .map((tanggal) => ({

              tanggal,
              total: grouped[tanggal],
            }));

        setChartData(formatted);
      });

  }, []);

  return (

    <div className="bg-white rounded-2xl shadow-md p-4">

      <h2 className="text-xl font-bold mb-4">
        Pengeluaran Harian
      </h2>

      <LineChart
        width={800}
        height={400}
        data={chartData}
      >

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="tanggal" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="total"
          stroke="#2563eb"
        />

      </LineChart>
    </div>
  );
}
