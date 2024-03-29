export const ProductOneBySlug = /* GraphQL */ `
  query ProductOneBySlug($slug: String!, $channel: String = "default-channel") {
    product(slug: $slug, channel: $channel) {
      id
      slug
      name
      description
      isAvailable
      pricing {
        priceRange {
          start {
            net {
              amount
            }
          }
        }
      }

      attributes {
        values {
          name
          value
          slug
        }
      }

      variants {
        id
        name
        attributes {
          attribute {
            name
          }
          values {
            name
          }
        }
        pricing {
          price {
            net {
              amount
              currency
            }
          }
        }
      }
      media {
        url
        alt
      }
    }
  }
`;
