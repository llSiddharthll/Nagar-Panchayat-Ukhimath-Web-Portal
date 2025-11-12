"use client";
import { useState, useEffect } from 'react';
import { Role, Permission, RolePermission } from '@/types';
import { rolesAPI, permissionsAPI, rolePermissionsAPI } from '@/utils/api';

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  // Form states
  const [formData, setFormData] = useState<Partial<Role>>({
    role_name: '',
  });

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [rolesResponse, permissionsResponse, rolePermissionsResponse] = await Promise.all([
        rolesAPI.getAll(),
        permissionsAPI.getAll(),
        rolePermissionsAPI.getAll()
      ]);
      setRoles(rolesResponse.data);
      setPermissions(permissionsResponse.data);
      setRolePermissions(rolePermissionsResponse.data);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await rolesAPI.create(formData);
      setShowCreateModal(false);
      resetForm();
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create role');
      console.error('Error creating role:', err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    
    try {
      await rolesAPI.update(selectedRole.role_id, formData);
      setShowEditModal(false);
      resetForm();
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update role');
      console.error('Error updating role:', err);
    }
  };

  const handleDelete = async (roleId: number) => {
    if (!confirm('Are you sure you want to delete this role? This action cannot be undone.')) return;
    
    try {
      await rolesAPI.delete(roleId);
      loadData();
    } catch (err) {
      setError('Failed to delete role');
      console.error('Error deleting role:', err);
    }
  };

  const handleSavePermissions = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    try {
      // Get current permissions for this role
      const currentPermissions = rolePermissions
        .filter(rp => rp.role === selectedRole.role_id)
        .map(rp => rp.permission);

      // Find permissions to add
      const permissionsToAdd = selectedPermissions.filter(
        perm => !currentPermissions.includes(perm)
      );

      // Find permissions to remove
      const permissionsToRemove = currentPermissions.filter(
        perm => !selectedPermissions.includes(perm)
      );

      // Add new permissions
      await Promise.all(
        permissionsToAdd.map(permissionId =>
          rolePermissionsAPI.create({
            role: selectedRole.role_id,
            permission: permissionId
          })
        )
      );

      // Remove old permissions
      await Promise.all(
        permissionsToRemove.map(permissionId =>
          rolePermissionsAPI.delete(selectedRole.role_id, permissionId)
        )
      );

      setShowPermissionsModal(false);
      setSelectedPermissions([]);
      loadData();
    } catch (err) {
      setError('Failed to update permissions');
      console.error('Error updating permissions:', err);
    }
  };

  const openEditModal = (role: Role) => {
    setSelectedRole(role);
    setFormData({
      role_name: role.role_name,
    });
    setShowEditModal(true);
  };

  const openPermissionsModal = (role: Role) => {
    setSelectedRole(role);
    
    // Get current permissions for this role
    const currentPermissions = rolePermissions
      .filter(rp => rp.role === role.role_id)
      .map(rp => rp.permission);
    
    setSelectedPermissions(currentPermissions);
    setShowPermissionsModal(true);
  };

  const handlePermissionToggle = (permissionId: number) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const selectAllPermissions = () => {
    setSelectedPermissions(permissions.map(p => p.permission_id));
  };

  const clearAllPermissions = () => {
    setSelectedPermissions([]);
  };

  const getRolePermissions = (roleId: number) => {
    return rolePermissions
      .filter(rp => rp.role === roleId)
      .map(rp => permissions.find(perm => perm.permission_id === rp.permission))
      .filter(Boolean) as Permission[];
  };

  const groupPermissionsByModule = (permissionsList: Permission[]) => {
    const grouped: { [key: string]: Permission[] } = {};
    
    permissionsList.forEach(permission => {
      // Extract module name from permission name (e.g., "users.add_user" -> "users")
      const module = permission.permission_name.split('.')[0];
      if (!grouped[module]) {
        grouped[module] = [];
      }
      grouped[module].push(permission);
    });
    
    return grouped;
  };

  const resetForm = () => {
    setFormData({
      role_name: '',
    });
    setSelectedRole(null);
    setSelectedPermissions([]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading roles and permissions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Roles & Permissions</h1>
            <p className="text-gray-600 mt-2">Manage user roles and their permissions</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New Role
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="float-right font-bold">×</button>
        </div>
      )}

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => {
          const rolePerms = getRolePermissions(role.role_id);
          const groupedPermissions = groupPermissionsByModule(rolePerms);
          
          return (
            <div
              key={role.role_id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {role.role_name}
                  </h3>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                    {rolePerms.length} permissions
                  </span>
                </div>

                {/* Permissions Preview */}
                {rolePerms.length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(groupedPermissions).slice(0, 3).map(([module, modulePerms]) => (
                      <div key={module}>
                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          {module}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {modulePerms.slice(0, 3).map(perm => (
                            <span
                              key={perm.permission_id}
                              className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                            >
                              {perm.permission_name.split('.')[1]}
                            </span>
                          ))}
                          {modulePerms.length > 3 && (
                            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded">
                              +{modulePerms.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {Object.keys(groupedPermissions).length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{Object.keys(groupedPermissions).length - 3} more modules
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No permissions assigned</p>
                )}

                <div className="flex justify-end space-x-2 pt-4 mt-4 border-t border-gray-100">
                  <button
                    onClick={() => openPermissionsModal(role)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Permissions
                  </button>
                  <button
                    onClick={() => openEditModal(role)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(role.role_id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {roles.length === 0 && !loading && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No roles</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new role.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New Role
            </button>
          </div>
        </div>
      )}

      {/* Create Role Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Create New Role</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Role Name *</label>
                <input
                  type="text"
                  required
                  value={formData.role_name}
                  onChange={(e) => setFormData({ ...formData, role_name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter role name"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                >
                  Create Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditModal && selectedRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Edit Role</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Role Name *</label>
                <input
                  type="text"
                  required
                  value={formData.role_name}
                  onChange={(e) => setFormData({ ...formData, role_name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                >
                  Update Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {showPermissionsModal && selectedRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                Manage Permissions for {selectedRole.role_name}
              </h2>
              
              {/* Quick Actions */}
              <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">
                  {selectedPermissions.length} of {permissions.length} permissions selected
                </span>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={selectAllPermissions}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={clearAllPermissions}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <form onSubmit={handleSavePermissions}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(groupPermissionsByModule(permissions)).map(([module, modulePerms]) => (
                    <div key={module} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 capitalize">
                        {module.replace('_', ' ')}
                      </h3>
                      <div className="space-y-2">
                        {modulePerms.map(permission => (
                          <label key={permission.permission_id} className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={selectedPermissions.includes(permission.permission_id)}
                              onChange={() => handlePermissionToggle(permission.permission_id)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">
                              {permission.permission_name.split('.')[1].replace('_', ' ')}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowPermissionsModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
                  >
                    Save Permissions
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}