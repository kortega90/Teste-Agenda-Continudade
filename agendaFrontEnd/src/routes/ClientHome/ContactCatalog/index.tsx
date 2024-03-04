import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonInverse from "../../../components/ButtonInverse";
import ContactCatalogCard from "../../../components/ContactCatalogCard";
import SearchBar from "../../../components/SearchBar";
import * as scheduleService from "../../../services/schedule.service";
import "./styles.css";
import ButtonPrimary from "../../../components/ButtonPrimary";
import { useEffect, useState } from "react";
import { ScheduleDTO } from "../../../models/Schedule";
import * as userService from "../../../services/user-Service";
import { UserDTO } from "../../../models/user";
export default function ContactCatalog() {

  const params = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<ScheduleDTO | undefined>();
  const [contactName, setContactName] = useState<string>("");

  const [user, setUser] = useState<UserDTO>();

  const handleClearContact = () => {

    if (contactName === ""){
      setContactName(" "); 
    }else{
      setContactName(""); 
    }

  };

  useEffect(() => {
    scheduleService
      .findScheduleById(Number(params.scheduleId), contactName)
      .then((response: { data: ScheduleDTO }) => {
        setSchedule(response.data);
      })
      .catch(() => {
        navigate(`/schedule/user/${user?.id}`);
      });
  }, [params.scheduleId, navigate, contactName]);

  useEffect(() => {
    userService
      .findMe()
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  function handleSearch(searchText: string) {
    setContactName(searchText);
  }
  return (
    <>
      <main>
        <section id="" className="dsc-container">
          <div className="dsc-btn-page-container dsc-mb20">
            <ButtonInverse value="novo" />
          </div>

          <SearchBar onSearch={handleSearch}></SearchBar>
          {schedule && (
            <ContactCatalogCard schedule={schedule} onClearContact={handleClearContact}></ContactCatalogCard>
          )}

          <div className="dsc-btn-page-container dsc-mt20">
            <Link to={`/schedule/user/${user?.id}`}>
            <ButtonPrimary value="voltar" />
            </Link>
          </div>

        </section>
      </main>
    </>
  );
}
