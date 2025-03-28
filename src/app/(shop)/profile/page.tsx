import { getOrdersByUser } from "@/actions/order/get-orders-by-user";
import { auth } from "@/auth.config";
import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoListOutline, IoMailOutline, IoPersonOutline } from "react-icons/io5";

export default async function ProfilePage() {
    const {ok, orders = []} = await getOrdersByUser();

    if (!ok) {
        redirect("/auth/login");
    }

    const session = await auth();

    if(!session?.user){
        redirect("/auth/login");
    }
    
    const { name, email, role } = session?.user;
    const ordersCount = orders.length; // Simulado
  
    return (
      <div className="max-w-3xl mx-auto mt-10 px-5">
        <Title title="Perfil" />
  
        <div className="bg-white shadow-md rounded-2xl p-8 mt-6 border border-gray-200">
          {/* Encabezado */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Hola, {name} 👋</h2>
              <p className="text-sm text-gray-500">Este es tu perfil de usuario.</p>
            </div>
  
            <span className={`px-4 py-1 rounded-full text-sm font-semibold text-white ${
              role === "admin" ? "bg-green-600" : "bg-blue-600"
            }`}>
              {role === "admin" ? "Administrador" : "Usuario"}
            </span>
          </div>
  
          {/* Información */}
          <div className="space-y-4 text-gray-700 text-base">
            <div className="flex items-center gap-3">
              <IoPersonOutline size={30} className="text-primary" />
              <span className="font-medium">Nombre:</span> {name}
            </div>
  
            <div className="flex items-center gap-3">
              <IoMailOutline size={30} className="text-primary" />
              <span className="font-medium">Correo:</span> {email}
            </div>
  
            <Link href={role === "admin" ? "admin/orders" : "/orders"} className="block hover:bg-gray-100 rounded-mdtransition-colors">
                <div className="flex items-center gap-3">
                    <IoListOutline size={30} className="text-primary" />
                    {
                        role === "admin" 
                            ? (
                                <>
                                    <span className="font-medium">Órdenes</span>
                                </>
                            ) 
                            : (
                                <>
                                    <span className="font-medium">Tus órdenes:</span>
                                    <span>{ordersCount}</span>
                                </>
                            )
                    }
                </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }