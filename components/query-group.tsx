"use client";

import QueryCard from "@/components/query-card";
import QuestionBox from "@/components/question-box";
import StyledCardList from "./styled-card-list";
import StyledRoundButton from "./styled-round-button";
import useQueryGroupState from "@/hooks/useQueryGroupState";
import useApiQuery from "@/hooks/useApiQuery";

const QueryGroup = () => {
  const {
    state,
    setQuestion,
    addQuery,
    setQueryTopic,
    setQueryUrl,
    setQueryRequesting,
    setQueryResponse,
    setQueryError,
  } = useQueryGroupState();
  const apiQuery = useApiQuery();

  return (
    <StyledCardList>
      <QuestionBox question={state.question} setQuestion={setQuestion} />
      {state.queries.map((query, index) => (
        <QueryCard
          key={index}
          question={state.question}
          query={query}
          setQueryTopic={(value) => setQueryTopic(index, value)}
          setQueryUrl={(value) => setQueryUrl(index, value)}
          sendQuery={() =>
            apiQuery(
              state.question,
              query.topic,
              query.url,
              (isRequesting) => setQueryRequesting(index, isRequesting),
              (response) => setQueryResponse(index, response),
              (error) => setQueryError(index, error)
            )
          }
        />
      ))}
      <StyledRoundButton onClick={addQuery}>+</StyledRoundButton>
    </StyledCardList>
  );
};

export default QueryGroup;
