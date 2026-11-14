import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";

const productController = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (url === "/products" && method === "GET") {
    const products = [
      {
        id: 1,
        name: "Product-01",
        price: 20,
      },
      {
        id: 2,
        name: "Product-02",
        price: 30,
      },
      {
        id: 3,
        name: "roduct-03",
        price: 25,
      },
    ];
    productService()
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products retrieved successfully!",
        data: products,
      }),
    );
  }
};

export default productController;
