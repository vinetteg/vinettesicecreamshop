import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { List } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { Container, Header } from "semantic-ui-react";
import "../CategoryMenu/style.css";
import Flip from "react-reveal/Pulse";

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <Container fluid>
        {categories.map((item) => (
          <Flip>
            <button
              id="menuBtn"
              key={item._id}
              onClick={() => {
                handleClick(item._id);
              }}
            >
              {item.name}
            </button>
          </Flip>
        ))}{" "}
      </Container>
    </div>
  );
}

export default CategoryMenu;
