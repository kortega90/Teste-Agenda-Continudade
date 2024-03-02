/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ButtonInverse from "../../../components/ButtonInverse";
import ScheduleCatalogCard from "../../../components/ScheduleCatalogCard";
import SearchBar from "../../../components/SearchBar";
import * as scheduleService from "../../../services/schedule.service";
import "./styles.css";
import { ScheduleDTO } from "../../../models/Schedule";
import ButtonNextPage from "../../../components/ButtonNextPage";

type QueryParams = {
  page: number;
  name: string;
};
export default function ScheduleCatalog() {
  const [isLastPage, setIsLastPage] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleDTO[]>([]);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: "",
  });

  useEffect(() => {
    scheduleService
      .findAllSchedulesByUserId(Number(1), queryParams.page, queryParams.name)
      .then((response) => {
        const nexPage = response.data.content;
        setSchedule(schedule.concat(nexPage));
        setIsLastPage(response.data.last);
      });
  }, [queryParams]);

  function handleSearch(searchText: string) {
    setSchedule([]);
    setQueryParams({ ...queryParams, page: 0, name: searchText });
  }

  function handelNextPageClick() {
    setQueryParams({ ...queryParams, page: queryParams.page + 1 });
  }

  return (
    <>
      <main>
        <section id="" className="dsc-container">
          <div className="dsc-btn-page-container dsc-mb20">
            <div>
              <ButtonInverse value="novo" />
            </div>
          </div>

          <div>
            <SearchBar onSearch={handleSearch}></SearchBar>
          </div>

          <div>
            <ScheduleCatalogCard schedule={schedule}></ScheduleCatalogCard>
          </div>

          {
            !isLastPage &&
            <div onClick={handelNextPageClick}>
              <ButtonNextPage></ButtonNextPage>
            </div>
          }
        </section>
      </main>
    </>
  );
}
