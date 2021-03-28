import Head from 'next/head';
import { GetStaticProps } from 'next';
import SubscribeButton from '../components/SubscribeButton';
import styles from './home.module.scss';
import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>ig.news</title>
      </Head>

      <main className={styles.main}>
        <section>
          <strong>👏 Hey, welcome</strong>
          <h1>
            News about the <mark>React</mark> world.
          </h1>
          <p>
            Get access to all publications
            <mark>for {product.amount} month</mark>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IYRy8FIMgxPf75sHOwRsYQl');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
