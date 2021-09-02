import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import Cart from "../components/Cart";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
  UPDATE_PRODUCTS_COMMENT,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";

import { MUTATE_UPDATE_PRODUCTS_COMMENT } from "../utils/mutations";

import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";
import { Rating } from "semantic-ui-react";

import {
  Container,
  Header,
  Comment,
  Button,
  Form,
  Checkbox,
  Icon,
} from "semantic-ui-react";

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});
  const [comment, setComment] = useState("");

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const [addComment, { error }] = useMutation(MUTATE_UPDATE_PRODUCTS_COMMENT);
  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise("cart", "delete", { ...currentProduct });
  };
  const handleAddComment = async (e) => {
    e.preventDefault();
    console.log("submitting .... ", e);
    dispatch({
      type: UPDATE_PRODUCTS_COMMENT,
      _id: 1,
      comment: comment,
    });
    // comments are being saved in currentProduct._id
    await addComment({
      variables: {
        _id: currentProduct._id,
        comment: comment,
      },
    });
  };

  return (
    <>
      {currentProduct && cart ? (
        <Container fluid className="containerDetailpg">
          <Link to="/">
            <Icon
              name="arrow alternate circle left outline"
              size="big"
              id="backBtn"
            >
              Back to Products
            </Icon>
          </Link>
          <div id="cardWrapper">
            <div className="detailsCardCont">
              <div id="cardImgSec">
                <img
                  src={`/images/${currentProduct.image}`}
                  alt={currentProduct.name}
                  height="300"
                  width="280"
                />
              </div>
              <div className="productInfoSec">
                <div className="infoText">
                  <h1 className="detailHeader">{currentProduct.name}</h1>
                  <Container text fluid>
                    <p className="detailDescription">
                      {currentProduct.description}
                    </p>
                  </Container>
                </div>
                <Container text fluid id="buySec">
                  <span id="price">${currentProduct.price} </span>
                  <button onClick={addToCart} id="addToCartBtn">
                    Add to cart
                  </button>
                  <button
                    disabled={!cart.find((p) => p._id === currentProduct._id)}
                    onClick={removeFromCart}
                    id="removeItmBtn"
                  >
                    Remove From Cart
                  </button>
                </Container>
              </div>
              <Container className="commentsCont">
                <h1 id="commentHeader">Comments</h1>
                <Comment.Group id="currentCommentWrapper">
                  <div className="currentCommentCont">
                    <p>{currentProduct?.comments?.map(comment._id)}</p>
                  </div>
                </Comment.Group>
                <div className="submitCommentCont">
                  <h3 id="leaveComment">Leave Us a Comment</h3>
                  <Form onSubmit={handleAddComment} id="formCont">
                    <Form.TextArea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      id="commentTextBox"
                    />
                    <Form.Button
                      type="submit"
                      fluid
                      color="blue"
                      id="commentFormBtn"
                    >
                      Submit Your Comment
                    </Form.Button>
                  </Form>
                </div>
              </Container>
            </div>
          </div>
        </Container>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}
export default Detail;
