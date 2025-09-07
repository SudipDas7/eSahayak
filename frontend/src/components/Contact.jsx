import { useState } from "react";
import StarRating from "./StarRating.jsx";

export default function Contact() {
  const [nav, setNav] = useState(0);
  const [ux, setUx] = useState(0);
  const [ease, setEase] = useState(0);
  const [look, setLook] = useState(0);
  const [docs, setDocs] = useState(0);

  return (
    <section className="bg-gradient-to-b from-white to-slate-100">
      <div className="mx-auto max-w-screen-xl px-4 py-14">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-8">Contact Us</h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact card (left) */}
          <div className="relative rounded-2xl bg-white shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-sky-100" />
              <div>
                <div className="text-lg font-semibold">Contact Info</div>
                <div className="text-xs text-slate-500">10:00 AM to 5:30 PM (Mon–Fri)</div>
              </div>
            </div>

            <dl className="space-y-2 text-slate-700">
              <div><dt className="font-medium inline">Email:</dt> <dd className="inline">ind.eSahayak@ind.gov.in</dd></div>
              <div><dt className="font-medium inline">Phone:</dt> <dd className="inline">+91 9679350002 / +91 9833544429</dd></div>
            </dl>

            <div className="mt-6">
              {/* Placeholder for “District Level Contact Details” badge/button */}
              <button className="rounded-full bg-sky-100 text-sky-700 px-4 py-2 font-medium">
                District Level Contact Details
              </button>
            </div>
          </div>

          {/* Feedback form (right) */}
          <form
            className="rounded-2xl bg-white shadow p-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for your feedback!");
            }}
          >
            <h3 className="text-xl font-semibold mb-4">Helpdesk / Feedback</h3>

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <input
                className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-400"
                placeholder="Name"
              />
              <input
                className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-400"
                placeholder="Number"
              />
            </div>

            <StarRating label="1. Navigation" value={nav} onChange={setNav} />
            <StarRating label="2. User Experience" value={ux} onChange={setUx} />
            <StarRating label="3. Ease for Service Available" value={ease} onChange={setEase} />
            <StarRating label="4. Look and Feel" value={look} onChange={setLook} />
            <StarRating label="5. Help Documentation" value={docs} onChange={setDocs} />

            <label className="text-sm font-medium text-slate-700 mt-4 block">Comments</label>
            <textarea
              rows={4}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-400"
              placeholder="Write your comments..."
            />

            <div className="mt-4 flex gap-3">
              <button type="submit" className="rounded-lg bg-sky-700 text-white px-5 py-2 font-semibold hover:bg-sky-800">
                Submit
              </button>
              <button type="reset" className="rounded-lg bg-slate-200 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-300">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
