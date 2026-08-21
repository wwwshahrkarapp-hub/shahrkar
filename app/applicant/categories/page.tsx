import Link from "next/link";
import { categories } from "@/lib/data";

export default function ApplicantCategoriesPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          جستجو بر اساس دسته‌بندی شغلی
        </h1>

        <p className="text-center text-gray-400 mb-10">
          از میان دسته‌بندی‌های تخصصی، حوزه مورد علاقه خود را انتخاب کنید.
        </p>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {categories.map((category) => {

            const Icon = category.icon;

            return (
              <Link
                key={category.slug}
                href={`/jobs?category=${category.slug}`}
                className="
                rounded-3xl
                bg-zinc-900
                border border-zinc-800
                p-6
                flex
                items-center
                justify-between
                hover:border-yellow-500
                transition
                "
              >

                <div className="text-right">

                  <h2 className="text-xl font-bold">
                    {category.title}
                  </h2>

                  <p className="mt-2 text-gray-400">
                    {category.count.toLocaleString("fa-IR")} فرصت شغلی
                  </p>

                </div>


                <div className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-yellow-500/10
                  flex
                  items-center
                  justify-center
                ">

                  <Icon className="text-yellow-400 size-8" />

                </div>


              </Link>
            );

          })}

        </div>

      </div>

    </main>
  );
}
