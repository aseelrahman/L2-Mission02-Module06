import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import type { IProduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  console.log(url);

  const urlParams = url?.split("/");
  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;
  // console.log(id);

  // Get All Products
  if (url === "/products" && method === "GET") {
    const products = productService();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products retrieved successfully!",
        data: products,
      }),
    );
  } else if (method === "GET" && id !== null) {
    const products = productService();
    const product = products.find((p: IProduct) => p.id === id);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products retrieved successfully!",
        data: product,
      }),
    );
  } else if (method === "POST" && url === "/products") {
    const body = await bodyParser(req);
    // console.log(body);

    const newProduct = {
      id: Date.now(),
      ...body,
    };

    // console.log(newProduct);

    const products = productService();
    products.push(newProduct);
    createProduct(products);
    res.writeHead(201, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products created successfully!",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const body = await bodyParser(req);
    const products = productService();

    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);
    if (index < 0) {
      res.writeHead(404, { "Content-type": "application/json" });
      return res.end(
        JSON.stringify({
          message: "Product Not Found!",
        }),
      );
    }

    products[index] = { id: products[index].id, ...body };

    createProduct(products);
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product updated successfully!",
        data: products[index],
      }),
    );
  } else if (method === "DELETE" && id !== null) {
    const products = productService();
    const index = products.findIndex((p: IProduct) => p.id === id);

    if (index < 0) {
      res.writeHead(404, { "Content-type": "application/json" });
      return res.end(
        JSON.stringify({
          message: "Product Not Found!",
        }),
      );
    }

    // const arr = ["a", "b", "c"];
    // console.log(arr.splice(2,1));
    // arr.splice(2, 1);
    // console.log(arr);

    products.splice(index, 1);

    createProduct(products);

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product deleted successfully!",
      }),
    );
  }
};

export default productController;
