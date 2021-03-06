import {
  AsyncComponent,
  ComponentType,
  Path,
  Router,
  useMemo,
} from "@hydrophobefireman/ui-lib";

import { ChunkLoading } from "../ChunkLoadingComponent";
import { NotFound } from "@/pages/404";
import { componentMap } from "@/routes";
import { Object_entries as entries } from "@hydrophobefireman/j-utils";

export function RouteLoader() {
  return (
    <Router fallbackComponent={NotFound}>
      {entries(componentMap).map(([path, comp]) => (
        <Path match={path} component={RouteComponent} render={comp} />
      ))}
    </Router>
  );
}

function RouteComponent({ match, render, params }) {
  const func = useMemo(() => (R: ComponentType) => <R params={params} />, [
    params,
  ]);
  return (
    <section data-app-state={match} class="route-section">
      <AsyncComponent
        componentPromise={() => render().then(func)}
        fallback={ChunkLoading}
      />
    </section>
  );
}
