import { incrementVisitors } from "../services/analyticsService";

export const trackVisitor = async () => {
  const alreadyVisited = sessionStorage.getItem(
    "homeecart_visitor"
  );

  if (alreadyVisited) {
    return;
  }

  await incrementVisitors();

  sessionStorage.setItem(
    "homeecart_visitor",
    "true"
  );
};