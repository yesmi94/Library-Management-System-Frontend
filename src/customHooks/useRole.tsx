// hooks/useRole.ts
export function useRole() {
  const role = parseInt(localStorage.getItem("role") || "-1");

  return {
    isMember: role === 0,
    isManagement: role === 1,
    isMinorStaff: role === 2,
  };
}
