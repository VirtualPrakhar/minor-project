import React, {useEffect, useRef,useState } from "react";
import Client from "./Client";
import EditorArea from "./EditorArea";
import { initSocket } from "../socket";
import { useNavigate, useLocation , useParams, Navigate} from "react-router-dom";

function EditorPage() {
  const socketRef = useRef(null);
  const location =useLocation();
  const {roomId} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const init =async() =>{
      socketRef.current =await initSocket();
      socketRef.current.on('connect_error', (err) => handleError(err));
      socketRef.current.on('connect_failed', (err) => handleError(err));
      
      const handleError =(e) => {
        console.log('socket error =>',e);
        toast.error("Socket Connection Failed");
        navigate('/');
      };
      socketRef.current.emit('join',{
        roomId,
        username: location.state?.username,
      });
    };
    init();
  },[]);
  const [clients, setClients] = useState([
    {socketId: 1, username: "Ram"},
    {socketId: 2, username: "Seeta"},
  ]);

  if(!location.state){
    return <Navigate to="/" />;
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-2 bg-dark text-light d-flex flex-column h-100" style={{boxShadow:"2px 0px 4px rgba(0,0,0,0.1)" }}>
          <img 
            src="/images/codecast.png" 
            alt="CodeCast" 
            className="img-fluid mx-auto"
            style={{maxWidth:'150px', marginTop:"-43px"}}
          />
          <hr style={{marginTop:"-3rem"}} />
          {/* Client List Container */}
          <div className="d-flex flex-column overflow-auto">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username}/>
            ))}
          </div>
            {/* Buttons */}
            <div className="mt-auto">
              <hr />
              <button className="btn btn-success">Copy ROOM ID</button>
              <button className="btn btn-danger mt-2 mb-2 px-3 btn-block">
                Leave ROOM
              </button>
            </div>
        </div>
        {/* EDITOR */}
        <div className="col-md-10 text-light d-flex flex-column h-100">
          <EditorArea />
        </div>
      </div>
    </div>
  );
}

export default EditorPage;