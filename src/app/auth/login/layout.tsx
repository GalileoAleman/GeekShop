
export default function LoginLayout( { children }: {
 children: React.ReactNode;
}) {
  return (
    <main className="bg-red-300">
        {children}
    </main>
  );
}