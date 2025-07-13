import { LoadingSpinner } from "@/components/loading-spinner"

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">جاري تحميل لوحة الإدارة...</h2>
        <p className="text-gray-500">يرجى الانتظار</p>
      </div>
    </div>
  )
}
