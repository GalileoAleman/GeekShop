'use client';

import { changeUserRole } from "@/actions/user/change-user-role";
import { User } from "@/interfaces";

interface Props{
    users: User[];
}

export const UsersTable = ({users}: Props) => {
    return (
      <table className="min-w-full">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
              Email
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
              Nombre
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                {user.email}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                {user.name}
              </td>
              <td className="flex justify-center items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                <select 
                  value={user.role}
                  onChange={e =>  changeUserRole(user.id, e.target.value)}
                  className="text-sm p-2 text-primary rounded">
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
