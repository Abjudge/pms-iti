import { useSelector } from 'react-redux';
import '../../../redux/slices/TokensSlice';
import { useQuery } from '@tanstack/react-query';
import MyAxios from '../../../utils/AxiosInstance';

const useProjects = () => {
  const tokens = useSelector((state) => state.TokensSlice.tokens);

  const fetchProjects = async () => {
    const response = await MyAxios.get('projects/', {
      headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'application/json' },
    });

    if (response.status !== 207) {
      throw new Error('Your error message goes here');
    }

    return response.data;
  };

  return useQuery(['projects'], fetchProjects, { refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false });
};

export default useProjects;
