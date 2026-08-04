export default function CompanyProfilePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        پروفایل شرکت
      </h1>

      <div className="rounded-2xl border p-6 space-y-4">
        <div>
          <h2 className="font-semibold">نام شرکت</h2>
          <p>شرکت شهرکار</p>
        </div>

        <div>
          <h2 className="font-semibold">ایمیل</h2>
          <p>company@example.com</p>
        </div>

        <div>
          <h2 className="font-semibold">شماره تماس</h2>
          <p>09123456789</p>
        </div>

        <div>
          <h2 className="font-semibold">درباره شرکت</h2>
          <p>
            این صفحه نمونه پروفایل شرکت است و بعداً به دیتابیس متصل خواهد شد.
          </p>
        </div>
      </div>
    </div>
  )
}
