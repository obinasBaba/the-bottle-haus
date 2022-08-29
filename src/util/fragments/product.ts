export const ProductConnection = /* GraphQL */ `
  fragment ProductConnection on ProductCountableConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        name
        description
        slug
        isAvailable
        pricing {
          discount {
            net {
              amount
            }
          }
          priceRange {
            start {
              net {
                amount
              }
            }
          }
        }
        variants {
          id
          name
          sku
          quantityAvailable
        }
        defaultVariant {
          id
          name
          quantityAvailable
        }

        attributes {
          attribute {
            name
          }
          values {
            id
            name
          }
        }

        media {
          url
          alt
        }
      }
    }
  }
`;
