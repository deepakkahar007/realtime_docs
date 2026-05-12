import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ReactQuery } from "@/integrations/react-query/ReactQuery";
import { TanstackRouter } from "@/integrations/tanstack-router/TanstackRouter";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ReactQuery>
			<TanstackRouter />
		</ReactQuery>
	</StrictMode>,
);
