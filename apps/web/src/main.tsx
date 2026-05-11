import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TanstackRouter } from "@/integrations/tanstack-router/TanstackRouter";
import { ReactQuery } from "@/integrations/react-query/ReactQuery";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ReactQuery>
			<TanstackRouter />
		</ReactQuery>
	</StrictMode>,
);
