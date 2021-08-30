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
import {UPDATE_COMMENT} from "../utils/mutations";
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
} from "semantic-ui-react";

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});
  const [comment, setComment] = useState("");

  const { loading, data } = useQuery(QUERY_PRODUCTS);
const [ addComment, {error} ] = useMutation(UPDATE_COMMENT);
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
      }
    })
  }
  return (
    <>
      {currentProduct && cart && comments ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>
          <p>{currentProduct.description}</p>
         

       


          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
            
          />
           <p>{currentProduct.comments.map(comment._id)}</p>

          <Container fluid>
            <Comment.Group minimal>
              <Header as="h3" dividing>
                Comments:
              </Header>
            </Comment.Group>
            {/* <Comment>
              <Comment.Content>
                <Rating icon="heart" defaultRating={1} maxRating={3} />
                <Comment.Author as="a">Matt</Comment.Author>
                <Comment.Metadata>
                  <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>How artistic!</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>

            <Comment>
              <Comment.Content>
                <Comment.Author as="a">Elliot Fu</Comment.Author>
                <Comment.Metadata>
                  <div>Yesterday at 12:30AM</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>
                    This has been very useful for my research. Thanks as well!
                  </p>
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
              <Comment.Group>
                <Comment>
                  <Comment.Content>
                    <Comment.Author as="a">Jenny Hess</Comment.Author>
                    <Comment.Metadata>
                      <div>Just now</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      Elliot you are always so right :)
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Comment>

            <Comment>
              <Comment.Content>
                <Comment.Author as="a">Joe Henderson</Comment.Author>
                <Comment.Metadata>
                  <div>5 days ago</div>
                </Comment.Metadata>
                <Comment.Text>
                  Dude, this is awesome. Thanks so much
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Tell us what you think:</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment> */}
            {/* insert code here */}

            <Form
              reply
              onSubmit={handleAddComment}
            >
              <Form.TextArea value={comment} onChange={(e) => setComment(e.target.value) }/>
              <Form.Field
                control={Checkbox}
                label="I agree to the Terms and Conditions"
              />
              <Form.Button type="submit" fluid color="blue" />
            </Form>
          </Container>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  
  )};
export default Detail;
