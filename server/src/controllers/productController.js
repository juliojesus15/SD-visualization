import { readProducts, writeProducts } from '../repositories/productRepository.js';

const getProducts = async (req, res) => {
  try {
    const products = await readProducts();
    res.json(products);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los productos.' });
  }
};

const addProduct = async (req, res) => {
  try {
    const products = await readProducts();
    const newProduct = req.body;
    products.push(newProduct);
    await writeProducts(products);
    res.json({ message: 'Producto agregado exitosamente.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Ocurrió un error al agregar el producto.' });
  }
};

export { getProducts, addProduct };
