import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { Card } from "semantic-ui-react";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <Card.Group>
      <div id="cardCont">
        <div className="productImgSec">
          <Link to={`/products/${_id}`}>
            <img alt={name} src={`/images/${image}`} id="productImg" />
          </Link>
        </div>
        <div className="productInfo">
          <div className="cardTxt">
            <h1 className="cardHeader">{name}</h1>
            <p className="cardP">
              Enjoy our freshly made ice cream right at home! Made with fresh
              and local ingredients. From classic flavors to our very own
              Vinette's Seasonal Flavors. Also, what's a better way to enjoy
              your ice cream than with our exclusive VICS merch! Click to see
              more!
            </p>
          </div>
          <div id="purchaseSec">
            <p>
              {quantity}
              <span>{pluralize("item", quantity)}</span> in stock
            </p>
            <span>${price}</span>
            <button onClick={addToCart} id="addToCartBtn">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Card.Group>
  );
}

export default ProductItem;
