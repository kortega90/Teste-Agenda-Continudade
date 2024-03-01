import { Link } from "react-router-dom";
import ButtonInverse from "../../../components/ButtonInverse";
import ContactCatalogCard from "../../../components/ContactCatalogCard";
import SearchBar from "../../../components/SearchBar";

import "./styles.css";
import ButtonPrimary from "../../../components/ButtonPrimary";

export default function ContactCatalog() {
  return (
    <>
      <main>
        <section id="" className="dsc-container">
            <div className="dsc-btn-page-container dsc-mb20">
              <ButtonInverse value="novo" />
            </div>


          <SearchBar></SearchBar>
          <ContactCatalogCard></ContactCatalogCard>

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
