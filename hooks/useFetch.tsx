import useToast from "./useToast";

interface FetchProps {
  url: string;
  method: string;
  body?: object;
  onFailure: () => void;
  onSuccess: () => void;
}

//useFetch(url:string,method:string,body:object,onComplete:()=>void)

export default function useFetch() {

  const fetchdata = async ({ url, method, body, onSuccess, onFailure }: FetchProps) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        onSuccess()
      } else {
        onFailure()
      }

    } catch (error) {
      console.log("Data submission failed:", error);
    }
  };

  return { fetchdata };
}
