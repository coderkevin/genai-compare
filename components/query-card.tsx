import { QueryState } from "@/hooks/useQueryGroupState";
import StyledCard from "./styled-card";
import StyledFormButton from "./styled-form-button";
import StyledWideInput from "./styled-wide-input";
import StyledForm from "./styled-form";
import { ChangeEvent, MouseEvent } from "react";
import StyledResponse from "./styled-response";
import StyledError from "./styled-error";

interface QueryCardProps {
  question: string;
  query: QueryState;
  setQueryTopic: (value: string) => void;
  setQueryUrl: (value: string) => void;
  sendQuery: () => void;
}

const QueryCard = ({
  question,
  query,
  setQueryTopic,
  setQueryUrl,
  sendQuery,
}: QueryCardProps) => {
  const isRequesting = query.status === "requesting";
  const canRequest =
    !isRequesting &&
    question.length > 0 &&
    query.topic.length > 0 &&
    query.url.length > 0;

  const onTopicChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQueryTopic(event.target.value);
  };

  const onUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQueryUrl(event.target.value);
  };

  const onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    sendQuery();
  };

  let content = null;

  if (isRequesting) {
    content = <StyledResponse>Requesting...</StyledResponse>;
  } else if (query.error.length > 0) {
    content = <StyledError>{query.error}</StyledError>;
  } else if (query.response.length > 0) {
    content = <StyledResponse>{query.response}</StyledResponse>;
  }

  return (
    <StyledCard>
      <StyledForm>
        <label htmlFor="topic">Topic:</label>
        <input
          id="topic"
          type="text"
          value={query.topic}
          onChange={onTopicChange}
        />
        <label htmlFor="url">URL:</label>
        <StyledWideInput
          id="url"
          type="text"
          value={query.url}
          onChange={onUrlChange}
        />
        <StyledFormButton disabled={!canRequest} onClick={onButtonClick}>
          Query
        </StyledFormButton>
      </StyledForm>
      {content}
    </StyledCard>
  );
};

export default QueryCard;
