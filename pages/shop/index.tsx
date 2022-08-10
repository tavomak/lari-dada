import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { getAllProducts } from '@lib/index';
import { RiHomeSmileLine, RiShoppingCartLine } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@components/Templates/Layout';
import styles from './styles.module.scss';

type image = {
  sourceUrl: string,
}

type product = {
  id: string,
  description: string,
  image: image,
  name: string,
  slug: string | null,
  type: string,
  regularPrice: string,
  price: string
}

type Props = {
  products: product[],
}

const Shop: NextPage<Props> = ({ products }) => (
  <Layout
    title="Estela estudio digital"
    description="Financiamos tu adquisición de activos fijos"
    container
  >
    <ul className="d-flex justify-content-between align-items-center">
      <li>
        <Link href="/">
          <a href="#!" className="fs-3">
            <RiHomeSmileLine />
          </a>
        </Link>
      </li>
      <li>
        <h2 className="text-center py-md-5 my-md-5">Shop</h2>
      </li>
      <li>
        <span className="fs-3">
          <RiShoppingCartLine />
        </span>
      </li>
    </ul>
    <ul className={styles.gridWrap}>
      {products.length > 0 && products.map((item) => (
        <li key={item.id} className={`${styles.gridItem} `}>
          <Link href={`product/${item.slug}`}>
            <a href={`product/${item.slug}`}>
              <div className={`${styles.gridItemImage} text-center shadow py-4`}>
                <Image src={item.image.sourceUrl} alt={item.name} width={240} height={240} />
              </div>
              <p className="mb-0">
                <b>{`${item.name}`}</b>
              </p>
              <p className="mb-0 d-none">
                <span>{`${item.price}`}</span>
              </p>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

export default Shop;

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllProducts();
  return {
    props: {
      products: data.products.nodes,
    },
    revalidate: 60,
  };
};
