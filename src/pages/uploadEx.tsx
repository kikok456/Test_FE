import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

export default function UploadEx() {
  const [data, setData] = useState<any[]>([]);
  const [tableList, setTableList] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // 🔥 ambil tabel dari backend
useEffect(() => {
  fetch("https://test-be-chi-eight.vercel.app/api/show_supabase")
    .then(async (res) => {

      if (!res.ok) {
        console.error("API ERROR:", res.status);
        return [];
      }

      return res.json();
    })
    .then((res) => {

      const tables = Array.isArray(res)
        ? res.map((t: any) => t.table_name)
        : [];

      setTableList(tables);
    })
    .catch((err) => {
      console.error("FETCH ERROR:", err);
      setTableList([]);
    });

}, []);

  // 🔥 handle upload
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();

    if (ext === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setData(result.data as any[]);
        },
      });
    } else if (ext === "xlsx" || ext === "xls") {
      const reader = new FileReader();

      reader.onload = (evt) => {
        const wb = XLSX.read(evt.target?.result, { type: "binary" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);
        setData(json);
      };

      reader.readAsBinaryString(file);
    }
  };

  // 🔥 reset
  const handleReset = () => {
    setData([]);
    setSelectedTable("");
    if (fileRef.current) fileRef.current.value = "";
  };

  // 🔥 simpan
  const handleSave = async () => {
    if (!selectedTable) {
      alert("Pilih tabel dulu!");
      return;
    }

    if (data.length === 0) {
      alert("Tidak ada data!");
      return;
    }

    try {
      const res = await fetch("https://test-be-chi-eight.vercel.app/api/upload_supabase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table: selectedTable,
          data,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Data berhasil disimpan!");
        handleReset(); // 🔥 auto reset
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error koneksi");
    }
  };

  return (
    <div className="p-4 border rounded">

      {/* Upload */}
      <div className="flex justify-center mb-4">
        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
          Upload File
          <input
            ref={fileRef}
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={handleFile}
            className="hidden"
          />
        </label>
      </div>

      {/* Dropdown tabel */}
      <div className="flex justify-center mb-4">
        <select
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">-- Pilih Tabel --</option>
          {tableList.map((tbl) => (
  <option
    key={tbl}
    value={tbl}
  >
    {tbl}
  </option>
))}
        </select>
      </div>

      {/* Table preview */}
      {data.length > 0 && (
        <div className="overflow-auto max-h-64 border mb-4">
          <table className="w-full border">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="border px-2 py-1">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val: any, idx) => (
                    <td key={idx} className="border px-2 py-1">
                      {String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Buttons */}
      {data.length > 0 && (
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>

          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
