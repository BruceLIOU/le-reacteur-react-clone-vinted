// import packages
import axios from "axios";

import Dropzone from "../components/Dropzone";

import { useState } from "react";
import { useHistory } from "react-router-dom";

const Publish = ({ userToken, apiUrl }) => {
  const history = useHistory(); // To redirect upon submission

  const [offerTitle, setOfferTitle] = useState("");
  const [offerDescription, setOfferDescription] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [offerBrand, setOfferBrand] = useState("");
  const [offerSize, setOfferSize] = useState("");
  const [offerCondition, setOfferCondition] = useState("");
  const [offerColor, setOfferColor] = useState("");
  const [offerCity, setOfferCity] = useState("");
  const [offerPictures, setOfferPictures] = useState(0);
  const [interestedExchange, setInterestedExchange] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Need a FormData type object to send files to server
    const formData = new FormData();
    formData.append("title", offerTitle);
    formData.append("description", offerDescription);
    formData.append("price", offerPrice);
    formData.append("brand", offerBrand);
    formData.append("size", offerSize);
    formData.append("condition", offerCondition);
    formData.append("color", offerColor);
    formData.append("city", offerCity);
    formData.append("pictures", offerPictures);
    /* formData.append("pictures", interestedExchange); */

    try {
      const response = await axios.post(`${apiUrl}/offer/publish`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // Redirect to new offer
      history.push(`/offer/${response.data._id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="offer-body">
      <div className="container">
        <section className="publish-section">
          <h1>Vends ton article</h1>
          <form onSubmit={handleSubmit} name="submitForm-Offer">
            <div>
              <span className="tips-add-img">
                Ajoute jusqu'à 20 photos.{" "}
                <span className="link">Voir astuces</span>
              </span>
              <Dropzone setOfferPictures={setOfferPictures} />
              {/*               <div>
                <label htmlFor="pictures">Photos</label>
                <input
                  type="file"
                  required
                  multiple={true}
                  name="pictures"
                  id="pictures"
                  onChange={(event) => {
                    setOfferPictures(event.target.files[0]);
                  }}
                />
              </div> */}
            </div>
            <div>
              <div>
                <label htmlFor="title">Titre</label>
                <input
                  type="text"
                  name="title"
                  required
                  maxLength="50"
                  id="title"
                  placeholder="ex : Chemise Sézanne verte"
                  value={offerTitle}
                  onChange={(event) => setOfferTitle(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description">Décris ton article</label>
                <textarea
                  required
                  name="description"
                  id="description"
                  maxLength="500"
                  cols="70"
                  rows="6"
                  placeholder="ex : portée quelques fois, taille correctement"
                  value={offerDescription}
                  onChange={(event) => setOfferDescription(event.target.value)}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="brand">Marque</label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  placeholder="ex : Zara"
                  value={offerBrand}
                  onChange={(event) => setOfferBrand(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="size">Taille</label>
                <input
                  type="text"
                  name="size"
                  id="size"
                  placeholder="ex : L / 40 / 12"
                  value={offerSize}
                  onChange={(event) => setOfferSize(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="condition">État</label>
                <input
                  type="text"
                  name="condition"
                  id="condition"
                  placeholder="ex : Très bon état"
                  value={offerCondition}
                  onChange={(event) => setOfferCondition(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="color">Couleur</label>
                <input
                  type="text"
                  name="color"
                  id="color"
                  placeholder="ex : Rouge..."
                  value={offerColor}
                  onChange={(event) => setOfferColor(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="city">Emplacement</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="ex : Paris"
                  value={offerCity}
                  onChange={(event) => setOfferCity(event.target.value)}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="price">Prix de l'article</label>
                <div className="checkbox-section">
                  <input
                    type="number"
                    required
                    name="price"
                    id="price"
                    maxLength="100000"
                    placeholder="0,00 €"
                    value={offerPrice}
                    onChange={(event) => setOfferPrice(event.target.value)}
                  />
                  <div className="checkbox-input">
                    <label
                      htmlFor="interestedExchange"
                      className={
                        interestedExchange
                          ? "checkbox-style-checked"
                          : "checkbox-style"
                      }
                    >
                      {interestedExchange && (
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="check"
                          class="svg-inline--fa fa-check fa-w-16 fa-xs "
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          color="white"
                        >
                          <path
                            fill="currentColor"
                            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                          ></path>
                        </svg>
                      )}
                    </label>

                    <input
                      type="checkbox"
                      name="interestedExchange"
                      id="interestedExchange"
                      value={interestedExchange}
                      onChange={(event) =>
                        setInterestedExchange(event.target.checked)
                      }
                    />
                    <span>Je suis intéressé(e) par les échanges</span>
                  </div>
                </div>
              </div>
            </div>
            <span>
              Un vendeur professionnel se faisant passer pour un consommateur ou
              un non-professionnel sur Vinted encourt les sanctions prévues à l'
              <span className="link">Article L. 132-2</span> du Code de la
              Consommation.{" "}
            </span>
            <p>
              <button class="white-btn">Sauvegarder le brouillon</button>
              <button type="submit" className="blue-btn">
                Ajouter
              </button>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Publish;
