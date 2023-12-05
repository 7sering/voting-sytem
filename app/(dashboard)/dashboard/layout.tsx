// app/AdminDashboard/layout.tsx
import Sidebar from "./_components/Sidebar";
import { Toaster } from "react-hot-toast";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body>
          <section className="bg-gray-900">
            <div className="container flex items-center justify-center">
              <div className="w-3/12">
                <Toaster
                  position="top-center"
                  toastOptions={{
                    duration: 3000,
                  }}
                />
                <Sidebar />
              </div>
              <div className="w-9/12">{children}</div>
            </div>
          </section>
        </body>
      </html>
    </>
  );
}
