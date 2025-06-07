import React, { createContext, useContext } from 'react';
import useOwnershipLogic from '../hooks/useOwnershipLogic';

const RolesContext = createContext();
export const RolesProvider = ({ children }) => {
  const value = useOwnershipLogic();
  return <RolesContext.Provider value={value}>{children}</RolesContext.Provider>;
};
export const useRoles = () => useContext(RolesContext);
