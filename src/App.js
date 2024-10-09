import { useEffect, useState } from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import UnifiedDirectory from "@unified-api/react-directory";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Create from "./create";

function App() {
  const [auth, setAuth] = useState();
  const [connectionID, setConnectionID] = useState("");
  const [result, setResult] = useState("");
  const history = useHistory();
  const urlParams = new URLSearchParams(window.location.search);
  const connectionId = urlParams.get("id");

  async function createWebhook() {
    const options = {
      method: "POST",
      url: "https://api.unified.to/unified/webhook",
      headers: {
        authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmM2MDg1ODVjZjU1MWE2ZjVlN2RiMGIiLCJ3b3Jrc3BhY2VfaWQiOiI2NmM1YzI4OTg5NmY1OWMwMmYwZTkxODkiLCJpYXQiOjE3MjQyNTQyOTZ9.5x3tdm8D--i0BpvFYVUsJQpGfiqo2yd6nATVkuMCkLI",
      },
      data: {
        connection_id: connectionID,
        hook_url: `https://e0y2rz22wb.execute-api.eu-west-2.amazonaws.com/JunoStage/logging`,
        event: "created",
        object_type: "messaging_message",
        interval: "1",
        // fields: "subject, body",
        webhook_type: "virtual",
      },
      params: {
        include_all: true,
      },
    };

    const results = await axios.request(options);
    setResult(results);
  }

  // useEffect(() => {
  //   setConnectionID(
  //     history?.location?.pathname === "/success" ? connectionId : ""
  //   );
  // }, []);
  // useEffect(() => {
  //   if (connectionID) {
  //     createWebhook();
  //   }
  // }, [connectionID]);

  return (
    <div className="App">
      <UnifiedDirectory
        workspace_id={"66c5c289896f59c02f0e9189"}
        success_redirect={"http://localhost:3000/success"}
        environment={"Production"}
        external_xref="11111111"
      />
      <Create />
    </div>
  );
}

export default withRouter(App);
