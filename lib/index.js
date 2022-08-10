const server = process.env.NEXT_PUBLIC_CMS_API_URL;

async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${server}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    // throw new Error('Failed to fetch API')
  }

  return json.data;
}

export async function getProductById(slug) {
  console.log('slug: ', slug);
  const data = await fetchAPI(
    `query Product($id: ID!) {
      product(id: $id, idType: SLUG) {
        id
        shortDescription
        galleryImages {
          nodes {
            sourceUrl
            title
          }
        }
        ... on VariableProduct {
          id
          name
          price
          productCategories {
            nodes {
              name
            }
          }
          seo {
            fullHead
          }
          related {
            nodes {
              id
              image {
                id
              }
              name
              slug
              sku
            }
          }
        }
        ... on SimpleProduct {
          id
          name
          price
          seo {
            fullHead
          }
          productCategories {
            nodes {
              name
            }
          }
          related {
            nodes {
              id
              image {
                id
              }
              name
              slug
              sku
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        id: slug,
      },
    },
  );
  return data;
}

export async function getAllProducts() {
  const products = await fetchAPI(
    `query homepage {
      products(first: 500) {
        nodes {
          id
          description
          image {
            sourceUrl
          }
          ... on SimpleProduct {
            name
            price
            sku
            slug
            type
            regularPrice
          }
          ... on VariableProduct {
            name
            price
            sku
            slug
            type
            regularPrice
          }
          productCategories {
            edges {
              node {
                id
                name
              }
            }
          }
          galleryImages {
            nodes {
              mediaItemUrl
              sourceUrl
            }
          }
        }
      }
    }`,
  );
  return products;
}
