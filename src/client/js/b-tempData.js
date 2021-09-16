const data = [
  {
    name: 'Tablet Galaxy Tab A7',
    price: 699900,
    stock: 3,
    picture: 'https://drive.google.com/u/0/uc?id=1A24-mJrccRC1cG9BPIOipLHfeBx3Jkjb',
    inCart: 0,
  },
  {
    name: 'Tablet  Lenovo Tab M10',
    price: 430900,
    stock: 0,
    picture: 'https://http2.mlstatic.com/D_NQ_NP_643615-MLA45264759855_032021-W.webp',
    inCart: 0,
  },
  {
    name: 'Apple iPad de 10.2" 128GB Gris espacial (8ª generación)',
    price: 2049900,
    stock: 5,
    picture: 'https://http2.mlstatic.com/D_NQ_NP_949167-MLA46432762322_062021-V.webp',
    inCart: 0,
  },
  {
    name: 'Tablet Samsung Galaxy Tab A7',
    price: 699900,
    stock: 12,
    picture: 'https://drive.google.com/u/0/uc?id=1A24-mJrccRC1cG9BPIOipLHfeBx3Jkjb',
    inCart: 0,
  },
  {
    name: 'Tablet  Lenovo Tab M10',
    price: 430900,
    stock: 0,
    picture: 'https://http2.mlstatic.com/D_NQ_NP_643615-MLA45264759855_032021-W.webp',
    inCart: 0,
  },
  {
    name: 'Tablet Amazon Fire 7',
    price: 239900,
    stock: 5,
    picture: 'https://http2.mlstatic.com/D_NQ_NP_701040-MLA45269592618_032021-V.webp',
    inCart: 1,
  },
];

function fetchData() {
  return {
    data,
    formatCurrency,
    whatsappUrlGen: (item) => {
      const whatsappApiURl = 'https://api.whatsapp.com/send';
      const phoneNumber = '5544333222111';
      const defaultMessage = 'Hola, me interesa este producto: ';

      const phoneParam = `?phone=${phoneNumber}`;
      const textParam = `&text=${encodeURI(defaultMessage)}${encodeURI(item)}`;

      return `${whatsappApiURl}${phoneParam}${textParam}`;
    },
    isAvailable: (stock) => (stock === 0 ? 'Agotado' : `${stock.toString()} disponibles`),
    isInCart: (itemsInCart) => Number(itemsInCart) > 0,
    addToCart: (item) => {
      item.inCart = Number(item.inCart);
      item.stock = Number(item.stock);
      if (item.inCart < item.stock && item.stock > 0) {
        item.inCart += 1;
      }
    },
    substractToCart: (item) => {
      item.inCart = Number(item.inCart);
      if (item.inCart > 0) {
        item.inCart -= 1;
      }
    },
    isActive: (item) => (item.stock > 0 ? '' : 'disabled'),
    isValidCartValue: (item) => {
      if (item.inCart > Number(item.stock)) {
        item.inCart = Number(item.stock);
      }
    },
  };
}
