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
      className="
      min-h-screen
      bg-black
      text-white
      p-6
      "
    >

      <div
        className="
        max-w-xl
        mx-auto
        bg-zinc-900
        rounded-2xl
        p-6
        "
      >

        <h1 className="text-3xl font-bold mb-6">
          پروفایل کارجو
        </h1>


        <div className="space-y-4 text-lg">


          <div>
            👤 نام:
            <span className="mr-2">
              {user.name}
            </span>
          </div>


          <div>
            📞 تلفن:
            <span className="mr-2">
              {user.phone}
            </span>
          </div>


          <div>
            📧 ایمیل:
            <span className="mr-2">
              {user.email || "ثبت نشده"}
            </span>
          </div>


          <div>
            📍 شهر:
            <span className="mr-2">
              {user.city || "ثبت نشده"}
            </span>
          </div>


          <div>
            🛠 مهارت‌ها:
            <div className="mt-2">
              {
                user.skills?.length
                ?
                user.skills.map(
                  (skill:string)=>(
                    <span
                      key={skill}
                      className="
                      inline-block
                      bg-blue-600
                      rounded-lg
                      px-3
                      py-1
                      ml-2
                      "
                    >
                      {skill}
                    </span>
                  )
                )
                :
                "ثبت نشده"
              }
            </div>
          </div>


          <div>
            💼 تجربه کاری:
            <p className="mt-1">
              {user.experience || "ثبت نشده"}
            </p>
          </div>


          <div>
            📝 درباره:
            <p className="mt-1">
              {user.about || "ثبت نشده"}
            </p>
          </div>


          <div className="text-xs text-gray-400 mt-6">
            UID:
            <br />
            {uid}
          </div>


        </div>

      </div>

    </div>
  );
}
