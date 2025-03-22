export const revalidate = 0;

import { Pagination, Title } from '@/components';
import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';
import { getUsers } from '@/actions';

export default async function OrdersAdminPage() {
  const {ok, users = []} = await getUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Usuarios" />

      <div className="mb-10">
        <UsersTable users={users}/>
        <Pagination totalPages={1}/>
      </div>
    </>
  );
}
