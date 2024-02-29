import HeaderClient from "../../components/HeaderClient";
import ScheduleCatalogCard from "../../components/ScheduleCatalogCard";
import SearchBar from "../../components/SearchBar";
import "./styles.css";

export default function ScheduleCatalog() {
  return (
    <>
      <HeaderClient></HeaderClient>
      <main>
        <section id="" className="dsc-container">
          <SearchBar></SearchBar>
          <ScheduleCatalogCard></ScheduleCatalogCard>
        </section>
      </main>
    </>
  );
}
