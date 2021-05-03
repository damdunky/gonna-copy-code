// javascript is supported
import "./App.css";

import { EVENT, IS_INTRA } from "./util/constants";
import { config, render } from "@hydrophobefireman/ui-lib";

import { Halo2020 } from "./components/_Halo2020/Halo2020";
import { Header } from "./components/Header/Header";
import { Motion } from "@hydrophobefireman/ui-anim";
import { RouteLoader } from "./components/RouteLoader";
import { useCredsCheck } from "./hooks/use-creds-check";
import { useEvent } from "./hooks/use-event";

config.scheduleRender = (cb: any) => Promise.resolve().then(cb) as any;
function App() {
  const checked = useCredsCheck();
  const [event, error] = useEvent(EVENT);
  if (error) return <div>{error}</div>;
  if (!checked) return <div>Checking credentials..</div>;
  if (!event) return <div>Fetching event data..</div>;
  return (
    <main>
      <Motion>
        <Header />
        <RouteLoader />
      </Motion>
    </main>
  );
}
const FE_READY = location.host.includes("localhost");

const out = !IS_INTRA && !FE_READY ? <Halo2020 /> : <App />;
render(out, document.getElementById("app-mount"));
