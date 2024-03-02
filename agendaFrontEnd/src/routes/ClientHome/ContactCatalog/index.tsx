import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonInverse from "../../../components/ButtonInverse";
import ContactCatalogCard from "../../../components/ContactCatalogCard";
import SearchBar from "../../../components/SearchBar";
import * as scheduleService from "../../../services/schedule.service";
import "./styles.css";
import ButtonPrimary from "../../../components/ButtonPrimary";
import { useEffect, useState } from "react";
import { ScheduleDTO } from "../../../models/Schedule";

export default function ContactCatalog() {
  const params = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<ScheduleDTO | undefined>();
  const [contactName, setContactName]= useState <string> ('');

  useEffect(() => {
    scheduleService
      .findScheduleById(Number(params.scheduleId),contactName)
      .then((response: { data: ScheduleDTO }) => {
        setSchedule(response.data);
      })
      .catch(() => {
        navigate("/");
      });
  }, [params.scheduleId, navigate,contactName]);


    function handleSearch(searchText:string){
      setContactName(searchText)
    }
  return (
    <>
      <main>
        <section id="" className="dsc-container">
            <div className="dsc-btn-page-container dsc-mb20">
              <ButtonInverse value="novo" />
            </div>


          <SearchBar onSearch={handleSearch}></SearchBar>
          {
            schedule&&
          <ContactCatalogCard schedule={schedule}></ContactCatalogCard>
          }


          <div className="dsc-btn-page-container dsc-mt20">


            <Link to={"/"}>
            <ButtonPrimary value="voltar" />
            </Link>

          </div>
        </section>
      </main>
    </>
  );
}
