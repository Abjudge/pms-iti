import { useSelector } from 'react-redux';
import '../../../redux/slices/TokensSlice';
import { useQuery } from '@tanstack/react-query';
import MyAxios from '../../../utils/AxiosInstance';

const useProjects = (workspaceId) => {
  const tokens = useSelector((state) => state.TokensSlice.tokens);
  const fetchProjects = async () => {
    const response = await MyAxios.get('projects/', {
      headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'application/json' },
      params: { workspaceId: workspaceId },
    });

    if (response.status !== 207) {
      throw new Error('Your error message goes here');
    }
    console.log('here project responce', response.data);
    return response.data;
  };

  return useQuery(['projects'], fetchProjects, {initialData: []});
};

export default useProjects;
