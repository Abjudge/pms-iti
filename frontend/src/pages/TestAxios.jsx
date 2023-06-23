
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const TestAxios = () => {

    // alert("test mount");

    const tokens = useSelector((state) => state.TokensSlice.tokens);
    const full = useSelector((state) => state.TokensSlice.full);
    console.log("🚀 ~ file: TestAxios.jsx:9 ~ TestAxios ~ tokens:", tokens);

    const [workspaces, setWorkspaces] = useState();
    const [image, setimage] = useState();
    // const [projects, setProjects] = useState();
    // const [user, setUser] = useState();




    const fetchData = async () => {
        // workspaces
        try {
            const response = await axios.get("http://127.0.0.1:8000/workspaces/", {
                headers: { "Authorization": `JWT ${tokens.access}`, "Content-Type": "application/json", },

            }
            );
            setimage(response.data.data[2].image);
            setWorkspaces(await JSON.stringify(response.data));
        }

        catch (error) {
            // alert("fetch error ");
        }


    };


    useEffect(() => {


        fetchData();



    }, [tokens]);



    return (
        <>
            {tokens && tokens.access ? (
                // tokens.access
                <p>authorized</p>

            ) : (
                <p>
                    not found



                </p>
            )}
            {tokens && tokens.access ? (
                // tokens.access
                <p>loggedin</p>

            ) : (
                <p>
                    not found



                </p>
            )}
            <img src={"http://127.0.0.1:8000" + image} height="400px" alt="dfsgfdsgfd" />

            <h2>user</h2>
            <p>
                {/* {user} */}
            </p>

            <h2>projects</h2>
            <p>
                {/* {projects} */}
            </p>

            <h2>workspaces</h2>
            <p>
                {workspaces}
            </p>
        </>

    );
};

export default TestAxios;
