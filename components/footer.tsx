export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PI</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Pondok Informatika</h3>
          </div>
          <p className="text-gray-600 text-sm mb-2">Sistem Monitoring Aktivitas Santri</p>
          <p className="text-gray-500 text-xs">© 2024 Pondok Informatika. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
