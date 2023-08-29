import { useReducer } from "react";

export interface QueryState {
  topic: string;
  url: string;
  status: string;
  response: string;
  error: string;
}

export interface QueryGroupState {
  question: string;
  queries: QueryState[];
}

interface QueryAction {
  type:
    | "setQuestion"
    | "addQuery"
    | "setQueryTopic"
    | "setQueryUrl"
    | "setQueryStatus"
    | "setQueryResponse"
    | "setQueryError";
  queryIndex: number;
  value: string;
}

type QueryActionHandler = (
  state: QueryGroupState,
  action: QueryAction
) => QueryGroupState;

const setQuestion: QueryActionHandler = (state, action) => {
  return { ...state, question: action.value };
};

const addQuery: QueryActionHandler = (state, action) => {
  const newQuery = {
    topic: "",
    url: "",
    status: "idle",
    response: "",
    error: "",
  };
  const queries = [...state.queries, newQuery];

  return { ...state, queries };
};

const setQueryField =
  (field: string): QueryActionHandler =>
  (state, action) => {
    const query = state.queries[action.queryIndex];
    const updatedQuery = { ...query, [field]: action.value };
    const queries = [...state.queries];
    queries[action.queryIndex] = updatedQuery;

    return { ...state, queries };
  };

const actionHandlers = {
  setQuestion,
  addQuery,
  setQueryTopic: setQueryField("topic"),
  setQueryUrl: setQueryField("url"),
  setQueryStatus: setQueryField("status"),
  setQueryResponse: setQueryField("response"),
  setQueryError: setQueryField("error"),
};

const queryGroupReducer: QueryActionHandler = (state, action) => {
  const handler = actionHandlers[action.type];
  if (!handler) {
    throw Error(`Invalid action: ${action}`);
  }

  return handler(state, action);
};

const initialState: QueryGroupState = {
  question: "",
  queries: [],
};

const useQueryGroupState = () => {
  const [state, dispatch] = useReducer<QueryActionHandler>(
    queryGroupReducer,
    initialState
  );

  return {
    state,
    setQuestion: (value: string) =>
      dispatch({ type: "setQuestion", queryIndex: -1, value }),
    addQuery: () => dispatch({ type: "addQuery", queryIndex: -1, value: "" }),
    setQueryTopic: (queryIndex: number, value: string) =>
      dispatch({ type: "setQueryTopic", queryIndex, value }),
    setQueryUrl: (queryIndex: number, value: string) =>
      dispatch({ type: "setQueryUrl", queryIndex, value }),
    setQueryRequesting: (queryIndex: number, isRequesting: boolean) =>
      dispatch({
        type: "setQueryStatus",
        queryIndex,
        value: isRequesting ? "requesting" : "idle",
      }),
    setQueryResponse: (queryIndex: number, value: string) =>
      dispatch({ type: "setQueryResponse", queryIndex, value }),
    setQueryError: (queryIndex: number, value: string) =>
      dispatch({ type: "setQueryError", queryIndex, value }),
  };
};

export default useQueryGroupState;
