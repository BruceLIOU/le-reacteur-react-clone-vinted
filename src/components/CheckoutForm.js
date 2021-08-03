import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({
  userToken,
  userId,
  productTitle,
  productPrice,
  apiUrl,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);
  /* const [selected, setSelected] = useState(false); */

  const protectPrice = 0.4;
  const deleveryPrice = 0.8;

  const total =
    productPrice + parseFloat(protectPrice) + parseFloat(deleveryPrice);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // On récupère ici les données bancaires que l'utilisateur rentre
      const cardElement = elements.getElement(CardElement);
      // Demande de création d'un token via l'API Stripe
      // On envoie les données bancaires dans la requête
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userId,
      });
      //console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      // Une fois le token reçu depuis l'API Stripe
      // Requête vers notre serveur
      // On envoie le token reçu depuis l'API Stripe
      const response = await axios.post(
        `${apiUrl}/payment`,
        {
          stripeToken,
          productTitle,
          total,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      //console.log(response.data);
      // Si la réponse du serveur est favorable, la transaction a eu lieu
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Résumé de la commande</h1>
      <div>
        <div>Commande</div>
        <div>{productPrice.toFixed(2)} €</div>
      </div>
      <div>
        <div>Frais protection acheteurs</div>
        <div>{protectPrice.toFixed(2)} €</div>
      </div>
      <div>
        <div>Frais de port</div>
        <div>{deleveryPrice.toFixed(2)} €</div>
      </div>

      <div>
        <div>Total</div>
        <div>{total.toFixed(2)} €</div>
      </div>
      <p>
        Il ne vous reste plus qu'un étape pour vous offrir
        <strong> {productTitle}</strong>. Vous allez payer
        <strong> {total.toFixed(2)} € </strong>
        (frais de protection et frais de port inclus).
      </p>

      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button className="green-btn" type="submit">
            Pay
          </button>
        </form>
      ) : (
        <span>Merci pour votre achat.</span>
      )}
    </div>
  );
};

export default CheckoutForm;
