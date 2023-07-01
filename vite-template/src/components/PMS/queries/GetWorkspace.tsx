import { useMemo } from 'react';

const useWorkspace = (workspaces, workspaceID) => {
    return useMemo(() => {
      const workspace = workspaces?.find(workspace => workspace?.id == workspaceID);
      return workspace;  
    }, [workspaces, workspaceID])
  }
  export default useWorkspace;