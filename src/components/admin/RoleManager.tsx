import { useQuery, useMutation } from '@tanstack/react-query'
import { getUsers, updateUserRoles } from '@/lib/adminApi'

export default function RoleManager() {
  const { data: users, refetch } = useQuery(['users'], getUsers)
  const mutation = useMutation(updateUserRoles, {
    onSuccess: () => refetch()
  })

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-navy mb-4">User Roles</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">User</th>
            <th className="text-left py-2">Roles</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user.id} className="border-b">
              <td className="py-3">{user.email}</td>
              <td className="py-3">
                <div className="flex gap-4">
                  {['admin', 'marketing', 'analyst'].map(role => (
                    <label key={role} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={user.roles.includes(role)}
                        onChange={e => {
                          const newRoles = e.target.checked
                            ? [...user.roles, role]
                            : user.roles.filter(r => r !== role)
                          mutation.mutate({ userId: user.id, roles: newRoles })
                        }}
                        className="form-checkbox text-navy"
                      />
                      {role}
                    </label>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
