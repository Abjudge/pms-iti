import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyAxios from '../utils/AxiosInstance';

const TestAxios = () => {
  // alert("test mount");
  const dispatch = useDispatch();
  const tokens = useSelector((state) => state.TokensSlice.tokens);
  const baseURL = useSelector((state) => state.TokensSlice.baseURL);

  const [failed, SetFailed] = useState(false);
  console.log('🚀 ~ file: TestAxios.jsx:9 ~ TestAxios ~ tokens:', tokens);

  const [workspaces, setWorkspaces] = useState();
  const [image, setimage] = useState();
  // const [projects, setProjects] = useState();
  // const [user, setUser] = useState();

  const fetchData = async () => {
    // workspaces
    try {
      const response = await MyAxios.get('workspaces/', {
        headers: { Authorization: `JWT ${tokens.access}`, 'Content-Type': 'application/json' },
      });

      if (response.status == 200) {
        setimage(response.data[2].image);
        setWorkspaces(await JSON.stringify(response.data));
      } else {
        SetFailed(true);
        // alert(failed);
      }
    } catch (error) {
      console.log('🚀 ~ file: TestAxios.jsx:35 ~ fetchData ~ error:', error);

      alert('fetch error ');

      SetFailed(true);
      // alert(failed);
    }
  };
  useEffect(() => {
    fetchData();
    // trying();
  }, []);

  return (
    <>
      {tokens && tokens.access ? (
        // tokens.access
        <p>authorized</p>
      ) : (
        <p>not found</p>
      )}
      {tokens && tokens.access ? (
        // tokens.access
        <p>loggedin</p>
      ) : (
        <p>not found</p>
      )}
      <img src={baseURL + image} height="400px" alt="dfsgfdsgfd" />

      <h2>user</h2>
      <p>{/* {user} */}</p>

      <h2>projects</h2>
      <p>{/* {projects} */}</p>

      <h2>workspaces</h2>
      <p>{workspaces}</p>
    </>
  );
};

export default TestAxios;
