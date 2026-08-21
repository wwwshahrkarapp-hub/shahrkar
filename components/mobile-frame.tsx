export default function MobileFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex justify-center">

      <div
        className="
        w-full
        min-h-screen
        border-x
        border-[#e5b84b]/40
        bg-[#080808]
        shadow-[inset_0_0_40px_rgba(229,184,75,0.08)]
        p-5
        overflow-hidden
        "
      >

        {children}

      </div>

    </main>
  );
}
