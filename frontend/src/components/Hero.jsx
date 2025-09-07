function Chip({ children, intent = "sky" }) {
  const base = "rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm";
  const map = {
    sky: "bg-sky-100 text-sky-700",
    lime: "bg-lime-100 text-lime-700",
    rose: "bg-rose-100 text-rose-700",
  };
  return <button className={`${base} ${map[intent]}`}>{children}</button>;
}

export default function Hero() {
  return (
    <section className="relative">
      {/* soft pattern background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(14,165,233,0.10),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(100,116,139,0.12),transparent_40%)]" />

      <div className="mx-auto max-w-screen-xl px-10 py-10 lg:py-14 grid lg:grid-cols-2 gap-110 items-start">
        {/* Left Column: Title, Subtitle, Quick Actions, and Notice Board */}
        <div className="w-[768px]">
          {/* Title + subtitle */}
          <div className="mb-6">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-800">
              eSahayak
            </h2>
            <p className="mt-2 max-w-3xl text-slate-600">
              “A single-window platform to support citizens by providing end-to-end
              services for welfare schemes and services.”
            </p>
          </div>

          {/* Left: Notice + quick actions */}
          <div className="space-y-6">
            {/* Quick actions */}
            <div className="flex flex-wrap gap-3">
              <Chip intent="sky">Latest Updates</Chip>
              <Chip intent="lime">eSahayak | mobile</Chip>
              <Chip intent="rose">EODB Dashboard</Chip>
            </div>

            {/* Notice board */}
            <div className="rounded-2xl bg-white shadow p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-slate-800">Notice</h3>
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <ul className="space-y-3 text-slate-600">
                <li>No new updates available.</li>
                <li className="opacity-70">
                  (Add your notices here. This card mimics the notice widget.)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Leader Welcome card (generalized) */}
        <aside className="rounded-2xl shadow-lg px-6 py-8 text-center bg-gradient-to-b from-teal-400 to-white min-h-[360px] max-w-[360px]">
          {/* Leader Image Placeholder */}
          <div className="flex justify-center mt-2 mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-slate-200 flex items-center justify-center text-slate-500 text-sm">
              Photo
            </div>
          </div>

          {/* Name & Title (generic placeholders) */}
          <h3 className="text-gray-800 font-semibold text-xl">[Leader Name]</h3>
          <p className="text-gray-600 text-base mb-3">[Designation]</p>

          {/* Welcome Title */}
          <h4 className="text-sky-700 font-bold text-xl mb-3">Welcome</h4>

          {/* Description */}
          <p className="text-base leading-7 text-slate-700">
            e-District single window portal is a Mission Mode Project with the
            objective of making government services & schemes available to the
            citizens through a seamless and transparent digital system.
          </p>
        </aside>
      </div>
    </section>
  );
}