import HargaBarangTable
from "../components/tb_dt_lampung";

export default function Vizdat() {

  return (

    <div className="space-y-6">

      {/* TOP */}
      <div
        className="
          w-full
          flex
          flex-col
          md:flex-row
          gap-6
        "
      >

        {/* BOX 1 */}
        <div className="flex-1">
          <HargaBarangTable />
        </div>

        {/* BOX 2 */}
        <div
          className="
            flex-1
            bg-white
            rounded-2xl
            shadow-md
            p-4
            md:p-6
          "
        >
          <p>
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>

        {/* BOX 3 */}
        <div
          className="
            flex-1
            bg-white
            rounded-2xl
            shadow-md
            p-4
            md:p-6
          "
        >
          <p>
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div
        className="
          w-full
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >

        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            p-4
            md:p-6
          "
        >
          <p>
            Lorem ipsum dolor sit amet.
          </p>
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            p-4
            md:p-6
          "
        >
          <p>
            Lorem ipsum dolor sit amet.
          </p>
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            p-4
            md:p-6
          "
        >
          <p>
            Lorem ipsum dolor sit amet.
          </p>
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            p-4
            md:p-6
          "
        >
          <p>
            Lorem ipsum dolor sit amet.
          </p>
        </div>

      </div>
    </div>
  );
}
