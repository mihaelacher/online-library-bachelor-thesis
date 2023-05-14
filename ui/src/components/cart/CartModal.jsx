import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import { useCart } from "react-use-cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./CartModal.css";
import { useCallback } from "react";

function CartModal({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const { isEmpty, items, removeItem } = useCart();
  const [total, _setTotal] = useState(0);
  const [discount, _setDiscount] = useState(0);

  async function handleCheckout(e) {
    e.preventDefault();
    navigate("/payment");
  }

  const setDiscount = useCallback(() => {
    if (!isEmpty) {
      const cartItems = Array.isArray(items) ? items : [items];
      const discount = cartItems.reduce(
        (total, item) =>
          parseFloat(
            typeof total == "object"
              ? total.promoPrice
                ? total.promoPrice
                : 0
              : total
          ) + parseFloat(item.promoPrice ? item.promoPrice : 0)
      );

      _setDiscount(discount);
    }
  }, [isEmpty, items]);

  const setTotal = useCallback(() => {
    if (!isEmpty) {
      const cartItems = Array.isArray(items) ? items : [items];
      const totalPrice = cartItems.reduce(
        (total, item) =>
          parseFloat(typeof total == "object" ? total.price : total) +
          parseFloat(item.price)
      );
      _setTotal(totalPrice);
    }
  }, [isEmpty, items]);

  useEffect(() => {
    setTotal();
    setDiscount();
  }, [setTotal, setDiscount, items]);

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Cart Modal"
      onRequestClose={() => setIsOpen(false)}
      ariaHideApp={false}
    >
      <div className="card">
        <div className="card-header">
          <h2>Количка</h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered m-0">
              <thead>
                <tr>
                  <th
                    className="text-center py-3 px-4"
                    style={{ minWidth: "400px" }}
                  >
                    Книга
                  </th>
                  <th
                    className="text-center py-3 px-4"
                    style={{ width: "100px" }}
                  >
                    Цена
                  </th>
                  <th
                    className="text-center align-middle py-3 px-0"
                    tyle={{ width: "40px" }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {items?.map(function (item) {
                  return (
                    <tr key={item.id}>
                      <td className="p-4">
                        <div className="media align-items-center">
                          <img
                            src={item.cover_url}
                            className="d-block ui-w-40 ui-bordered mr-4"
                            alt={item.tite}
                          />
                          <div className="media-body">
                            <small>
                              <span className="text-muted">Заглавие: </span>
                              {item.title + "  "}
                            </small>
                            <small>
                              <span className="text-muted">Автор: </span>
                              {item.author}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-right font-weight-semibold align-middle p-4">
                        {item.promoPrice ? (
                          <div className="priceContainer">
                            <div className="item-price promoPrice">
                              {item.price}лв
                            </div>
                            <div className="item-price">
                              {item.promoPrice}лв
                            </div>
                          </div>
                        ) : (
                          <div className="priceContainer">
                            <div className="item-price">{item.price}лв</div>
                          </div>
                        )}
                      </td>
                      <td className="text-center align-middle px-0">
                        <button
                          className="btn shop-tooltip close float-none text-danger"
                          onClick={() => removeItem(item.id)}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-xmark" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
            <div className="d-flex">
              <div className="text-right mt-4" style={{ marginRight: "15px" }}>
                <label className="text-muted font-weight-normal m-0">
                  Отстъпка
                </label>
                <div className="text-large">
                  <strong>{discount} лв</strong>
                </div>
              </div>
              <div className="text-right mt-4">
                <label className="text-muted font-weight-normal m-0">
                  Сума
                </label>
                <div className="text-large">
                  <strong>{total - discount} лв</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="float-right">
            <button
              type="button"
              className="btn btn-outline-accent mt-2"
              style={{ marginRight: "15px" }}
              onClick={() => setIsOpen(false)}
            >
              Обратно към сайта
            </button>
            <button
              type="button"
              className="btn btn-outline-light mt-2"
              onClick={handleCheckout}
            >
              Продължи към плащане
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default CartModal;
