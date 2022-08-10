import type { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllProducts, getProductById } from '@lib/index';
import { useRouter } from 'next/router';
import { TiArrowBack } from 'react-icons/ti';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Parser from 'html-react-parser';
import Layout from '@components/Templates/Layout';

type image = {
  sourceUrl: string,
  title: string
}

type nodes = {
  nodes: image[],
}

type seoHead = {
  fullHead: string,
}

type detail = {
  id: string,
  description: string,
  name: string,
  type: string,
  regularPrice: string,
  price: string
  shortDescription: string,
  seo: seoHead,
  galleryImages: nodes,
}

type Props = {
  product: detail,
}

const Product: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { galleryImages, name, price } = product;
  const yoastHead = Parser(product.seo.fullHead);
  return (
    <Layout
      title={name}
      description="Financiamos tu adquisición de activos fijos"
      className="d-flex align-items-center"
    >
      <Head>
        {yoastHead}
      </Head>
      <section className="container">
        {router.isFallback ? (
          <div className="row content-wrapper align-items-center justify-content-center">
            <div className="spinner-border text-secondary-color" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row align-items-center">
            <div className="col-md-6">
              <p>
                <Link href="/shop">
                  <a href="#!">
                    <span><TiArrowBack /></span>
                    Volver
                  </a>
                </Link>
              </p>
              <div className="text-center shadow p-5" style={{ borderRadius: '15px' }}>
                {galleryImages.nodes.map((item) => (
                  <Image
                    src={item.sourceUrl}
                    alt={item.title}
                    width={280}
                    height={280}
                    key={item.sourceUrl}
                    objectFit="cover"
                  />
                ))}
              </div>
            </div>
            <div className="col-md-6">
              <div className="ps-md-5 my-5 text-center text-md-start">
                <h1>{name}</h1>
                <div
                  dangerouslySetInnerHTML={{ __html: product.shortDescription }}
                />
                <p className="d-none">
                  <b>Precio: </b>
                  <span>{price}</span>
                </p>
                <a href="#!" className="btn btn-primary">Agregar al carrito</a>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Product;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getProductById(params?.slug);
  return {
    props: {
      product: data.product,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllProducts();
  return {
    paths: allPosts?.products?.nodes?.map((product: any) => `/product/${product.slug}`) || [],
    fallback: false,
  };
};
