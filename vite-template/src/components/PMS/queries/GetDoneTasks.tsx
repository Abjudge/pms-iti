import { useSelector } from 'react-redux';
import '../../../redux/slices/TokensSlice';
import { useQuery } from '@tanstack/react-query';
import MyAxios from '../../../utils/AxiosInstance';

const useDoneTasks = (projectId) => {
  const tokens = useSelector((state) => state.TokensSlice.tokens);

  const fetchProjects = async () => {
    const response = await MyAxios.get(`task/status/${'d'}/project/${projectId}/`, {
      headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
      throw new Error('Your error message goes here');
    }

    return response.data;
  };

  return useQuery(['doneTasks'], fetchProjects, { initialData: [] });
};

export default useDoneTasks;
