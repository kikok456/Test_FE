export default function Vizdat() {
  return (
    <div className="space-y-6">
      {/* Top Box */}
      <div className="w-full flex flex-col md:flex-row gap-6">

        {/* Box 1 */}
      <div className="flex-1 bg-white rounded-2xl shadow-md p-4 md:p-6">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
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
