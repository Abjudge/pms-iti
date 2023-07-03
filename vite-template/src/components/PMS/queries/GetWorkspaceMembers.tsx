import { useSelector } from 'react-redux';
import '../../../redux/slices/TokensSlice';
import { useQuery } from '@tanstack/react-query';
import MyAxios from '../../../utils/AxiosInstance';

const useWorkspaceMembers = (workspaceId) => {
  const tokens = useSelector((state) => state.TokensSlice.tokens);

  const fetchWorkspaceMembers = async () => {
    const response = await MyAxios.get(`/workspaces/${workspaceId}/members`, {
      headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
      throw new Error('Your error message goes here');
    }
    console.log('here responce', response.data);
    return response.data;
  };

  return useQuery(['workspaceMembers'], fetchWorkspaceMembers, {initialData: []});
};

export default useWorkspaceMembers;
