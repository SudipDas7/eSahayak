export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-bold mb-3 text-slate-800">Help</h4>
          <ul className="space-y-2 text-slate-600">
            <li><a href="#" className="hover:underline">Helpdesk (Contact Us)</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Give Feedback</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-slate-800">Policies</h4>
          <ul className="space-y-2 text-slate-600">
            <li><a href="#" className="hover:underline">Copyright Policy</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Refund/Cancellation</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-slate-800">Links</h4>
          <ul className="space-y-2 text-slate-600">
            <li><a href="#" className="hover:underline">Govt. of India Portal</a></li>
            <li><a href="#" className="hover:underline">Find Your BSK</a></li>
            <li><a href="#" className="hover:underline">Duare Sarkar</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-slate-800">Badges</h4>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded bg-slate-200" />
            <div className="h-12 w-12 rounded bg-slate-200" />
            <div className="h-12 w-12 rounded bg-slate-200" />
          </div>
        </div>
      </div>
      <div className="bg-slate-100 text-slate-600 text-center text-xs py-3">
        © {new Date().getFullYear()} Government of West Bengal. All Rights Reserved.
      </div>
    </footer>
  );
}
