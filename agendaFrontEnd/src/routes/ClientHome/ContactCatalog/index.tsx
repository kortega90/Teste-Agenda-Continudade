import ButtonInverse from "../../../components/ButtonInverse";
import ContactCatalogCard from "../../../components/ContactCatalogCard";
import SearchBar from "../../../components/SearchBar";

import "./styles.css";

export default function ContactCatalog() {
  return (
    <>
      <main>
        <section id="" className="dsc-container">

        <div className="dsc-btn-page-container dsc-mb20">
            <div >
              <ButtonInverse value="novo" />
            </div>
          </div>

          <SearchBar></SearchBar>
          <ContactCatalogCard></ContactCatalogCard>
        </section>
      </main>
    </>
  );
}
