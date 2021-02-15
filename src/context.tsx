import React from "react";

export interface State {
  page: string;
  setPage: (page: string) => void;
}

const Context = React.createContext<State | null>(null);

export const ContextProvider = Context.Provider;
export const ContextConsumer = Context.Consumer;

export default Context;
