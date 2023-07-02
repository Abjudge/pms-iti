import { useSelector } from 'react-redux';
import '../../../redux/slices/TokensSlice';
import { useQuery } from '@tanstack/react-query';
import MyAxios from '../../../utils/AxiosInstance';

const useWorkspaces = () => {
  const tokens = useSelector((state) => state.TokensSlice.tokens);

  const fetchWorkspaces = async () => {
    const response = await MyAxios.get('workspaces/', {
      headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
      throw new Error('Your error message goes here');
    }

    return response.data;
  };

  return useQuery(['workspaces'], fetchWorkspaces, { refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false });
};

export default useWorkspaces;
