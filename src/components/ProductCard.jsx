import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const ProductCard = ({ product, addProduct }) => {
  console.log(product);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );

  const isAvailable = product.inStock !== undefined ? product.inStock : true;

  return (
    <div
      className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
      id={product.id}
      key={product.id}
    >
      <div className="card text-center h-100" id={product.id}>
        <img
          className="card-img-top p-4 w-100 h-100"
          src={product.image}
          alt={product.title}
          style={{ objectFit: "contain" }}
        />

        <div className="card-body">
          <h5 className="card-title">{product.title.substring(0, 12)}...</h5>
          <p className="card-text">{product.description.substring(0, 90)}...</p>

          {/* Variant dropdown */}
          {product.variants && product.variants.length > 0 ? (
            <select
              className="form-select mb-3"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
            >
              {product.variants.map((variant, idx) => (
                <option key={idx} value={variant}>
                  {variant}
                </option>
              ))}
            </select>
          ) : (
            <p className="mb-3 text-muted">No variants available</p>
          )}
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item lead">$ {product.price}</li>
        </ul>

        <div className="card-body">
          <Link to={"/product/" + product.id} className="btn btn-dark m-1">
            Buy Now
          </Link>

          <button
            className="btn btn-dark m-1"
            onClick={() => {
              toast.success("Added to cart");
              addProduct(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
