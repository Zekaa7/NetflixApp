import { useEffect, useState } from "react";
import "./PlansScreen.css";
import db from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/counter/userSlice";
import { loadStripe } from "@stripe/stripe-js";

export default function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) return;

      const q = collection(db, "customers", user.uid, "subscriptions");
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((sub) => {
        const role = sub.data().items[0].plan.metadata.userRole;
        console.log(role);
        setSubscription({
          role,
          current_period_end: sub.data().current_period_end.seconds,
          current_period_start: sub.data().current_period_start.seconds,
        });
      });
    };

    fetchSubscription();
  }, [user]);
  console.log(subscription);
  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), where("active", "==", true));
      const querySnapshot = await getDocs(q);
      const products = {};

      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
        priceSnap.docs.forEach((doc) => {
          products[productDoc.id].prices = {
            priceId: doc.id,
            priceData: doc.data(),
          };
        });
      });

      setProducts(products);
    };

    fetchProducts();
  }, []);

  async function loadCheckout(priceId) {
    const docRef = await addDoc(
      collection(db, "customers", user.uid, "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occurred: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51PaeHEIX0G6HkHFTl1dxHVDYeG5PTWMu1dWXrVy40aJ72gwkSI5X6x8e7ZEaVELJtMkKxWNGkGdgE4w3EojotDnC00lB0v9Mqh"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  }

  return (
    <div className="plansScreen">
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        console.log("productData", productData);
        //add some logic to check if the users subcription is active
        const isCurrentPackage = productData.stripe_metadata_role
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plansScreen__plan--disabled"
            } plansScreen__plan`}
          >
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
