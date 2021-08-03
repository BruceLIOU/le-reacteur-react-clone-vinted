import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51JKL7qK1uP69PZ5qvbtxfWBcAySioV15LQqxzo8RkXxkhxn6bimfPZPQkhiFDFl1QH1IbmZGt2Ise8punRY1ZxXP00E9Llfx4n"
);

const Payment = () => {
  const location = useLocation();
  const { userToken, userId, productTitle, productPrice } = location.state;

  return (
    <div className="offer-body">
      <div className="container">
        <section className="checkout">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              userToken={userToken}
              userId={userId}
              productTitle={productTitle}
              productPrice={productPrice}
            />
          </Elements>
        </section>
      </div>
    </div>
  );
};

export default Payment;
