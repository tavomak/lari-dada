import { useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllProducts, getProductById } from '@lib/index';
import { useRouter } from 'next/router';
import { TiArrowBack } from 'react-icons/ti';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Parser from 'html-react-parser';
import Slider from 'react-slick';
import Layout from '@components/Templates/Layout';
import Modal from '@components/Templates/Modal';
import FormContact from '@components/Molecules/Forms/Contact';

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

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  arrows: true,
  speed: 400,
  autoplaySpeed: 5000,
  cssEase: 'cubic-bezier(.8,0,0.5,1)',
};

const Product: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { galleryImages, name, price } = product;
  const yoastHead = Parser(product.seo.fullHead);
  const [modal, setModal] = useState(false);

  const handleToggleModal = (e: any) => {
    e.preventDefault();
    setModal(!modal);
  };
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
                <Slider {...settings}>
                  {galleryImages.nodes.map((item) => (
                    <div key={item.sourceUrl} className="position-relative">
                      <Image
                        src={item.sourceUrl}
                        alt={item.title}
                        width={280}
                        height={280}
                        objectFit="cover"
                      />
                    </div>
                  ))}
                </Slider>
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
                <a
                  href="!#"
                  className="btn btn-primary"
                  onClick={handleToggleModal}
                >
                  Cotizar
                  {' '}
                  { name }
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
      <Modal
        showModal={modal}
        onClick={handleToggleModal}
        size="xl"
      >
        <div className="container">
          <div className="row d-flex align-items-center my-md-5 mx-2">
            <div className="col-md-6 mb-4">
              <h2>{name}</h2>
              <div className="shadow">
                <Image
                  src={galleryImages.nodes[0].sourceUrl}
                  alt={galleryImages.nodes[0].title}
                  width={16}
                  height={16}
                  layout="responsive"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="px-md-5">
                <FormContact product={name} />
              </div>
            </div>
          </div>
        </div>
      </Modal>
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
