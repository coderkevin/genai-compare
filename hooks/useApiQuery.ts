const API_QUERY = "/api/query";

const useApiQuery = () => {
  const sendQuery = async (
    question: string,
    topic: string,
    url: string,
    setRequesting: (isRequesting: boolean) => void,
    setResponse: (response: string) => void,
    setError: (error: string) => void
  ) => {
    setRequesting(true);
    const body = JSON.stringify({ question, topic, url });
    const res = await fetch(API_QUERY, { method: "POST", body });

    if (!res.ok) {
      console.error(
        `Failed to request query: [${res.status}] ${res.statusText}`
      );
      setRequesting(false);
      setResponse("");
      setError("API Error");
      return;
    }

    const json = await res.json();
    setRequesting(false);
    setError("");
    setResponse(json.response);
  };

  return sendQuery;
};

export default useApiQuery;
