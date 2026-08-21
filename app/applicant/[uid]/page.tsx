import { notFound } from "next/navigation";

export default async function ApplicantPublicProfile({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;

  if (!uid) {
    notFound();
  }

  const res = await fetch(
    "http://localhost:3000/api/profile/get",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid,
      }),
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!data.success || !data.user) {
    notFound();
  }

  const user = data.user;

  return (
    <div
      dir="rtl"
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-background
        px-3
        py-6
        text-foreground
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-2xl
          rounded-3xl
          border
          border-gold/40
          bg-background
          px-5
          py-7
          sm:px-8
          sm:py-9
        "
      >

        {/* عنوان */}
        <div className="mb-7 text-right">
          <h1
            className="
              text-3xl
              font-bold
              leading-relaxed
              sm:text-4xl
            "
          >
            پروفایل کارجو
          </h1>

          <p
            className="
              mt-2
              text-base
              leading-7
              text-muted-foreground
              sm:text-lg
            "
          >
            اطلاعات شخصی و حرفه‌ای کارجو
          </p>
        </div>


        {/* اطلاعات شخصی */}
        <section
          className="
            mb-4
            rounded-3xl
            border
            border-border
            bg-card
            p-5
            sm:p-6
          "
        >
          <h2
            className="
              mb-5
              text-right
              text-xl
              font-bold
              leading-relaxed
              sm:text-2xl
            "
          >
            اطلاعات شخصی
          </h2>

             <div className="
  space-y-4
  text-base
  sm:text-lg
  font-[var(--font-inter)]
">
            <div className="flex items-center justify-between gap-4">
             <span className="text-right font-medium font-[var(--font-vazir)]">
  {user.name}
</span>

              <span className="shrink-0 text-muted-foreground">
                نام
              </span>
            </div>


            <div className="flex items-center justify-between gap-4">
<span
  dir="ltr"
  className="latin-font text-left text-sm sm:text-base"
>
  {user.email || "-"}
</span>

              <span className="shrink-0 text-muted-foreground">
                ایمیل
              </span>
            </div>


            <div className="flex items-center justify-between gap-4">
      <span
  dir="ltr"
  className="latin-font text-left"
>
  {user.phone || "-"}
</span>

              <span className="shrink-0 text-muted-foreground">
                تماس
              </span>
            </div>


            <div className="flex items-center justify-between gap-4">
              <span className="font-medium">
                {user.city || "-"}
              </span>

              <span className="shrink-0 text-muted-foreground">
                شهر
              </span>
            </div>
          </div>
        </section>


        {/* مهارت‌ها */}
        <section
          className="
            mb-4
            rounded-3xl
            border
            border-border
            bg-card
            p-5
            sm:p-6
          "
        >
          <h2
            className="
              mb-5
              text-right
              text-xl
              font-bold
              leading-relaxed
              sm:text-2xl
            "
          >
            مهارت‌ها
          </h2>

          <div
            className="
              flex
              flex-wrap
              justify-start
              gap-3
            "
            dir="rtl"
          >
            {user.skills?.map((skill: string) => (
              <span
                key={skill}
                dir="ltr"
                className="
                  rounded-full
                  border
                  border-gold/30
                  bg-gold/20
                  px-5
                  py-2
                  text-sm
                  font-[var(--font-vazir)]
                  font-medium
                  text-gold
                  sm:text-base
                "
              >
                {skill}
              </span>
            ))}
          </div>
        </section>


        {/* سابقه کار */}
        <section
          className="
            mb-4
            rounded-3xl
            border
            border-border
            bg-card
            p-5
            sm:p-6
          "
        >
          <h2
            className="
              mb-4
              text-right
              text-xl
              font-bold
              leading-relaxed
              sm:text-2xl
            "
          >
            سابقه کار
          </h2>

          <p
            className="
              text-right
              text-base
              leading-8
              text-muted-foreground
              sm:text-lg
            "
          >
            {user.experience || "ثبت نشده"}
          </p>
        </section>


        {/* درباره من */}
        <section
          className="
            rounded-3xl
            border
            border-border
            bg-card
            p-5
            sm:p-6
          "
        >
          <h2
            className="
              mb-4
              text-right
              text-xl
              font-bold
              leading-relaxed
              sm:text-2xl
            "
          >
            درباره من
          </h2>

          <p
            className="
              text-right
              text-base
              leading-8
              text-muted-foreground
              sm:text-lg
            "
          >
            {user.about || "ثبت نشده"}
          </p>
        </section>

      </div>
    </div>
  );
}
