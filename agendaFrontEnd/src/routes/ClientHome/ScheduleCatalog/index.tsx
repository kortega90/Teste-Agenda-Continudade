
import ButtonInverse from "../../../components/ButtonInverse";
import ScheduleCatalogCard from "../../../components/ScheduleCatalogCard";
import SearchBar from "../../../components/SearchBar";
import "./styles.css";

export default function ScheduleCatalog() {
  return (
    <>
      <main>
        <section id="" className="dsc-container">
          
          <div className="dsc-btn-page-container dsc-mb20">
            <div>
              <ButtonInverse value="novo" />
            </div>
          </div>

          <SearchBar></SearchBar>
          <ScheduleCatalogCard></ScheduleCatalogCard>
        </section>
      </main>
    </>

  );
}
