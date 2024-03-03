import './styles.css'

export default function ScheduleForm () {


return( 
    <>
    <main>
      <section id="product-form-section" className="dsc-container">
        <div className="dsc-product-form-container">
          <form className="dsc-card dsc-form">
            <h2>Schedule Data</h2>
            <div className="dsc-form-controls-container">
              <div>
                <input 
                className="dsc-form-control" 
                type="text" 
                placeholder="Nome"/>
              </div>
              <div>
                <input 
                className="dsc-form-control" 
                type="text" 
                placeholder="ExpirationDate"/>
              </div>
              <div>
                <input 
                className="dsc-form-control" 
                type="text" 
                placeholder="Created At"/>
              </div>
              <div>
                <select className="dsc-form-control dsc-select" required>
                  <option value="" disabled selected>Users Admin</option>
                  <option value="1">Users Admin 1</option>
                  <option value="2">Users Admin 2</option>
                </select>
              </div>
            </div>

            <div className="dsc-product-form-buttons">
              <button type="reset" className="dsc-btn dsc-btn-white">Cancelar</button>
              <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
            </div>
          </form>
        </div>
      </section>
    </main>
    
    </>
     
    );

}