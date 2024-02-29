import ContactCatalogCard from "../../components/ContactCatalogCard";
import HeaderClient from "../../components/HeaderClient";
import SearchBar from "../../components/SearchBar";

import "./styles.css";

export default function ContactCatalog() {
  return (
    <>
      <HeaderClient></HeaderClient>
      <main>
        <section id="" className="dsc-container">
          <SearchBar></SearchBar>
          <ContactCatalogCard></ContactCatalogCard>
        </section>
      </main>
    </>
  );
}
