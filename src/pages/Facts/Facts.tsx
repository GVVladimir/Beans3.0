import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { Error } from "../../components/Error";
import { FactCard } from "../../components/FactCard";
import { Loader } from "../../components/Loader";
import { FactsSelector } from "../../Redux/facts/factsSelector";
import { getFacts } from "../../Redux/facts/factsSlice";
import { useAppDispatch } from "../../Redux/store";
import "./styles.css";

export const FactsPage = () => {
  const dispatch = useAppDispatch();
  const { data, totalPages, isLoading, isError } = useSelector(FactsSelector);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getFacts(page));
  }, [page]);

  const load = () => {
    setPage(page + 1);
  };
  return (
    <div className="facts_container">
      <h1>Facts ...</h1>
      {isLoading && data.length === 0 ? (
        <Loader />
      ) : (
        <InfiniteScroll
          next={load}
          dataLength={data.length}
          loader={<Loader />}
          hasMore={page < totalPages}
        >
          {data.map((item) => (
            <FactCard key={`fact_item_${item.factId}`} data={item} />
          ))}
        </InfiniteScroll>
      )}
      {isError && <Error />}
    </div>
  );
};